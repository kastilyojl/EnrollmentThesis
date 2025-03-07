import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function BillingSetup({ program = [], subject = [], fee = [] }) {
    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        // SHS
        program_code: "",
        year_level: "",
        payment_type: "",
        cash: "",
        installment: "",
        // description_shs: "",
        voucher_amount: "",
        onetime_fee: "",
        down_payment_shs: "",
        // College
        discount_title: "",
        discount_amount: "",
        down_payment: "",
        prelim: "",
        midterm: "",
        finals: "",
        no_unit: "",
        per_unit: "",
        total_amount: "",
        // Other
        title: "",
        amount: "",
        description: "",

        // fee_type: "",
        // program_name: "",
        // no_unit: "",
        // amount: "",
        // misellaneous_name: "",
        // misellaneous_description: "",
        // discount_name: "",
        // discount_amount: "",
        // total_amount: "",
    });

    const tableData = fee.map((fee) => ({
        program_code: fee.program_code,
        year_level: fee.year_level,
        payment_type: fee.payment_type,
        cash: fee.cash,
        installment: fee.installment,
        description_shs: fee.description_shs,
        voucher_amount: fee.voucher_amount,
        onetime_fee: fee.onetime_fee,
        down_payment_shs: fee.down_payment_shs,
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
            // SHS
            program_code: "",
            year_level: "",
            payment_type: "",
            cash: "",
            installment: "",
            description_shs: "",
            voucher_amount: "",
            onetime_fee: "",
            down_payment_shs: "",
            // College
            discount_title: "",
            discount_amount: "",
            down_payment: "",
            prelim: "",
            midterm: "",
            finals: "",
            no_unit: "",
            per_unit: "",
            total_amount: "",
            // Other
            title: "",
            amount: "",
            description: "",
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
        console.log("Data Being Saved", fees);
        post(
            route("admin.billing.store"),
            // { fees: fees },
            {
                onSuccess: () => {
                    console.log("Success Trigger");
                    toast("Bill has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    });
                    setAdd(false);
                    setData({
                        // SHS
                        program_code: "",
                        year_level: "",
                        payment_type: "",
                        cash: "",
                        installment: "",
                        description_shs: "",
                        voucher_amount: "",
                        onetime_fee: "",
                        down_payment_shs: "",
                        // College
                        discount_title: "",
                        discount_amount: "",
                        down_payment: "",
                        prelim: "",
                        midterm: "",
                        finals: "",
                        no_unit: "",
                        per_unit: "",
                        total_amount: "",
                        // Other
                        title: "",
                        amount: "",
                        description: "",
                    });
                },
            }
        );
    };

    const handleUpdateSubmit = () => {
        // console.log("editing program:", itemId.id);
        post(route("admin.subject.update", { id: itemId }), {
            onSuccess: () => {
                toast("Bill has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    // SHS
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    cash: "",
                    installment: "",
                    description_shs: "",
                    voucher_amount: "",
                    onetime_fee: "",
                    down_payment_shs: "",
                    // College
                    discount_title: "",
                    discount_fee: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    no_unit: "",
                    per_unit: "",
                    total_amount: "",
                    // Other
                    title: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const [fees, setFees] = useState([]);

    const handleFeeList = (e) => {
        e.preventDefault();

        const newFee = {
            program_code: data.program_code,
            year_level: data.year_level,
            payment_type: data.payment_type,
            cash: data.cash,
            installment: data.installment,
            description_shs: data.description_shs,
            voucher_amount: data.voucher_amount,
            onetime_fee: data.onetime_fee,
            down_payment_shs: data.down_payment_shs,

            discount_title: data.discount_title,
            discount_amount: data.discount_amount,
            down_payment: data.down_payment,
            prelim: data.prelim,
            midterm: data.midterm,
            finals: data.finals,
            no_unit: data.no_unit,
            per_unit: data.per_unit,
            total_amount: data.total_amount,
        };
        console.log("data here", data);

        setFees([...fees, newFee]);

        setData("fees", [...fees, newFee]);
    };

    const payment = {
        SHS: [
            <>
                Cash <br /> (Discounted)
            </>,
            <>
                Down Payment <br /> (Installment){" "}
            </>,
            <>Voucher Amount</>,
            <>One-Time Fee</>,
            <>Voucher Amount</>,
            <>Down Payment</>,
        ],
        College: {
            program: [
                <>
                    Discount <br /> Title
                </>,
                <>
                    Discounted <br /> Fee
                </>,
                <>
                    Down <br /> Payment
                </>,
                <>Prelim</>,
                <>Midterm</>,
                <>Finals</>,
                <>Total</>,
            ],
            unit: [<>Program</>, <>No. of Units</>, <>Per Units</>, <>Total</>],
        },
        Others: [<>Title</>, <>Amount</>, <>Description</>],
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
                <>Here</>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent
                            className={`${
                                itemId === null ? "max-w-7xl" : "max-w-xl"
                            }`}
                        >
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null ? "Add Fees" : "Edit Fees"}
                                </DialogTitle>
                                <div className="pt-2">
                                    <Separator />
                                </div>
                                <div>
                                    <Tabs defaultValue="shs">
                                        <TabsList>
                                            <TabsTrigger value="shs">
                                                Senior High School
                                            </TabsTrigger>
                                            <TabsTrigger value="college">
                                                College
                                            </TabsTrigger>
                                            <TabsTrigger value="others">
                                                Others
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="shs">
                                            <div className="overflow-x-auto">
                                                <div className="overflow-x-auto grid grid-cols-2">
                                                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                        <thead className="ltr:text-left rtl:text-right">
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Strand
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="program_code"
                                                                        value={
                                                                            data.program_code
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "program_code",
                                                                                value
                                                                            )
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
                                                                </td>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Year Level
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="year_level"
                                                                        value={
                                                                            data.year_level
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "year_level",
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="grade 11">
                                                                                Grade
                                                                                11
                                                                            </SelectItem>
                                                                            <SelectItem value="grade 12">
                                                                                Grade
                                                                                12
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Type
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="payment_type"
                                                                        value={
                                                                            data.payment_type
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "payment_type",
                                                                                value
                                                                            )
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
                                                                                Voucher
                                                                                Grantee
                                                                            </SelectItem>
                                                                            <SelectItem value="esc & non-esc grantee">
                                                                                ESC
                                                                                &
                                                                                Non-ESC
                                                                                grantee
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Cash
                                                                    (Discounted)
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="cash"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.cash
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "cash",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Installment
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="installment"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.installment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "installment",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Down payment
                                                                    (Installment)
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="down_payment_shs"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.down_payment_shs
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "down_payment_shs",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Voucher
                                                                    Amount
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="voucher_amount"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.voucher_amount
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "voucher_amount",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    One-time Fee
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="onetime_fee"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.onetime_fee
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "onetime_fee",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <ScrollArea className="h-auto max-h-[400px] p-4">
                                                        <div className="h-full">
                                                            {itemId ===
                                                                null && (
                                                                <Table>
                                                                    <TableCaption>
                                                                        A list
                                                                        of fees
                                                                        added.
                                                                    </TableCaption>

                                                                    <TableBody>
                                                                        {fees.map(
                                                                            (
                                                                                fee
                                                                            ) => {
                                                                                return (
                                                                                    <TableRow className="odd:bg-gray-50 border-b-2 grid grid-cols-6">
                                                                                        <TableCell className="font-medium ">
                                                                                            Strand
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.program_code
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Year
                                                                                            Level
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.year_level
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Type
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.payment_type
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Cash
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.cash
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Installment
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.installment
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Downpayment
                                                                                            (installment)
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.down_payment_shs
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium ">
                                                                                            Voucher
                                                                                            Amount
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.voucher_amount
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium">
                                                                                            One-time
                                                                                            Fee
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-gray-700">
                                                                                            {
                                                                                                fee.onetime_fee
                                                                                            }
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            )}
                                                        </div>
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="college">
                                            <Tabs defaultValue="program">
                                                <TabsList>
                                                    <TabsTrigger value="program">
                                                        Per Program
                                                    </TabsTrigger>
                                                    <TabsTrigger value="unit">
                                                        Per Unit
                                                    </TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="program">
                                                    <div className="overflow-x-auto">
                                                        <div className="overflow-x-auto grid grid-cols-2">
                                                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                                <thead className="ltr:text-left rtl:text-right">
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Program
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Select
                                                                                className="h-auto"
                                                                                name="program_code"
                                                                                value={
                                                                                    data.program_code
                                                                                }
                                                                                onValueChange={(
                                                                                    value
                                                                                ) =>
                                                                                    setData(
                                                                                        "program_code",
                                                                                        value
                                                                                    )
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
                                                                        </td>
                                                                    </tr>
                                                                </thead>

                                                                <tbody className="divide-y divide-gray-200">
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Discount
                                                                            Name
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="discount_title"
                                                                                type="text"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.discount_title
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "discount_title",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Discount
                                                                            Amount
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="discount_amount"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.discount_amount
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "discount_amount",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Down
                                                                            Payment
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="down_payment"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.down_payment
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "down_payment",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Prelim
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="prelim"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.prelim
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "prelim",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Midterm
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="midterm"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.midterm
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "midterm",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Finals
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="finals"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.finals
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "finals",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Total
                                                                            Ammount
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="total_amount"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.total_amount
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "total_amount",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <ScrollArea className="h-auto max-h-[400px] p-4">
                                                                <div className="h-full">
                                                                    {itemId ===
                                                                        null && (
                                                                        <Table>
                                                                            <TableCaption>
                                                                                A
                                                                                list
                                                                                of
                                                                                fees
                                                                                added.
                                                                            </TableCaption>

                                                                            <TableBody>
                                                                                {fees.map(
                                                                                    (
                                                                                        fee
                                                                                    ) => {
                                                                                        return (
                                                                                            <TableRow className="odd:bg-gray-50 border-b-2 grid grid-cols-6">
                                                                                                <TableCell className="font-medium ">
                                                                                                    Program
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.program_code
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Discount
                                                                                                    Name
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.discount_title
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Discount
                                                                                                    Amount
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.discount_amount
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Down
                                                                                                    Payment
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.down_payment
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Prelim
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.prelim
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Midterm
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.midterm
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium ">
                                                                                                    Finals
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.finals
                                                                                                    }
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium">
                                                                                                    Total
                                                                                                    Amount
                                                                                                </TableCell>
                                                                                                <TableCell className="font-medium text-gray-700">
                                                                                                    {
                                                                                                        fee.total_amount
                                                                                                    }
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </TableBody>
                                                                        </Table>
                                                                    )}
                                                                </div>
                                                            </ScrollArea>
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                                <TabsContent value="unit">
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                            <thead className="ltr:text-left rtl:text-right">
                                                                <tr>
                                                                    {payment.College.unit.map(
                                                                        (
                                                                            col,
                                                                            index
                                                                        ) => (
                                                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                                {
                                                                                    col
                                                                                }
                                                                            </th>
                                                                        )
                                                                    )}
                                                                </tr>
                                                            </thead>

                                                            <tbody className="divide-y divide-gray-200">
                                                                <tr>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Select name="type">
                                                                            <SelectTrigger>
                                                                                Select
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="BSCS">
                                                                                    Computer
                                                                                    Science
                                                                                </SelectItem>
                                                                                <SelectItem value="BSTM">
                                                                                    Tourism
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        <Input />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <ScrollArea className="h-auto max-h-[300px] p-4">
                                                        {itemId === null && (
                                                            <Table>
                                                                <TableCaption>
                                                                    A list of
                                                                    fees added.
                                                                </TableCaption>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        {" "}
                                                                        <TableHead>
                                                                            Program
                                                                        </TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {fees.map(
                                                                        (
                                                                            fee
                                                                        ) => {
                                                                            return (
                                                                                <TableRow>
                                                                                    <TableCell className="font-medium odd:bg-gray-50">
                                                                                        {
                                                                                            fee
                                                                                        }
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        }
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                        )}
                                                    </ScrollArea>
                                                </TabsContent>
                                            </Tabs>
                                        </TabsContent>
                                        <TabsContent value="others">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                    <thead className="ltr:text-left rtl:text-right">
                                                        <tr>
                                                            {payment.Others.map(
                                                                (
                                                                    col,
                                                                    index
                                                                ) => (
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        {col}
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                <Input />
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                <Input />
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                <Input />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <ScrollArea className="h-auto max-h-[300px] p-4">
                                                {itemId === null && (
                                                    <Table>
                                                        <TableCaption>
                                                            A list of fees
                                                            added.
                                                        </TableCaption>
                                                        <TableHeader>
                                                            <TableRow>
                                                                {" "}
                                                                <TableHead>
                                                                    Program
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {fees.map((fee) => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell className="font-medium odd:bg-gray-50">
                                                                            {
                                                                                fee
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                )}
                                            </ScrollArea>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <DialogDescription
                                    className={`grid gap-4 ${
                                        itemId === null ? "lg:grid-cols" : ""
                                    }`}
                                >
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

// <div className="mt-3 grid grid-cols-4 gap-x-8 gap-y-4">
//                                         <div>
//                                             <Label htmlFor="fee_type">
//                                                 Type
//                                             </Label>
//                                             <RadioGroup
//                                                 name="fee_type"
//                                                 value={data.fee_type}
//                                                 onValueChange={(value) =>
//                                                     setData("fee_type", value)
//                                                 }
//                                             >
//                                                 <div className="flex items-center space-x-2">
//                                                     <RadioGroupItem
//                                                         value="tuition fee"
//                                                         id="tuition"
//                                                     />
//                                                     <Label htmlFor="tuition">
//                                                         Tuition fee
//                                                     </Label>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <RadioGroupItem
//                                                         value="miscellaneous & others"
//                                                         id="miscellaneous"
//                                                     />
//                                                     <Label htmlFor="miscellaneous">
//                                                         Miscellaneous & Others
//                                                     </Label>
//                                                 </div>
//                                             </RadioGroup>
//                                         </div>
//                                         {data.fee_type === "tuition fee" && (
//                                             <div>
//                                                 <Label htmlFor="tuition fee">
//                                                     Tuition Fee
//                                                 </Label>
//                                                 <RadioGroup
//                                                     defaultValue="per unit"
//                                                     name="tuition_fee"
//                                                     value={data.tuition_fee}
//                                                     onValueChange={(value) =>
//                                                         setData(
//                                                             "tuition_fee",
//                                                             value
//                                                         )
//                                                     }
//                                                 >
//                                                     <div className="flex items-center space-x-2">
//                                                         <RadioGroupItem
//                                                             value="per unit"
//                                                             id="perunit"
//                                                         />
//                                                         <Label htmlFor="perunit">
//                                                             Per Unit
//                                                         </Label>
//                                                     </div>
//                                                     <div className="flex items-center space-x-2">
//                                                         <RadioGroupItem
//                                                             value="per course"
//                                                             id="percourse"
//                                                         />
//                                                         <Label htmlFor="percourse">
//                                                             Per Course
//                                                         </Label>
//                                                     </div>
//                                                 </RadioGroup>
//                                             </div>
//                                         )}
//                                         <div>
//                                             <Label htmlFor="discount">
//                                                 Discount
//                                             </Label>
//                                             <RadioGroup
//                                                 defaultValue="no"
//                                                 name="discount"
//                                                 value={data.discount}
//                                                 onValueChange={(value) =>
//                                                     setData("discount", value)
//                                                 }
//                                             >
//                                                 <div className="flex items-center space-x-2">
//                                                     <RadioGroupItem
//                                                         value="yes"
//                                                         id="yes"
//                                                     />
//                                                     <Label htmlFor="yes">
//                                                         Yes
//                                                     </Label>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <RadioGroupItem
//                                                         value="no"
//                                                         id="no"
//                                                     />
//                                                     <Label htmlFor="no">
//                                                         No
//                                                     </Label>
//                                                 </div>
//                                             </RadioGroup>
//                                         </div>
//                                         <div>
//                                             <Label>Total Amount</Label>
//                                             <Input
//                                                 name="total_amount"
//                                                 type="number"
//                                                 min={0}
//                                                 value={
//                                                     (data.total_amount =
//                                                         Number(data.amount) -
//                                                         Number(
//                                                             data.discount_amount
//                                                         ))
//                                                 }
//                                                 onChange={(e) =>
//                                                     setData(
//                                                         "total_amount",
//                                                         e.target.value
//                                                     )
//                                                 }
//                                             />
//                                         </div>
//                                         {/* Tuition Fee */}
//                                         {data.fee_type === "tuition fee" &&
//                                             (data.tuition_fee === "per unit" ? (
//                                                 <div>
//                                                     <Label># of Unit</Label>
//                                                     <Input
//                                                         name="no_unit"
//                                                         type="number"
//                                                         min={0}
//                                                         value={data.no_unit}
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "no_unit",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                             ) : (
//                                                 <div>
//                                                     <Label>Program</Label>
//                                                     <Input
//                                                         name="program_name"
//                                                         type="text"
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "program_name",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                             ))}
//                                         {/* Miscellaneous Fee */}
//                                         {data.fee_type ===
//                                             "miscellaneous & others" && (
//                                             <>
//                                                 <div>
//                                                     <Label htmlFor="misellaneous_name">
//                                                         Name
//                                                     </Label>
//                                                     <Input
//                                                         name="misellaneous_name"
//                                                         type="text"
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "misellaneous_name",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <Label htmlFor="misellaneous_description">
//                                                         Description
//                                                     </Label>
//                                                     <Input
//                                                         name="misellaneous_description"
//                                                         type="text"
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "misellaneous_description",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                             </>
//                                         )}

//                                         {data.fee_type && (
//                                             <div>
//                                                 <Label>Amount</Label>
//                                                 <Input
//                                                     name="amount"
//                                                     type="number"
//                                                     min={0}
//                                                     onChange={(e) =>
//                                                         setData(
//                                                             "amount",
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                 />
//                                             </div>
//                                         )}
//                                         {/* Discount */}
//                                         {data.discount === "yes" ? (
//                                             <>
//                                                 <div>
//                                                     <Label htmlFor="discount_name">
//                                                         Discount Name
//                                                     </Label>
//                                                     <Input
//                                                         name="discount_name"
//                                                         type="text"
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "discount_name",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <Label>
//                                                         Discount Amount
//                                                     </Label>
//                                                     <Input
//                                                         name="discount_amount"
//                                                         type="number"
//                                                         min={0}
//                                                         value={
//                                                             data.discount_amount
//                                                         }
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 "discount_amount",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     />
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <div className="hidden">
//                                                 {(data.discount_amount = 0)}
//                                             </div>
//                                         )}
//                                     </div>
