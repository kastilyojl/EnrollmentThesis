import Layout from "@/components/layout";
import React, { useState } from "react";
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
import { Trash } from "lucide-react";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function SubmittedGrade({ grades = [], gradeSidebarEnabled }) {
    const [del, setDel] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const confirmDelete = (id) => {
        setSelectedId(id);
        setDel(true);
    };

    const handleSubmitDel = () => {
        if (selectedId) {
            router.delete(`/grades/${selectedId}`, {
                onSuccess: () => {
                    setDel(false);
                    setSelectedId(null);
                },
            });
        }
    };

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
                            <TableHead className="w-[12.5%] text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Student Name
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Program
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Semester
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Grade
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Status
                            </TableHead>
                            <TableHead className="w-[12.5%] text-center">
                                Action
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
                                    <TableCell className="flex justify-center">
                                        <Trash
                                            className="text-red-600 cursor-pointer"
                                            onClick={() =>
                                                confirmDelete(grade.id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    No submitted grades found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {del && (
                <Dialog open={del} onOpenChange={setDel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Grade</DialogTitle>
                            <DialogDescription>
                                <div className="my-3">
                                    Are you sure you want to delete this grade?
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleSubmitDel}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        className="bg-red-600"
                                        onClick={() => setDel(false)}
                                    >
                                        No
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </Layout>
    );
}
