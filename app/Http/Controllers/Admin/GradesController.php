<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Grades;
use App\Models\Student_Info;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GradesController extends Controller
{
    //
    public function index() {
        return Inertia::render("Admin/Excel/GradesExcel");
    }

    public function storeFromExcel(Request $request)
{
    $grades = $request->input('grades');
    $duplicates = [];
    $successCount = 0;

    DB::beginTransaction();
    try {
        foreach ($grades as $grade) {
            // 1. Lookup student by student_info_id from the excel data
            $student = Student_Info::where('student_id', $grade['student_info_id'])->first();
            if (!$student) {
                // If student not found, log the error and continue to the next grade
                $duplicates[] = [
                    'student_info_id' => $grade['student_info_id'],
                    'error' => 'Student ID not found in database',
             
                ];
                continue;
            }

            // 2. Save the grade entry into the Grades table
            Grades::create([
                'student_info_id' => $student->student_id, // Ensure we use the correct student ID
                'semester' => $grade['semester'],
                'year_level' => $grade['year_level'],
                'subject' => $grade['subject'],
                'grade' => $grade['grade'],
                'status' => $grade['status'],
            ]);

            // Count how many grades were successfully added
            $successCount++;
        }

        DB::commit();

        return response()->json([
            'success' => true,
            'message' => $duplicates
                ? 'Some grades were skipped due to missing students'
                : 'All grades uploaded successfully',
            'success_count' => $successCount,
            'duplicates' => $duplicates,
        ], $duplicates ? 207 : 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'success' => false,
            'error' => 'Database error',
            'message' => $e->getMessage()
        ], 500);
    }
}

}