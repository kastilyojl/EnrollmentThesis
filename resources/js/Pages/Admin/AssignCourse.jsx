import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Filter } from "lucide-react";
import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AssignCourse({
    student = [],
    college_fee = [],
    other_fee = [],
    subjects = [],
}) {
    const tableHeader = [
        "Name",
        "Year Level",
        "Program",
        "Semester",
        "Application",
        "Documents",
        "Payment",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        id: "",
        student_info_id: "",
        subject_code: "",
        status: "",
        // selectedSubjects: [],
    });

    const studentData = student.map((students) => ({
        // student info
        id: students.id,
        student_id: students.student_id,
        department: students.department,
        school_year: students.school_year,
        semester: students.semester,
        branch: students.branch,
        year_level: students.year_level,
        program: students.program,
        classified_as: students.classified_as,
        last_school_attended: students.last_school_attended,
        last_school_address: students.last_school_address,
        email: students.users.email,
        status: students.status,
        // personal info
        first_name: students.personal_info.first_name,
        last_name: students.personal_info.last_name,
        middle_name: students.personal_info.middle_name,
        address: students.personal_info.address,
        birth_date: students.personal_info.birth_date,
        birth_place: students.personal_info.birth_place,
        civil_status: students.personal_info.civil_status,
        gender: students.personal_info.gender,
        religion: students.personal_info.religion,
        // guardian
        father_name: students.guardian.father_name,
        father_occupation: students.guardian.father_occupation,
        father_phone: students.guardian.father_phone,
        mother_name: students.guardian.mother_name,
        mother_phone: students.guardian.mother_phone,
        mother_occupation: students.guardian.mother_occupation,
        guardian_name: students.guardian.guardian_name,
        guardian_relationship: students.guardian.guardian_relationship,
        guardian_phone: students.guardian.guardian_phone,

        // documents
        doc_status: students.documents.status,
        form_138A: students.documents.form_138A,
        form_137: students.documents.form_137,
        good_moral: students.documents.good_moral,
        psa: students.documents.psa,
        pic_2x2: students.documents.pic_2x2,
        ctc_transferee: students.documents.ctc_transferee,
        grade_transferee: students.documents.grade_transferee,
        f137_transferee: students.documents.f137_transferee,

        // payment
        payment_status: students.payment_verification.status,
        payment_verification_name: students.payment_verification.name,
        payment_verification_email: students.payment_verification.email,
        payment_purpose: students.payment_verification.purpose,
        payment_semester: students.payment_verification.semester,
        payment_reference: students.payment_verification.reference,
        payment_amount: students.payment_verification.amount,
        payment_receipt: students.payment_verification.payment_receipt,
        payment_created_at: students.payment_verification.created_at,
    }));

    const tableData = studentData.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        year_level: student.year_level,
        program: student.program,
        semester: student.semester,
        status: student.status,
        doc_status: student.doc_status,
        payment_status: student.payment_status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [create, setCreate] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleSubjectToggle = (subject) => {
        setSelectedSubjects((prevSelected) => {
            const isSelected = prevSelected.some(
                (selectedSubject) => selectedSubject.id === subject.id
            );

            let updatedSelectedSubjects;

            if (isSelected) {
                updatedSelectedSubjects = prevSelected.filter(
                    (selectedSubject) => selectedSubject.id !== subject.id
                );
            } else {
                updatedSelectedSubjects = [...prevSelected, subject];
            }

            // Sync with data object
            setData({
                ...data,
                selectedSubjects: updatedSelectedSubjects,
            });

            return updatedSelectedSubjects;
        });
    };

    const handleSubmit = () => {
        const selectedSubjectsDetails = selectedSubjects.map((subject) => ({
            student_info_id: data.student_id,
            subject_code: subject.code,
            status: "enrolled",
        }));

        console.log(
            "Selected Subjects Details (Transformed):",
            selectedSubjectsDetails
        );

        console.log("Payload Being Sent:", {
            selectedSubjects: selectedSubjectsDetails,
        });

        console.log("Selected Subjects", selectedSubjects);

        post(
            route("admin.course-section.add"),

            {
                onSuccess: () => {
                    toast("Courses Assigned to student", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    });
                    setAdd(false);
                    setSelectedSubjects([]);
                },

                onError: () => {
                    toast.error("Failed to assign courses.");
                },
            }
        );
    };

    const handleCreate = () => {
        setCreate((prev) => !prev);
    };

    const handleDel = (student) => {
        setItemId(student);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.program.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Program has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (student) => {
        student = studentData.find((s) => s.id === student.id);
        setItemId(student);
        console.log("student Data", student);
        setData({
            id: student.id,
            email: student.email,
            student_id: student.student_id,
            department: student.department,
            year_level: student.year_level,
            semester: student.semester,
            school_year: student.school_year,
            branch: student.branch,
            program: student.program,
            classified_as: student.classified_as,
            last_school_attended: student.last_school_attended,
            last_school_address: student.last_school_address,
            status: student.status,

            name:
                student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name,
        });

        setAdd(true);
    };

    const handleUpdateSubmit = () => {
        post(route("admin.application.update", { id: itemId }), {
            onSuccess: () => {
                toast("Student Application has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    status: "",
                });
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Course Selection</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-[300px]"
                    />
                    <div className="text-white">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-primary flex px-2 py-1 rounded-md">
                                Filter
                                <Filter className="h-5 ml-2" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-customBlue text-white">
                                <DropdownMenuItem>
                                    Computer Science
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Information System
                                </DropdownMenuItem>
                                <DropdownMenuItem>Tourism</DropdownMenuItem>
                                <DropdownMenuItem>Criminology</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="border rounded-sm px-4">
                <Table>
                    <TableHeader>
                        <TableRow className="table-fixed">
                            <TableHead className="w-1/12 text-center">
                                Name
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Program
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Semester
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Application
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Document
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Payment
                            </TableHead>
                            <TableHead className="w-1/12 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {studentData.map((student) => {
                            return (
                                <TableRow
                                    key={student.id}
                                    className="table-fixed"
                                >
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.first_name +
                                            " " +
                                            student.middle_name +
                                            " " +
                                            student.last_name}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.year_level}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.program}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.semester}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.status === "approved" ? (
                                            <BadgeSuccess>
                                                {student.status}
                                            </BadgeSuccess>
                                        ) : student.status === "pending" ? (
                                            <BadgeWarning>
                                                {student.status}
                                            </BadgeWarning>
                                        ) : (
                                            student.status
                                        )}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.doc_status === "approved" ? (
                                            <BadgeSuccess>
                                                {student.doc_status}
                                            </BadgeSuccess>
                                        ) : student.doc_status === "pending" ? (
                                            <BadgeWarning>
                                                {student.doc_status}
                                            </BadgeWarning>
                                        ) : (
                                            student.doc_status
                                        )}
                                    </TableCell>

                                    <TableCell className="w-1/12 font-medium text-center">
                                        {student.payment_status ===
                                        "approved" ? (
                                            <BadgeSuccess>
                                                {student.payment_status}
                                            </BadgeSuccess>
                                        ) : student.payment_status ===
                                          "pending" ? (
                                            <BadgeWarning>
                                                {student.payment_status}
                                            </BadgeWarning>
                                        ) : (
                                            student.payment_status
                                        )}
                                    </TableCell>
                                    <TableCell className="w-1/12 font-medium text-center">
                                        <div className="flex justify-center">
                                            <Edit
                                                className="h-5 text-primary cursor-pointer"
                                                onClick={() =>
                                                    handleEdit(student)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-6xl h-[600px]">
                            <DialogHeader>
                                <Label>
                                    <span>{data.name}</span>
                                </Label>
                                <Label>
                                    <span>
                                        {data.year_level} {data.program}
                                    </span>
                                </Label>
                                <h1>Select Course</h1>
                                <div className="grid grid-cols-[70%_30%] gap-4">
                                    <div className="grid grid-rows-2 h-full">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                <thead className="ltr:text-left rtl:text-right">
                                                    <tr>
                                                        <th className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                            Major
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-200">
                                                    <ScrollArea className="h-[200px]">
                                                        {subjects
                                                            .filter(
                                                                (subject) =>
                                                                    subject.year_level ===
                                                                        data.year_level &&
                                                                    subject.period ===
                                                                        data.semester &&
                                                                    subject.category ===
                                                                        "Major Subject"
                                                            )
                                                            .map(
                                                                (
                                                                    subject,
                                                                    index,
                                                                    array
                                                                ) => {
                                                                    // We are processing every two subjects in one row
                                                                    const subject1 =
                                                                        subject; // First subject
                                                                    const subject2 =
                                                                        array[
                                                                            index +
                                                                                1
                                                                        ]; // Second subject (if exists)

                                                                    return (
                                                                        index %
                                                                            2 ===
                                                                            0 && (
                                                                            <tr
                                                                                className="table-fixed"
                                                                                key={
                                                                                    subject1.code
                                                                                }
                                                                            >
                                                                                {/* First Subject Checkbox */}
                                                                                <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                    <Checkbox
                                                                                        checked={selectedSubjects.some(
                                                                                            (
                                                                                                selectedSubject
                                                                                            ) =>
                                                                                                selectedSubject.id ===
                                                                                                subject1.id
                                                                                        )}
                                                                                        onCheckedChange={() =>
                                                                                            handleSubjectToggle(
                                                                                                subject1
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                    {
                                                                                        subject1.name
                                                                                    }
                                                                                </td>

                                                                                {/* Second Subject Checkbox */}
                                                                                {subject2 && (
                                                                                    <>
                                                                                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                            <Checkbox
                                                                                                checked={selectedSubjects.some(
                                                                                                    (
                                                                                                        selectedSubject
                                                                                                    ) =>
                                                                                                        selectedSubject.id ===
                                                                                                        subject2.id
                                                                                                )}
                                                                                                onCheckedChange={() =>
                                                                                                    handleSubjectToggle(
                                                                                                        subject2
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </td>
                                                                                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                            {
                                                                                                subject2.name
                                                                                            }
                                                                                        </td>
                                                                                    </>
                                                                                )}
                                                                            </tr>
                                                                        )
                                                                    );
                                                                }
                                                            )}
                                                    </ScrollArea>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                <thead className="ltr:text-left rtl:text-right">
                                                    <tr>
                                                        <th className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                            Minor
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-200">
                                                    <ScrollArea className="h-[200px]">
                                                        {subjects
                                                            .filter(
                                                                (subject) =>
                                                                    subject.year_level ===
                                                                        data.year_level &&
                                                                    subject.period ===
                                                                        data.semester &&
                                                                    subject.category ===
                                                                        "Minor Subject"
                                                            )
                                                            .map(
                                                                (
                                                                    subject,
                                                                    index,
                                                                    array
                                                                ) => {
                                                                    // We are processing every two subjects in one row
                                                                    const subject1 =
                                                                        subject; // First subject
                                                                    const subject2 =
                                                                        array[
                                                                            index +
                                                                                1
                                                                        ]; // Second subject (if exists)

                                                                    return (
                                                                        index %
                                                                            2 ===
                                                                            0 && (
                                                                            <tr
                                                                                className="table-fixed"
                                                                                key={
                                                                                    subject1.code
                                                                                }
                                                                            >
                                                                                {/* First Subject Checkbox */}
                                                                                <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                    <Checkbox
                                                                                        checked={selectedSubjects.some(
                                                                                            (
                                                                                                selectedSubject
                                                                                            ) =>
                                                                                                selectedSubject.id ===
                                                                                                subject1.id
                                                                                        )}
                                                                                        onCheckedChange={() =>
                                                                                            handleSubjectToggle(
                                                                                                subject1
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                    {
                                                                                        subject1.name
                                                                                    }
                                                                                </td>

                                                                                {/* Second Subject Checkbox */}
                                                                                {subject2 && (
                                                                                    <>
                                                                                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                            <Checkbox
                                                                                                checked={selectedSubjects.some(
                                                                                                    (
                                                                                                        selectedSubject
                                                                                                    ) =>
                                                                                                        selectedSubject.id ===
                                                                                                        subject2.id
                                                                                                )}
                                                                                                onCheckedChange={() =>
                                                                                                    handleSubjectToggle(
                                                                                                        subject2
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </td>
                                                                                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                                                                                            {
                                                                                                subject2.name
                                                                                            }
                                                                                        </td>
                                                                                    </>
                                                                                )}
                                                                            </tr>
                                                                        )
                                                                    );
                                                                }
                                                            )}
                                                    </ScrollArea>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">
                                            Selected Courses
                                        </h2>
                                        <ScrollArea className="h-[380px]">
                                            <ul className="space-y-2">
                                                {selectedSubjects.length > 0 ? (
                                                    selectedSubjects.map(
                                                        (subject) => (
                                                            <li
                                                                key={subject.id}
                                                                className="border p-2 text-sm rounded-md bg-gray-50"
                                                            >
                                                                {subject.name}
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <p>No courses selected.</p>
                                                )}
                                            </ul>
                                        </ScrollArea>

                                        <Button
                                            onClick={handleSubmit}
                                            disabled={
                                                selectedSubjects.length === 0
                                            }
                                        >
                                            Submit Selected Subjects
                                        </Button>
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
}
