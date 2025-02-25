import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

export default function Program({ program = [] }) {
    const tableHeader = ["Code", "Name", "Department", ""];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        code: "",
        name: "",
        department: "",
        duration: "",
        campus: "",
        status: "",
    });

    const tableData = program.map((programs) => ({
        id: programs.id,
        code: programs.code,
        name: programs.name,
        department: programs.department,
        duration: programs.duration,
        status: programs.status,
        campus: programs.campus,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            code: "",
            name: "",
            department: "",
            duration: "",
            campus: "",
            status: "",
        });
    };

    const handleDel = (program) => {
        setItemId(program);
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

    const handleEdit = (program) => {
        setItemId(program);
        setAdd(true);
        setData({
            id: program.id,
            code: program.code,
            name: program.name,
            department: program.department,
            duration: program.duration,
            status: program.status,
            campus: program.campus,
        });
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
        // console.log("editing program:", itemId.id);
        post(route("admin.program.update", { id: itemId }), {
            onSuccess: () => {
                toast("Program has been updated", {
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

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Program</h1>
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Program"
                                        : "Edit Program"}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="code">Code</Label>
                                            <Input
                                                name="code"
                                                type="text"
                                                placeholder="Program Code"
                                                value={data.code}
                                                onChange={(e) =>
                                                    setData(
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.code && !data.code && (
                                                <InputError
                                                    message={errors.code}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.code && (
                                                    <InputError
                                                        message={errors.code}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Program name"
                                                className="text-black"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.name && !data.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.name && (
                                                    <InputError
                                                        message={errors.name}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
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
                                            <Label htmlFor="status">
                                                Status
                                            </Label>
                                            <Select
                                                name="status"
                                                value={data.status}
                                                onValueChange={(value) =>
                                                    setData("status", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="Pending">
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem value="Inactive">
                                                        Inactive
                                                    </SelectItem>
                                                    <SelectItem value="Closed">
                                                        Closed
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.status && !data.status && (
                                                <InputError
                                                    message={errors.status}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="campus">
                                                Campus
                                            </Label>
                                            <Select
                                                name="campus"
                                                value={data.campus}
                                                onValueChange={(value) =>
                                                    setData("campus", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Campus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Banlic">
                                                        Banlic - Main Branch
                                                    </SelectItem>
                                                    <SelectItem value="Uno">
                                                        Uno Branch
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.campus && !data.campus && (
                                                <InputError
                                                    message={errors.campus}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="duration">
                                                Duration
                                            </Label>
                                            <Select
                                                name="duration"
                                                value={data.duration}
                                                onValueChange={(value) =>
                                                    setData("duration", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1 Year">
                                                        1 Year
                                                    </SelectItem>
                                                    <SelectItem value="2 Years">
                                                        2 Years
                                                    </SelectItem>
                                                    <SelectItem value="3 Years">
                                                        3 Years
                                                    </SelectItem>
                                                    <SelectItem value="4 Years">
                                                        4 Years
                                                    </SelectItem>
                                                    <SelectItem value="5 Years">
                                                        5 Years
                                                    </SelectItem>
                                                    <SelectItem value="6 Years">
                                                        6 Years
                                                    </SelectItem>
                                                    <SelectItem value="7 Years">
                                                        7 Yeas
                                                    </SelectItem>
                                                    <SelectItem value="8 Years">
                                                        8 Years
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.duration &&
                                                !data.duration && (
                                                    <InputError
                                                        message={
                                                            errors.duration
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                    </div>
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
                                    ;
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
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
