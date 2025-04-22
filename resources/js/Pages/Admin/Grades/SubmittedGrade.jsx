import Layout from "@/components/layout";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function SubmittedGrade() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Submitted Grade</h1>
            </div>

            <div className="flex items-center gap-2">
                <Table className="w-full">
                    <TableCaption>A list of student grades.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[14.28%] text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Name
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
                        <TableRow>
                            <TableCell className="w-[14.28%] text-center font-medium">
                                C-01
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center">
                                John Lester B. Castillo
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center">
                                4th Year
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center">
                                BSCS
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center">
                                1.5
                            </TableCell>
                            <TableCell className="w-[14.28%] text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-02
                            </TableCell>
                            <TableCell className="text-center">
                                Maria Isabel Dela Cruz
                            </TableCell>
                            <TableCell className="text-center">
                                3rd Year
                            </TableCell>
                            <TableCell className="text-center">BSIT</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">2.25</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-03
                            </TableCell>
                            <TableCell className="text-center">
                                Mark Anthony Reyes
                            </TableCell>
                            <TableCell className="text-center">
                                2nd Year
                            </TableCell>
                            <TableCell className="text-center">BSCS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">3.25</TableCell>
                            <TableCell className="text-center text-red-600">
                                Failed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-04
                            </TableCell>
                            <TableCell className="text-center">
                                Angela Marie Santos
                            </TableCell>
                            <TableCell className="text-center">
                                1st Year
                            </TableCell>
                            <TableCell className="text-center">BSIT</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">2.0</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-05
                            </TableCell>
                            <TableCell className="text-center">
                                Christian Velasco
                            </TableCell>
                            <TableCell className="text-center">
                                3rd Year
                            </TableCell>
                            <TableCell className="text-center">BSCS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">3.5</TableCell>
                            <TableCell className="text-center text-red-600">
                                Failed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-06
                            </TableCell>
                            <TableCell className="text-center">
                                Ellaine Ramos
                            </TableCell>
                            <TableCell className="text-center">
                                2nd Year
                            </TableCell>
                            <TableCell className="text-center">BSIS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">1.75</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-07
                            </TableCell>
                            <TableCell className="text-center">
                                Joseph Villanueva
                            </TableCell>
                            <TableCell className="text-center">
                                4th Year
                            </TableCell>
                            <TableCell className="text-center">BSIT</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">2.5</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-08
                            </TableCell>
                            <TableCell className="text-center">
                                Lianne Cortez
                            </TableCell>
                            <TableCell className="text-center">
                                1st Year
                            </TableCell>
                            <TableCell className="text-center">BSCS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">3.0</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-09
                            </TableCell>
                            <TableCell className="text-center">
                                Rafael Aquino
                            </TableCell>
                            <TableCell className="text-center">
                                2nd Year
                            </TableCell>
                            <TableCell className="text-center">BSIS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">4.0</TableCell>
                            <TableCell className="text-center text-red-600">
                                Failed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-10
                            </TableCell>
                            <TableCell className="text-center">
                                Samantha Uy
                            </TableCell>
                            <TableCell className="text-center">
                                3rd Year
                            </TableCell>
                            <TableCell className="text-center">BSIT</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">1.25</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-11
                            </TableCell>
                            <TableCell className="text-center">
                                Bryan Garcia
                            </TableCell>
                            <TableCell className="text-center">
                                1st Year
                            </TableCell>
                            <TableCell className="text-center">BSCS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">3.75</TableCell>
                            <TableCell className="text-center text-red-600">
                                Failed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-12
                            </TableCell>
                            <TableCell className="text-center">
                                Julia Navarro
                            </TableCell>
                            <TableCell className="text-center">
                                2nd Year
                            </TableCell>
                            <TableCell className="text-center">BSIS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">2.0</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-13
                            </TableCell>
                            <TableCell className="text-center">
                                Miguel De Leon
                            </TableCell>
                            <TableCell className="text-center">
                                4th Year
                            </TableCell>
                            <TableCell className="text-center">BSCS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">3.2</TableCell>
                            <TableCell className="text-center text-red-600">
                                Failed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-14
                            </TableCell>
                            <TableCell className="text-center">
                                Denise Tan
                            </TableCell>
                            <TableCell className="text-center">
                                3rd Year
                            </TableCell>
                            <TableCell className="text-center">BSIT</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">1.0</TableCell>
                            <TableCell className="text-center text-green-600">
                                Passed
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-center font-medium">
                                C-15
                            </TableCell>
                            <TableCell className="text-center">
                                James Lim
                            </TableCell>
                            <TableCell className="text-center">
                                2nd Year
                            </TableCell>
                            <TableCell className="text-center">BSIS</TableCell>
                            <TableCell className="text-center">
                                2nd Semester
                            </TableCell>
                            <TableCell className="text-center">2.75</TableCell>
                            <TableCell className="text-center text">
                                Passed
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
