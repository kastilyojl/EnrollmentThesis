import React from "react";

export default function College({ program = [] }) {
    return (
        <div className="space-y-4">
            {/* First Year */}
            <div className="overflow-x-auto ">
                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                    {program.name} <span>1st Year</span>
                </div>
                {/* 1st Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={3}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                1st Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border  border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "1st Year" &&
                                    subject.period === "1st Semester"
                            )
                            .map((subject) => (
                                <tr>
                                    <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap text-end  border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* 2nd Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                2nd Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "1st Year" &&
                                    subject.period === "2nd Semester"
                            )
                            .map((subject) => (
                                <tr>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* Summer */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                Summer
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "1st Year" &&
                                    subject.period === "Summer"
                            )
                            .map((subject) => (
                                <tr>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* 2nd Year */}
            <div className="overflow-x-auto ">
                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                    {program.name} <span>2nd Year</span>
                </div>
                {/* 1st Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={3}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                1st Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border  border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {/* 1st Semester */}
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "2nd Year" &&
                                    subject.period === "1st Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap w-1/6 text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap w-1/2 text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap text-end  border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* 2nd Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                2nd Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] ">
                            <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "2nd Year" &&
                                    subject.period === "2nd Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* Summer */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                Summer
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "2nd Year" &&
                                    subject.period === "Summer"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* 3rd Year */}
            <div className="overflow-x-auto ">
                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                    {program.name} <span>3rd Year</span>
                </div>
                {/* 1st Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={3}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                1st Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border  border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {/* 1st Semester */}
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "3rd Year" &&
                                    subject.period === "1st Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap text-end  border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* 2nd Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                2nd Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] ">
                            <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "3rd Year" &&
                                    subject.period === "2nd Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* Summer */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                Summer
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "3rd Year" &&
                                    subject.period === "Summer"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* 4th Year */}
            <div className="overflow-x-auto ">
                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                    {program.name} <span>4th Year</span>
                </div>
                {/* 1st Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={3}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                1st Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE]">
                            <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {/* 1st Semester */}
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "4th Year" &&
                                    subject.period === "1st Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap text-wrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap text-end  border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* 2nd Semester */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE]">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                2nd Semester
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] ">
                            <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "4th Year" &&
                                    subject.period === "2nd Semester"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/2 border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/12 border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
                {/* Summer */}
                <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th
                                colSpan={4}
                                className="text-center border border-primary whitespace-nowrap px-4  font-bold text-gray-900"
                            >
                                Summer
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th className="whitespace-nowrap w-1/6 border border-primary px-4  font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-primary px-4  font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-primary px-4  font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {program.subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === "4th Year" &&
                                    subject.period === "Summer"
                            )
                            .map((subject) => (
                                <tr className="table-fixed">
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-primary px-4  font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
