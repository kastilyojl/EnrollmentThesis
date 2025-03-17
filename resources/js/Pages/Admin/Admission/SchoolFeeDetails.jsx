import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function SchoolFeeDetails({ student, college_fee, other_fee }) {
    const [selectedCollegeFees, setSelectedCollegeFees] = useState([]);
    const [selectedOtherFees, setSelectedOtherFees] = useState([]);
    const { data, setData, post } = useForm({
        student_info_id: "1",
        fee_type: "",
        fee_id: "",
        amount: "",
    });

    const handleSubmit = () => {
        const paymentDetails = [];

        // Add selected college fees
        selectedCollegeFees.forEach((fee) => {
            paymentDetails.push({
                student_info_id: data.student_info_id,
                fee_type: "college_billing",
                fee_id: fee.id,
                amount: fee.total_amount,
            });
        });

        // Add selected other fees
        selectedOtherFees.forEach((fee) => {
            paymentDetails.push({
                student_info_id: data.student_info_id,
                fee_type: "other_billing",
                fee_id: fee.id,
                amount: fee.amount,
            });
        });

        console.log("Payment Detail", paymentDetails);

        // Submit the payment details to the backend
        post(route("admin.payment.storeDetails"), { paymentDetails });
    };

    const handleCollegeFeeToggle = (fee) => {
        setSelectedCollegeFees((prevSelected) => {
            if (prevSelected.some((selectedFee) => selectedFee.id === fee.id)) {
                return prevSelected.filter(
                    (selectedFee) => selectedFee.id !== fee.id
                );
            } else {
                return [...prevSelected, fee];
            }
        });
    };

    const handleOtherFeeToggle = (fee) => {
        setSelectedOtherFees((prevSelected) => {
            if (prevSelected.some((selectedFee) => selectedFee.id === fee.id)) {
                return prevSelected.filter(
                    (selectedFee) => selectedFee.id !== fee.id
                );
            } else {
                return [...prevSelected, fee];
            }
        });
    };

    // Calculate total amount considering discounts
    const calculateTotalAmount = () => {
        const totalCollegeFees = selectedCollegeFees.reduce(
            (acc, fee) => acc + parseFloat(fee.total_amount || 0),
            0
        );

        const totalOtherFees = selectedOtherFees.reduce((acc, fee) => {
            if (fee.payment_type === "discount") {
                // Subtract discount
                return acc - parseFloat(fee.amount || 0);
            } else {
                // Add non-discount fee
                return acc + parseFloat(fee.amount || 0);
            }
        }, 0);

        return (totalCollegeFees + totalOtherFees).toFixed(2);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="overflow-x-auto space-y-4">
                <table className="min-w-full divide-y-2 divide-customBlue bg-white text-sm">
                    <thead>
                        <tr className="bg-customBlue">
                            <th
                                colSpan={4}
                                className="text-center border border-customBlue whitespace-nowrap px-4 font-bold text-gray-900"
                            >
                                Standard Fees
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900"></th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Type
                            </th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Down payment
                            </th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {college_fee.map((fee) => (
                            <tr key={fee.id}>
                                <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    <Checkbox
                                        checked={selectedCollegeFees.some(
                                            (selectedFee) =>
                                                selectedFee.id === fee.id
                                        )}
                                        onCheckedChange={() =>
                                            handleCollegeFeeToggle(fee)
                                        }
                                    />
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.payment_type}
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.down_payment}
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.total_amount}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className="min-w-full divide-y-2 divide-customBlue bg-white text-sm">
                    <thead>
                        <tr className="bg-customBlue">
                            <th
                                colSpan={4}
                                className="text-center border border-customBlue whitespace-nowrap px-4 font-bold text-gray-900"
                            >
                                Other Fees
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900"></th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Type
                            </th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Name
                            </th>
                            <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {other_fee.map((fee) => (
                            <tr key={fee.id}>
                                <th className="whitespace-nowrap  w-1/12 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    <Checkbox
                                        checked={selectedOtherFees.some(
                                            (selectedFee) =>
                                                selectedFee.id === fee.id
                                        )}
                                        onCheckedChange={() =>
                                            handleOtherFeeToggle(fee)
                                        }
                                    />
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.payment_type}
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.name}
                                </th>
                                <th className="whitespace-nowrap w-1/2 text-wrap border border-customBlue px-4  font-medium text-gray-900">
                                    {fee.amount}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <Card className="w-full bg-gray-50 justify-center items-center space-y-4">
                    <CardHeader>
                        <CardTitle className="text-gray-900">
                            Payment Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-end space-y-4">
                        {selectedCollegeFees.length > 0 && (
                            <div>
                                <h3 className="text-start">
                                    Selected Standard Fees
                                </h3>
                                <ul>
                                    {selectedCollegeFees.map((fee) => (
                                        <li key={fee.id}>
                                            {fee.payment_type}:{" "}
                                            {fee.total_amount}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedOtherFees.length > 0 && (
                            <div>
                                <h3 className="text-start">
                                    Selected Other Fees
                                </h3>
                                <ul>
                                    {selectedOtherFees.map((fee) => (
                                        <li key={fee.id}>
                                            {fee.payment_type}: {fee.amount}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                    <Separator />
                    <CardFooter className="text-sm text-gray-500 flex justify-between">
                        Total Amount:
                        <span>{calculateTotalAmount()}</span>
                    </CardFooter>
                </Card>
            </div>
            <Button onClick={handleSubmit}>Save</Button>
        </div>
    );
}
