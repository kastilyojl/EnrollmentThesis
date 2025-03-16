import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { Separator } from "@/components/ui/separator";

export default function SHSBilling({ shs_fee = [] }) {
    const [itemId, setItemId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        program_code: "",
        year_level: "",
        payment_type: "",
        cash: "",
        installment: "",
        voucher_amount: "",
        onetime_fee: "",
        down_payment_shs: "",
    });

    const handleEdit = (shs_fee) => {
        setItemId(shs_fee);
        setEdit(true);
        setData({
            id: shs_fee.id,
            program_code: shs_fee.program_code,
            year_level: shs_fee.year_level,
            payment_type: shs_fee.payment_type,
            cash: shs_fee.cash,
            installment: shs_fee.installment,
            voucher_amount: shs_fee.voucher_amount,
            onetime_fee: shs_fee.onetime_fee,
            down_payment_shs: shs_fee.down_payment_shs,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.shsfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    cash: "",
                    installment: "",
                    voucher_amount: "",
                    onetime_fee: "",
                    down_payment_shs: "",
                });
            },
        });
    };

    const handleDel = (other_fee) => {
        setItemId(other_fee);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.shsfee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shs_fee.map((shs_fee) => (
                    <Card
                        key={shs_fee.id}
                        className="w-full text-sm odd:bg-customBlue even:bg-red-300 space-y-2 "
                    >
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                {shs_fee.program_code}
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal className="h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleEdit(shs_fee)
                                                }
                                            >
                                                <Edit />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download />
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDel(shs_fee)
                                                }
                                            >
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="space-y-2">
                            {shs_fee.year_level && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    year level:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.year_level}
                                    </span>
                                </p>
                            )}
                            {shs_fee.payment_type && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    type:
                                    <span className="text-black text-end">
                                        {shs_fee.payment_type}
                                    </span>
                                </p>
                            )}
                            {shs_fee.cash && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    cash:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.cash}
                                    </span>
                                </p>
                            )}
                            {shs_fee.installment && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    installment:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.installment}
                                    </span>
                                </p>
                            )}
                            {shs_fee.down_payment_shs && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    down payment:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.down_payment_shs}
                                    </span>
                                </p>
                            )}
                            {shs_fee.voucher_amount && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    voucher amount:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.voucher_amount}
                                    </span>
                                </p>
                            )}
                            {shs_fee.onetime_fee && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    one-time fee:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.onetime_fee}
                                    </span>
                                </p>
                            )}
                        </CardContent>
                        <Separator />
                        <CardFooter>
                            <div className="w-full">
                                <div className="text-[12px] text-gray-600 grid grid-cols-2">
                                    created at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(shs_fee.created_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                                <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                    updated at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(shs_fee.updated_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {shs_fee < 1 && (
                <div className="flex justify-center pt-20">
                    <NoData />
                </div>
            )}
            {edit && (
                <Dialog open={edit} onOpenChange={(open) => setEdit(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Fee</DialogTitle>
                            <DialogDescription>
                                <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <Label htmlFor="program_code">
                                            Strand
                                        </Label>
                                        <Select
                                            name="program_code"
                                            value={data.program_code}
                                            onValueChange={(value) =>
                                                setData("program_code", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="stem">
                                                    STEM
                                                </SelectItem>
                                                <SelectItem value="abm">
                                                    ABM
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="year_level">
                                            Year Level
                                        </Label>
                                        <Select
                                            className="h-auto"
                                            name="year_level"
                                            value={data.year_level}
                                            onValueChange={(value) =>
                                                setData("year_level", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="grade 11">
                                                    Grade 11
                                                </SelectItem>
                                                <SelectItem value="grade 12">
                                                    Grade 12
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="payment_type">
                                            Type
                                        </Label>
                                        <Select
                                            name="payment_type"
                                            value={data.payment_type}
                                            onValueChange={(value) =>
                                                setData("payment_type", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="payee">
                                                    Payee
                                                </SelectItem>
                                                <SelectItem value="voucher grantee">
                                                    Voucher Grantee
                                                </SelectItem>
                                                <SelectItem value="esc & non-esc grantee">
                                                    ESC & Non-ESC grantee
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="cash">
                                            Cash (Discounted)
                                        </Label>
                                        <Input
                                            name="cash"
                                            type="number"
                                            className="text-black"
                                            value={data.cash}
                                            onChange={(e) =>
                                                setData("cash", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="installment">
                                            Installment
                                        </Label>
                                        <Input
                                            name="installment"
                                            type="number"
                                            className="text-black"
                                            value={data.installment}
                                            onChange={(e) =>
                                                setData(
                                                    "installment",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="down_payment_shs">
                                            Downpayment (Installment)
                                        </Label>
                                        <Input
                                            name="down_payment_shs"
                                            type="number"
                                            className="text-black"
                                            value={data.down_payment_shs}
                                            onChange={(e) =>
                                                setData(
                                                    "down_payment_shs",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="voucher_amount">
                                            Voucher Amount
                                        </Label>
                                        <Input
                                            name="voucher_amount"
                                            type="number"
                                            className="text-black"
                                            value={data.voucher_amount}
                                            onChange={(e) =>
                                                setData(
                                                    "voucher_amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="onetime_fee">
                                            One-time fee
                                        </Label>
                                        <Input
                                            name="onetime_fee"
                                            type="number"
                                            className="text-black"
                                            value={data.onetime_fee}
                                            onChange={(e) =>
                                                setData(
                                                    "onetime_fee",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="mt-3"
                                    onClick={handleUpdateSubmit}
                                >
                                    Save
                                </Button>
                                ;
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
            {del && (
                <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Fee</DialogTitle>
                            <DialogDescription>
                                <div className="my-3">
                                    Are you sure to delete this fee?
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
    );
}
