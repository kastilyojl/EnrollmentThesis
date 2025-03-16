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

import { Textarea } from "@/components/ui/textarea";

import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { Separator } from "@/components/ui/separator";

export default function OtherBilling({ other_fee = [] }) {
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
        title: "",
        amount: "",
        description: "",
    });

    const handleEdit = (other_fee) => {
        setItemId(other_fee);
        setEdit(true);
        setData({
            id: other_fee.id,
            title: other_fee.title,
            amount: other_fee.amount,
            description: other_fee.description,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.otherfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    title: "",
                    amount: "",
                    description: "",
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
        onDelete(route("admin.otherfee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fees has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {other_fee.map((other_fee) => (
                    <Card
                        key={other_fee.id}
                        className="w-full text-sm odd:bg-customBlue even:bg-violet-300 space-y-2"
                    >
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                {other_fee.title}
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal className="h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleEdit(other_fee)
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
                                                    handleDel(other_fee)
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
                            {other_fee.amount && (
                                <p className="grid grid-cols-2">
                                    amount:{" "}
                                    <span className="text-black text-end">
                                        {other_fee.amount}
                                    </span>
                                </p>
                            )}
                            {other_fee.description && (
                                <p className="grid grid-cols-2">
                                    description:{" "}
                                    <span className="text-black text-end">
                                        {other_fee.description}
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
                                            new Date(other_fee.created_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                                <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                    updated at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(other_fee.updated_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {other_fee < 1 && (
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
                                        <Label htmlFor="title">Name</Label>
                                        <Input
                                            name="title"
                                            type="text"
                                            className="text-black"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input
                                            name="amount"
                                            type="number"
                                            className="text-black"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            name="description"
                                            type="number"
                                            className="text-black"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
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
            )}{" "}
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
