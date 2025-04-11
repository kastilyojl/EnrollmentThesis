import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BadgeSuccess from "@/components/BadgeSuccess";

export default function PaymentPlan() {
    const {
        student,
        otherBilling = [],
        collegeBilling = [],
        shsBilling = [],
    } = usePage().props;

    const paymentDetails = Array.isArray(student.payment_details)
        ? student.payment_details
        : [student.payment_details];

    // Matching functions for each type
    const getOtherBillingInfo = (fee_id) => {
        return otherBilling.find((item) => item.id === fee_id);
    };

    const getCollegeBillingInfo = (fee_id) => {
        return collegeBilling.find((item) => item.id === fee_id);
    };

    const getShsBillingInfo = (fee_id) => {
        return shsBilling.find((item) => item.id === fee_id);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment Plan</h1>
            </div>

            <div className="space-y-4">
                <Table>
                    <TableCaption>
                        A list of your payment transactions.
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="table-fixed">
                            <TableHead className="w-1/12">Purpose</TableHead>
                            <TableHead className="w-1/12">Program</TableHead>
                            <TableHead className="w-1/12">Title</TableHead>
                            <TableHead className="w-1/12">Amount</TableHead>
                            <TableHead className="w-1/12">Balance</TableHead>
                            <TableHead className="w-1/12">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paymentDetails.map((payment, index) => {
                            const feeType = payment.fee_type;
                            const feeId = payment.fee_id;

                            const otherInfo =
                                feeType === "other_billing"
                                    ? getOtherBillingInfo(feeId)
                                    : null;
                            const collegeInfo =
                                feeType === "college_billing"
                                    ? getCollegeBillingInfo(feeId)
                                    : null;
                            const shsInfo =
                                feeType === "shs_billing"
                                    ? getShsBillingInfo(feeId)
                                    : null;

                            const programName =
                                collegeInfo?.program_code ||
                                shsInfo?.program_code ||
                                "—";

                            const title =
                                otherInfo?.name ||
                                collegeInfo?.payment_type ||
                                shsInfo?.payment_type ||
                                "—";

                            return (
                                <React.Fragment key={index}>
                                    <TableRow className="table-fixed">
                                        <TableCell className="w-1/12 capitalize">
                                            {feeType.replace("_", " ")}
                                        </TableCell>
                                        <TableCell className="w-1/12">
                                            {programName}
                                        </TableCell>
                                        <TableCell className="w-1/12">
                                            {title}
                                        </TableCell>
                                        <TableCell className="w-1/12">
                                            ₱{" "}
                                            {payment.amount?.toLocaleString() ||
                                                "—"}
                                        </TableCell>
                                        <TableCell className="w-1/12"></TableCell>
                                    </TableRow>

                                    {/* Extra breakdown row based on fee type */}
                                    {feeType === "other_billing" &&
                                        otherInfo && (
                                            <TableRow className="bg-gray-50">
                                                <TableCell
                                                    colSpan={6}
                                                    className="px-6 py-4 text-sm text-gray-700"
                                                >
                                                    <div>
                                                        <strong>Title:</strong>{" "}
                                                        {otherInfo.name}
                                                    </div>
                                                    <div>
                                                        <strong>Type:</strong>{" "}
                                                        {otherInfo.payment_type}
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            Description:
                                                        </strong>{" "}
                                                        {otherInfo.description}
                                                    </div>
                                                    <div>
                                                        <strong>Amount:</strong>{" "}
                                                        ₱{" "}
                                                        {otherInfo.amount?.toLocaleString()}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    {feeType === "college_billing" &&
                                        collegeInfo && (
                                            <TableRow className="bg-gray-50">
                                                <TableCell
                                                    colSpan={6}
                                                    className="px-6 py-4 text-sm text-gray-700"
                                                >
                                                    <div>
                                                        <strong>
                                                            Down Payment:
                                                        </strong>{" "}
                                                        ₱{" "}
                                                        {
                                                            collegeInfo.down_payment
                                                        }
                                                    </div>
                                                    <div>
                                                        <strong>Prelim:</strong>{" "}
                                                        ₱ {collegeInfo.prelim}
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            Midterm:
                                                        </strong>{" "}
                                                        ₱ {collegeInfo.midterm}
                                                    </div>
                                                    <div>
                                                        <strong>Finals:</strong>{" "}
                                                        ₱ {collegeInfo.finals}
                                                    </div>
                                                    <div>
                                                        <strong>Total:</strong>{" "}
                                                        ₱{" "}
                                                        {
                                                            collegeInfo.total_amount
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    {feeType === "shs_billing" && shsInfo && (
                                        <TableRow className="bg-gray-50">
                                            <TableCell
                                                colSpan={6}
                                                className="px-6 py-4 text-sm text-gray-700"
                                            >
                                                <div>
                                                    <strong>Year Level:</strong>{" "}
                                                    {shsInfo.year_level}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Payment Type:
                                                    </strong>{" "}
                                                    {shsInfo.payment_type}
                                                </div>
                                                <div>
                                                    <strong>
                                                        Down Payment:
                                                    </strong>{" "}
                                                    ₱ {shsInfo.down_payment}
                                                </div>
                                                <div>
                                                    <strong>Prelim:</strong> ₱{" "}
                                                    {shsInfo.prelim}
                                                </div>
                                                <div>
                                                    <strong>Midterm:</strong> ₱{" "}
                                                    {shsInfo.midterm}
                                                </div>
                                                <div>
                                                    <strong>Finals:</strong> ₱{" "}
                                                    {shsInfo.finals}
                                                </div>
                                                <div>
                                                    <strong>Total:</strong> ₱{" "}
                                                    {shsInfo.total_amount}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
