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

export default function Payment({ program = [], payment = [] }) {
    const tableHeader = [
        "Name",
        "Email",
        "Year Level",
        "Program",
        "Purpose",
        "Semester",
        "Reference",
        "Amount",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        name: "",
        email: "",
        year_level: "",
        program: "",
        purpose: "",
        semester: "",
        reference: "",
        amount: "",
        payment_receipt: "",
        status: "",
    });

    const paymentData = payment.map((payment) => ({
        id: payment.id,
        name: payment.name,
        email: payment.email,
        year_level: payment.year_level,
        program: payment.program,
        purpose: payment.purpose,
        semester: payment.semester,
        reference: payment.reference,
        amount: payment.amount,
        payment_receipt: payment.payment_receipt,
        status: payment.status,
    }));

    const tableData = paymentData.map((payment) => ({
        id: payment.id,
        name: payment.name,
        email: payment.email,
        year_level: payment.year_level,
        program: payment.program,
        purpose: payment.purpose,
        semester: payment.semester,
        reference: payment.reference,
        amount: payment.amount,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            name: "",
            email: "",
            year_level: "",
            program: "",
            purpose: "",
            semester: "",
            reference: "",
            amount: "",
            payment_receipt: "",
        });
    };

    const [enlarge, setEnlarge] = useState(false);
    const enlargePhoto = (e) => {
        e.preventDefault();
        setEnlarge((prev) => !prev);
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.payment.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Program has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (payment) => {
        payment = paymentData.find((s) => s.id === payment.id);
        setItemId(payment);
        setAdd(true);
        setData({
            id: payment.id,
            name: payment.name,
            email: payment.email,
            year_level: payment.year_level,
            program: payment.program,
            purpose: payment.purpose,
            semester: payment.semester,
            reference: payment.reference,
            amount: payment.amount,
            payment_receipt: payment.payment_receipt,
        });
    };

    const handleSubmit = () => {
        post(route("admin.program.store"), {
            onSuccess: () => {
                toast("Payment has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    name: "",
                    email: "",
                    year_level: "",
                    program: "",
                    purpose: "",
                    semester: "",
                    reference: "",
                    amount: "",
                    payment_receipt: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.payment.update", { id: itemId }), {
            onSuccess: () => {
                toast("Payment has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    name: "",
                    email: "",
                    year_level: "",
                    program: "",
                    purpose: "",
                    semester: "",
                    reference: "",
                    amount: "",
                    payment_receipt: "",
                });
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment</h1>
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
                                        ? "Add Payment"
                                        : "Edit Payment"}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="name">name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Program name"
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
                                            <Label htmlFor="year_level">
                                                Year Level
                                            </Label>
                                            <Input
                                                name="year_level"
                                                type="text"
                                                placeholder="Program year_level"
                                                className="text-black"
                                                value={data.year_level}
                                                onChange={(e) =>
                                                    setData(
                                                        "year_level",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.year_level &&
                                                !data.year_level && (
                                                    <InputError
                                                        message={
                                                            errors.year_level
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )) ||
                                                (errors.year_level && (
                                                    <InputError
                                                        message={
                                                            errors.year_level
                                                        }
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="program">
                                                Program
                                            </Label>
                                            <Input
                                                name="program"
                                                type="text"
                                                className="text-black"
                                                value={data.program}
                                                onChange={(e) =>
                                                    setData(
                                                        "program",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.program &&
                                                !data.program && (
                                                    <InputError
                                                        message={errors.program}
                                                        className="text-red-500"
                                                    />
                                                )) ||
                                                (errors.program && (
                                                    <InputError
                                                        message={errors.program}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                className="text-black"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.email && !data.email && (
                                                <InputError
                                                    message={errors.email}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.email && (
                                                    <InputError
                                                        message={errors.email}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="purpose">
                                                Purpose
                                            </Label>
                                            <Select
                                                name="purpose"
                                                value={data.purpose}
                                                onValueChange={(value) =>
                                                    setData("purpose", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Tuition Fee">
                                                        Tuition Fee
                                                    </SelectItem>
                                                    <SelectItem value="Documents Fee">
                                                        Documents Fee
                                                    </SelectItem>
                                                    <SelectItem value="Graduation Fee">
                                                        Graduation Fee
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.purpose &&
                                                !data.purpose && (
                                                    <InputError
                                                        message={errors.purpose}
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="semester">
                                                Semester
                                            </Label>
                                            <Select
                                                name="semester"
                                                value={data.semester}
                                                onValueChange={(value) =>
                                                    setData("semester", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
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
                                            {errors.semester &&
                                                !data.semester && (
                                                    <InputError
                                                        message={
                                                            errors.semester
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="amount">
                                                Amount
                                            </Label>
                                            <Input
                                                name="amount"
                                                type="number"
                                                min={0}
                                                className="text-black"
                                                value={data.amount}
                                                onChange={(e) =>
                                                    setData(
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.amount && !data.amount && (
                                                <InputError
                                                    message={errors.amount}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.amount && (
                                                    <InputError
                                                        message={errors.amount}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="payment_receipt"
                                                className="block"
                                            >
                                                Payment Receipt
                                            </Label>
                                            <div
                                                onClick={enlargePhoto}
                                                className={`cursor-pointer flex justify-end ${
                                                    enlarge
                                                        ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                                                        : "inline-block"
                                                }`}
                                            >
                                                {data.payment_receipt && (
                                                    <img
                                                        src={`http://127.0.0.1:8000/private-files/${data.payment_receipt
                                                            .split("/")
                                                            .pop()}`}
                                                        alt="Payment Receipt"
                                                        className={`transition-all duration-300 ${
                                                            enlarge
                                                                ? "max-h-[90vh] max-w-[90vw]"
                                                                : "max-w-[100px] max-h-[100px]"
                                                        }`}
                                                        value={
                                                            data.payment_receipt
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "payment_receipt",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>

                                            {(errors.payment_receipt &&
                                                !data.payment_receipt && (
                                                    <InputError
                                                        message={
                                                            errors.payment_receipt
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )) ||
                                                (errors.payment_receipt && (
                                                    <InputError
                                                        message={
                                                            errors.payment_receipt
                                                        }
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3 max-w-[300px]">
                                        <Select
                                            name="status"
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData("status", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                Status
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="approved">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="onhold">
                                                    On Hold
                                                </SelectItem>
                                                <SelectItem value="reject">
                                                    Reject
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            onClick={
                                                itemId === null
                                                    ? handleSubmit
                                                    : handleUpdateSubmit
                                            }
                                        >
                                            Save
                                        </Button>
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
                                <DialogTitle>Delete Payment</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this payment?
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
