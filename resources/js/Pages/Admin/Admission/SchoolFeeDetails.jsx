import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SchoolFeeDetails({ college_fee }) {
    return (
        <div>
            <div className="overflow-x-auto ">
                {/* <div className="text-white bg-primary px-4 font-bold py-1">
                    {data.program}
                </div> */}

                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <tbody className="divide-y divide-gray-200 grid grid-cols-2 gap-4">
                        {college_fee
                            // .filter((fee) => fee.program_code === data.program)
                            .map((fee) => (
                                <div>
                                    <tr>
                                        <th className="whitespace-nowrap  w-1/12 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            <Checkbox />
                                        </th>
                                        <th className="whitespace-nowrap bg-primary w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Program
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.program_code}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Down Payment
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.down_payment}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Prelim
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.prelim}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Midterm
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.midterm}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Finals
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.finals}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Discount Name
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.discount_title}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Discount Amount
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.discount_amount}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            Total Amount
                                        </th>
                                        <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                            {fee.total_amount}
                                        </th>
                                    </tr>
                                </div>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
