import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError";
import { useForm } from "@inertiajs/react";

export default function Subjects({ program = [], subject = [] }) {
    const tableHeader = [
        "Program",
        "Subject Code",
        "Subject Name",
        "Category",
        "Prerequisites",
        "Year Level",
        "Period",
        "Lec",
        "Lab",
        "Unit",
        "Total",
    ];

    const tableAddHeader = [
        "Program",
        "Subject Code",
        "Subject Name",
        "Category",
        "Prerequisites",
        "Department",
        "Year Level",
        "Lec",
        "Lab",
        "Unit",
        "Total",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        program_code: "",
        code: "",
        name: "",
        prerequisites: "",
        period: "",
        department: "",
        year_level: "",
        category: "",
        lec: "",
        lab: "",
        unit: "",
        total: "",
    });

    const tableData = subject.map((subject) => ({
        id: subject.id,
        program_code: subject.program_code,
        code: subject.code,
        name: subject.name,
        category: subject.category,
        prerequisites: subject.prerequisites,
        year_level: subject.year_level,
        period: subject.period,
        // department: subject.department,
        lec: subject.lec,
        lab: subject.lab,
        unit: subject.unit,
        total: subject.total,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            program_code: "",
            code: "",
            name: "",
            prerequisites: "",
            period: "",
            department: "",
            year_level: "",
            category: "",
            lec: "",
            lab: "",
            unit: "",
            total: "",
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.subject.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Subject has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (subject) => {
        setItemId(subject);
        setAdd(true);
        setData({
            program_code: subject.program_code,
            code: subject.code,
            name: subject.name,
            prerequisites: subject.prerequisites,
            period: subject.period,
            department: subject.department,
            year_level: subject.year_level,
            category: subject.category,
            lec: subject.lec,
            lab: subject.lab,
            unit: subject.unit,
            total: subject.total,
        });
    };

    const handleSubmit = () => {
        console.log("Data being sent:", sub);
        post(
            route("admin.subject.store"),
            // { data: data },
            {
                onSuccess: () => {
                    console.log("Success Trigger");
                    toast("Subjects has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    });
                    setAdd(false);
                    setData({
                        program_code: "",
                        code: "",
                        name: "",
                        prerequisites: "",
                        period: "",
                        department: "",
                        year_level: "",
                        category: "",
                        lec: "",
                        lab: "",
                        unit: "",
                        total: "",
                    });
                },
            }
        );
    };

    const handleUpdateSubmit = () => {
        // console.log("editing program:", itemId.id);
        post(route("admin.subject.update", { id: itemId }), {
            onSuccess: () => {
                toast("Subject has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    program_code: "",
                    code: "",
                    name: "",
                    prerequisites: "",
                    period: "",
                    department: "",
                    year_level: "",
                    category: "",
                    lec: "",
                    lab: "",
                    unit: "",
                    total: "",
                });
            },
        });
    };

    const [sub, setSub] = useState([]);

    const handleSubjectList = (e) => {
        e.preventDefault();

        const newSubject = {
            program_code: data.program_code,
            code: data.code,
            name: data.name,
            prerequisites: data.prerequisites,
            period: data.period,
            department: data.department,
            year_level: data.year_level,
            category: data.category,
            lec: data.lec,
            lab: data.lab,
            unit: data.unit,
            total: data.total,
        };

        setSub([...sub, newSubject]);

        setData("sub", [...sub, newSubject]);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Subject</h1>
            </div>
            <div className="flex justify-between mb-3">
                <Input type="text" placeholder="Search" className="w-[300px]" />
                <Button onClick={handleAdd}>Create</Button>
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
                        <DialogContent
                            className={`${
                                itemId === null ? "max-w-5xl" : "max-w-xl"
                            }`}
                        >
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Subject"
                                        : "Edit Subject"}
                                </DialogTitle>
                                <div className="pt-2">
                                    <Separator />
                                </div>
                                <DialogDescription
                                    className={`grid gap-4 ${
                                        itemId === null ? "lg:grid-cols-2" : ""
                                    }`}
                                >
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="department">
                                                Department
                                            </Label>
                                            <Select
                                                name="department"
                                                value={data.department}
                                                onValueChange={(value) =>
                                                    setData("department", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SHS">
                                                        Senior High School
                                                    </SelectItem>
                                                    <SelectItem value="College">
                                                        College
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.department &&
                                                !data.department && (
                                                    <InputError
                                                        message={
                                                            errors.department
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="program_code">
                                                Program
                                            </Label>
                                            <Select
                                                name="program_code"
                                                value={data.program_code}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "program_code",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {program
                                                        .filter((program) =>
                                                            data.department ===
                                                            "SHS"
                                                                ? program.department ===
                                                                  "SHS"
                                                                : program.department ===
                                                                  "College"
                                                        )
                                                        .map((program) => {
                                                            return (
                                                                <SelectItem
                                                                    value={
                                                                        program.code
                                                                    }
                                                                >
                                                                    {
                                                                        program.code
                                                                    }
                                                                </SelectItem>
                                                            );
                                                        })}
                                                </SelectContent>
                                            </Select>
                                            {errors.program_code &&
                                                !data.program_code && (
                                                    <InputError
                                                        message={
                                                            errors.program_code
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>

                                        <div>
                                            <Label htmlFor="year_level">
                                                Year Level
                                            </Label>
                                            <Select
                                                name="year_level"
                                                value={data.year_level}
                                                onValueChange={(value) =>
                                                    setData("year_level", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Year Level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data.department ===
                                                    "College" ? (
                                                        <>
                                                            <SelectItem value="1st Year">
                                                                1st Year
                                                            </SelectItem>
                                                            <SelectItem value="2nd Year">
                                                                2nd Year
                                                            </SelectItem>
                                                            <SelectItem value="3rd Year">
                                                                3rd Year
                                                            </SelectItem>
                                                            <SelectItem value="4th Year">
                                                                4th Year
                                                            </SelectItem>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SelectItem value="Grade 11">
                                                                Grade 11
                                                            </SelectItem>
                                                            <SelectItem value="Grade 12">
                                                                Grade 12
                                                            </SelectItem>
                                                        </>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.year_level &&
                                                !data.year_level && (
                                                    <InputError
                                                        message={
                                                            errors.year_level
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="period">
                                                Period
                                            </Label>
                                            <Select
                                                name="period"
                                                value={data.period}
                                                onValueChange={(value) =>
                                                    setData("period", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Period" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1st Semester">
                                                        1st Semester
                                                    </SelectItem>
                                                    <SelectItem value="2nd Semester">
                                                        2nd Semester
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.period && !data.period && (
                                                <InputError
                                                    message={errors.period}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <Select
                                                name="category"
                                                value={data.category}
                                                onValueChange={(value) =>
                                                    setData("category", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Major Subject">
                                                        Major Subject
                                                    </SelectItem>
                                                    <SelectItem value="Minor Subject">
                                                        Minor Subject
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.category &&
                                                !data.category && (
                                                    <InputError
                                                        message={
                                                            errors.category
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>

                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Subject name"
                                                className="text-black"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && !data.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="code">
                                                Subject Code
                                            </Label>
                                            <Input
                                                name="code"
                                                type="text"
                                                placeholder="Subject code"
                                                className="text-black"
                                                value={data.code}
                                                onChange={(e) =>
                                                    setData(
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.code && !data.code && (
                                                <InputError
                                                    message={errors.code}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="prerequisites">
                                                Prerequisites
                                            </Label>
                                            <Select
                                                name="prerequisites"
                                                value={data.prerequisites}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "prerequisites",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Prerequisites" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="None">
                                                        None
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.prerequisites &&
                                                !data.prerequisites && (
                                                    <InputError
                                                        message={
                                                            errors.prerequisites
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                {" "}
                                                <Label htmlFor="lec">
                                                    Lec.
                                                </Label>
                                                <Input
                                                    name="lec"
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-black"
                                                    value={data.lec}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lec",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.lec && !data.lec && (
                                                    <InputError
                                                        message={errors.lec}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="lab">
                                                    Lab.
                                                </Label>
                                                <Input
                                                    name="lab"
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-black"
                                                    value={data.lab}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lab",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.lab && !data.lab && (
                                                    <InputError
                                                        message={errors.lab}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                {" "}
                                                <Label htmlFor="unit">
                                                    Unit
                                                </Label>
                                                <Input
                                                    name="unit"
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-black"
                                                    value={data.unit}
                                                    onChange={(e) =>
                                                        setData(
                                                            "unit",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.unit && !data.unit && (
                                                    <InputError
                                                        message={errors.unit}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="total">
                                                    Total
                                                </Label>
                                                <Input
                                                    name="total"
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-black"
                                                    value={
                                                        (data.total =
                                                            Number(data.lec) +
                                                            Number(data.lab))
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "total",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.total &&
                                                    !data.total && (
                                                        <InputError
                                                            message={
                                                                errors.total
                                                            }
                                                            className="text-red-500"
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    {itemId === null && (
                                        <Table>
                                            <TableCaption>
                                                A list of subject added.
                                            </TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    {tableAddHeader.map(
                                                        (row) => {
                                                            return (
                                                                <TableHead>
                                                                    {row}
                                                                </TableHead>
                                                            );
                                                        }
                                                    )}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sub.map((sub) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell className="font-medium">
                                                                {
                                                                    sub.program_code
                                                                }
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.name}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {
                                                                    sub.prerequisites
                                                                }
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.period}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.department}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.year_level}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.category}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.lec}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.lab}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.unit}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {sub.total}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    )}
                                    <div
                                        className={`flex gap-4 ${
                                            itemId === null
                                                ? "justify-center"
                                                : ""
                                        }`}
                                    >
                                        <Button
                                            className="mt-3"
                                            onClick={
                                                itemId === null
                                                    ? handleSubmit
                                                    : handleUpdateSubmit
                                            }
                                        >
                                            Save
                                        </Button>
                                        {itemId === null && (
                                            <Button
                                                className="mt-3"
                                                onClick={handleSubjectList}
                                            >
                                                Add
                                            </Button>
                                        )}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Subject</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this subject?
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
