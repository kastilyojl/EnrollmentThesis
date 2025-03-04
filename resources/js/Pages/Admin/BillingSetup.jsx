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
import RadioButton from "@/Components/RadioButton";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BillingSetup({ program = [], subject = [], fee = [] }) {
    const tableHeader = [
        "Type",
        "Program Name",
        "No. of Unit",
        "Amount",
        "Name",
        "Description",
        "Discount Name",
        "Discount Amount",
        "Total Amount",
    ];

    const [enableDiscount, setEnableDiscount] = useState(0);
    const [tuitionFee, setTuitionFee] = useState(0);
    const billing = {
        type: ["Tuition Fee", "Miscellaneous and Others"],
    };

    const tableAddHeader = [
        "Type",
        "Program Name",
        "No. of Unit",
        "Amount",
        "Name",
        "Description",
        "Discount Name",
        "Discount Amount",
        "Total Amount",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        fee_type: "",
        program_name: "",
        no_unit: "",
        amount: "",
        misellaneous_name: "",
        misellaneous_description: "",
        discount_name: "",
        discount_amount: "",
        total_amount: "",
    });

    const tableData = fee.map((fees) => ({
        id: fees.id,
        fee_type: fees.fee_type,
        program_name: fees.program_name,
        no_unit: fees.no_unit,
        amount: fees.amount,
        misellaneous_name: fees.misellaneous_name,
        misellaneous_description: fees.misellaneous_description,
        discount_name: fees.discount_name,
        discount_amount: fees.discount_amount,
        total_amount: fees.total_amount,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const programs = program
        .filter(
            (program) =>
                program.status === "Active" || program.status === "active"
        )
        .map((program) => [program.name]);

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            fee_type: "",
            program_name: "",
            no_unit: "",
            amount: "",
            misellaneous_name: "",
            misellaneous_description: "",
            discount_name: "",
            discount_amount: "",
            total_amount: "",
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
            type: subject.type,
            program_name: subject.program_name,
            no_unit: subject.no_unit,
            amount: subject.amount,
            title: subject.title,
            description: subject.description,
            discount_title: subject.discount_title,
            discount_amount: subject.discount_amount,
            total_amount: subject.total_amount,
        });
    };

    const handleSubmit = () => {
        console.log("Data being sent:", fees);
        post(
            route("admin.billing.store"),
            // { fees: fees },
            {
                onSuccess: () => {
                    console.log("Success Trigger");
                    toast("Billing has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    });
                    setAdd(false);
                    setData({
                        fee_type: "",
                        program_name: "",
                        no_unit: "",
                        amount: "",
                        misellaneous_name: "",
                        misellaneous_description: "",
                        discount_name: "",
                        discount_amount: "",
                        total_amount: "",
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
                    fee_type: "",
                    program_name: "",
                    no_unit: "",
                    amount: "",
                    misellaneous_name: "",
                    misellaneous_description: "",
                    discount_name: "",
                    discount_amount: "",
                    total_amount: "",
                });
            },
        });
    };

    const [fees, setFees] = useState([]);

    const handleFeeList = (e) => {
        e.preventDefault();

        const newFee = {
            fee_type: data.fee_type,
            program_name: data.program_name,
            no_unit: data.no_unit,
            amount: data.amount,
            misellaneous_name: data.misellaneous_name,
            misellaneous_description: data.misellaneous_description,
            discount_name: data.discount_name,
            discount_amount: data.discount_amount,
            total_amount: data.total_amount,
        };

        setFees([...fees, newFee]);

        setData("fees", [...fees, newFee]);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Billing</h1>
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
                                    {itemId === null ? "Add Fees" : "Edit Fees"}
                                </DialogTitle>
                                <div className="pt-2">
                                    <Separator />
                                </div>
                                <DialogDescription
                                    className={`grid gap-4 ${
                                        itemId === null ? "lg:grid-cols" : ""
                                    }`}
                                >
                                    <div className="mt-3 grid grid-cols-4 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="fee_type">
                                                Type
                                            </Label>
                                            <RadioGroup
                                                name="fee_type"
                                                value={data.fee_type}
                                                onValueChange={(value) =>
                                                    setData("fee_type", value)
                                                }
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="tuition fee"
                                                        id="tuition"
                                                    />
                                                    <Label htmlFor="tuition">
                                                        Tuition fee
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="miscellaneous & others"
                                                        id="miscellaneous"
                                                    />
                                                    <Label htmlFor="miscellaneous">
                                                        Miscellaneous & Others
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        {data.fee_type === "tuition fee" && (
                                            <div>
                                                <Label htmlFor="tuition fee">
                                                    Tuition Fee
                                                </Label>
                                                <RadioGroup
                                                    defaultValue="per unit"
                                                    name="tuition_fee"
                                                    value={data.tuition_fee}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            "tuition_fee",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="per unit"
                                                            id="perunit"
                                                        />
                                                        <Label htmlFor="perunit">
                                                            Per Unit
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="per course"
                                                            id="percourse"
                                                        />
                                                        <Label htmlFor="percourse">
                                                            Per Course
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        )}
                                        <div>
                                            <Label htmlFor="discount">
                                                Discount
                                            </Label>
                                            <RadioGroup
                                                defaultValue="no"
                                                name="discount"
                                                value={data.discount}
                                                onValueChange={(value) =>
                                                    setData("discount", value)
                                                }
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="yes"
                                                        id="yes"
                                                    />
                                                    <Label htmlFor="yes">
                                                        Yes
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="no"
                                                        id="no"
                                                    />
                                                    <Label htmlFor="no">
                                                        No
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <Label>Total Amount</Label>
                                            <Input
                                                name="total_amount"
                                                type="number"
                                                min={0}
                                                value={
                                                    (data.total_amount =
                                                        Number(data.amount) -
                                                        Number(
                                                            data.discount_amount
                                                        ))
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "total_amount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Tuition Fee */}
                                        {data.fee_type === "tuition fee" &&
                                            (data.tuition_fee === "per unit" ? (
                                                <div>
                                                    <Label># of Unit</Label>
                                                    <Input
                                                        name="no_unit"
                                                        type="number"
                                                        min={0}
                                                        value={data.no_unit}
                                                        onChange={(e) =>
                                                            setData(
                                                                "no_unit",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <Label>Program</Label>
                                                    <Input
                                                        name="program_name"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setData(
                                                                "program_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        {/* Miscellaneous Fee */}
                                        {data.fee_type ===
                                            "miscellaneous & others" && (
                                            <>
                                                <div>
                                                    <Label htmlFor="misellaneous_name">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        name="misellaneous_name"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setData(
                                                                "misellaneous_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="misellaneous_description">
                                                        Description
                                                    </Label>
                                                    <Input
                                                        name="misellaneous_description"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setData(
                                                                "misellaneous_description",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {data.fee_type && (
                                            <div>
                                                <Label>Amount</Label>
                                                <Input
                                                    name="amount"
                                                    type="number"
                                                    min={0}
                                                    onChange={(e) =>
                                                        setData(
                                                            "amount",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                        {/* Discount */}
                                        {data.discount === "yes" ? (
                                            <>
                                                <div>
                                                    <Label htmlFor="discount_name">
                                                        Discount Name
                                                    </Label>
                                                    <Input
                                                        name="discount_name"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setData(
                                                                "discount_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Label>
                                                        Discount Amount
                                                    </Label>
                                                    <Input
                                                        name="discount_amount"
                                                        type="number"
                                                        min={0}
                                                        value={
                                                            data.discount_amount
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "discount_amount",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="hidden">
                                                {(data.discount_amount = 0)}
                                            </div>
                                        )}
                                    </div>
                                    <ScrollArea className="h-[300px] p-4">
                                        {itemId === null && (
                                            <Table>
                                                <TableCaption>
                                                    A list of fees added.
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
                                                    {fees.map((fee) => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.fee_type
                                                                    }
                                                                </TableCell>

                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.program_name
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.no_unit
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {fee.amount}
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.misellaneous_name
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.misellaneous_description
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.discount_name
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.discount_amount
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        fee.total_amount
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </ScrollArea>

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
                                                onClick={handleFeeList}
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
