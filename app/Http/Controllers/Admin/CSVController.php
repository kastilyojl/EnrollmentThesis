<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use League\Csv\Reader;

class CSVController extends Controller
{
    //

    public function index () {
        return Inertia::render('Professor/CSVTable');
    }
    public function upload(Request $request)
    {
         // Validate the CSV file
         $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:10240', // Maximum size: 10MB
        ]);

        // Handle the uploaded CSV file
        $file = $request->file('csv_file');
        $csv = Reader::createFromPath($file->getRealPath(), 'r');
        $csv->setHeaderOffset(0); // Assume first row is header
        $records = iterator_to_array($csv->getRecords());

        // Return the parsed CSV data to the frontend via Inertia
        return Inertia::render('Professor/CSVTable', [
            'csvData' => $records, // Return parsed data as props
        ]);
    }
}
