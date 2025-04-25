import Layout from "@/components/layout";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";
import Toggle from "@/components/Toggle";

export default function SubmittedGrade({ grades = [], gradeSidebarEnabled }) {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Submitted Grade</h1>
            </div>

            <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <SearchFilter />
                    <FilterDropdown />
                </div>
                <div className="flex items-center gap-2 font-medium text-lg">
                    <Toggle enabled={gradeSidebarEnabled} />
                    Student View
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[14.28%] text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Student Name
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Program
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Semester
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Grade
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {grades.length > 0 ? (
                            grades.map((grade) => (
                                <TableRow key={grade.id}>
                                    <TableCell className="text-center">
                                        {grade.student_id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.student_name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.year_level}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.program}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.semester}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.grade}
                                    </TableCell>
                                    <TableCell
                                        className={`text-center font-medium ${
                                            grade.status.toLowerCase() ===
                                            "passed"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {grade.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No submitted grades found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
