import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ApplicationForm from "../Public/Section/Application";
import { Label } from "@/components/ui/label";

export default function Application({ student = [], college_fee = [] }) {
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
        status: "",
    });

    const studentData = student.map((students) => ({
        // student info
        id: students.id,
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
        // payment
        payment_status: students.payment_verification.status,
    }));

    // Filtered data with only the required columns
    const tableData = studentData.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        department: student.department,
        year_level: student.year_level,
        program: student.program,
        status: student.status,
        doc_status: student.doc_status,
        payment_status: student.payment_status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [create, setCreate] = useState(false);

    const handleCreate = () => {
        setCreate((prev) => !prev);
    };

    // const handleAdd = () => {
    //     setItemId(null);
    //     setAdd(true);
    //     setData({
    //         code: "",
    //         name: "",
    //         department: "",
    //         duration: "",
    //         campus: "",
    //         status: "",
    //     });
    // };

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
            address: student.address,
            birth_date: student.birth_date,
            birth_place: student.birth_place,
            civil_status: student.civil_status,
            gender: student.gender,
            religion: student.religion,

            father_name: student.father_name,
            father_occupation: student.father_occupation,
            father_phone: student.father_phone,
            mother_name: student.mother_name,
            mother_occupation: student.mother_occupation,
            mother_phone: student.mother_phone,
            guardian_name: student.guardian_name,
            guardian_relationship: student.guardian_relationship,
            guardian_phone: student.guardian_phone,
        });

        setAdd(true);
    };

    const handleSubmit = () => {
        post(route("admin.program.store"), {
            onSuccess: () => {
                toast("Program has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    code: "",
                    name: "",
                    department: "",
                    duration: "",
                    campus: "",
                    status: "",
                });
            },
        });
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
                <h1 className="text-2xl font-bold">Enrollment</h1>
            </div>
            <div className="flex justify-between mb-3">
                <Input type="text" placeholder="Search" className="w-[300px]" />
                {/* <Button onClick={handleCreate}>Create</Button> */}
            </div>
            <div className="border rounded-sm px-4">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                />
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-4xl h-[600px]">
                            <DialogHeader>
                                <Tabs defaultValue="details">
                                    <div className="flex justify-between">
                                        <TabsList>
                                            <TabsTrigger value="details">
                                                Application Details
                                            </TabsTrigger>
                                            <TabsTrigger value="documents">
                                                Documents
                                            </TabsTrigger>
                                            <TabsTrigger value="payment">
                                                Payment
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsList>
                                            <TabsTrigger value="schedule">
                                                Schedule
                                            </TabsTrigger>
                                            <TabsTrigger value="school_fee">
                                                School Fee
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="details">
                                        <DialogTitle>
                                            Application Details
                                        </DialogTitle>
                                        <DialogDescription>
                                            <ScrollArea className="h-[500px] p-4">
                                                <div>
                                                    <h1 className="text-black font-bold text-md">
                                                        Student Profile
                                                    </h1>
                                                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                        <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-gray-100 text-sm">
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Email
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {data.email}
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Branch
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.branch
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Department
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.department
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Program
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.program
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Year Level
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.year_level
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Semester
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.semester
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    School Year
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.school_year
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Classified
                                                                    As
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.classified_as
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Last School
                                                                    Attended
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.last_school_attended
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Last School
                                                                    Address
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.last_school_address
                                                                    }
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h1 className="text-black font-bold text-md">
                                                        Personal Profile
                                                    </h1>
                                                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                        <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-gray-100 text-sm">
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Name
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {data.name}
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Address
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.address
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Date of
                                                                    Birth
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.birth_date
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Place of
                                                                    Birth
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.birth_place
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Civil Status
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.civil_status
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Gender
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.gender
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Religion
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.religion
                                                                    }
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h1 className="text-black font-bold text-md">
                                                        Parents Profile
                                                    </h1>
                                                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                        <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-gray-100 text-sm">
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Father's
                                                                    Name
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.father_name
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Occupation
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.father_occupation
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Phone #
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.father_phone
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div></div>
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Mother's
                                                                    Name
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.mother_name
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Occupation
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.mother_occupation
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Phone #
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.mother_phone
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <br />
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Guardian's
                                                                    Name
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.guardian_name
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Relationship
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.guardian_relationship
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                                <dt className="font-medium text-gray-900">
                                                                    Phone #
                                                                </dt>
                                                                <dd className="text-gray-700 sm:col-span-2">
                                                                    {
                                                                        data.guardian_phone
                                                                    }
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </ScrollArea>
                                        </DialogDescription>
                                    </TabsContent>
                                    <TabsContent value="documents">
                                        Display Student Documents Here
                                    </TabsContent>
                                    <TabsContent value="payment">
                                        Display Student Payment Here
                                    </TabsContent>
                                    <TabsContent value="school_fee">
                                        <div>
                                            <div className="overflow-x-auto ">
                                                <div className="text-white bg-primary px-4 font-bold py-1">
                                                    {data.program}
                                                </div>

                                                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                                                    <tbody className="divide-y divide-gray-200">
                                                        {college_fee
                                                            .filter(
                                                                (fee) =>
                                                                    fee.program_code ===
                                                                    data.program
                                                            )
                                                            .map((fee) => (
                                                                <div>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Down
                                                                            Payment
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.down_payment
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Prelim
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.prelim
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Midterm
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.midterm
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Finals
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.finals
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Discount
                                                                            Name
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.discount_title
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Discount
                                                                            Amount
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.discount_amount
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Total
                                                                            Amount
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.total_amount
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                </div>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="overflow-x-auto ">
                                                <div className="text-white bg-primary px-4 font-bold py-1">
                                                    Other Fees
                                                </div>

                                                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                                                    <tbody className="divide-y divide-gray-200">
                                                        {college_fee
                                                            .filter(
                                                                (fee) =>
                                                                    fee.program_code ===
                                                                    data.program
                                                            )
                                                            .map((fee) => (
                                                                <div>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Down
                                                                            Payment
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.down_payment
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Prelim
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.prelim
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Midterm
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.midterm
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Finals
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.finals
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Discount
                                                                            Name
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.discount_title
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Discount
                                                                            Amount
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.discount_amount
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            Total
                                                                            Amount
                                                                        </th>
                                                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                                                            {
                                                                                fee.total_amount
                                                                            }
                                                                        </th>
                                                                    </tr>
                                                                </div>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {create && <ApplicationForm />}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Program</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this program?
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
            </div>
        </Layout>
    );
}
