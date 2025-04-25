import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Evaluation() {
    const { student, grades, averageGrade, department } = usePage().props;

    const documentsStatus = student.documents?.status || "pending";
    const gradesStatus = grades?.length ? "available" : "unavailable";
    const paymentStatus = student.payment_verification?.status || "pending";

    const getGradeRemark = () => {
        if (averageGrade === null) return "N/A";

        if (department === "College") {
            return averageGrade <= 3 ? "Passed (College)" : "Failed (College)";
        }

        if (department === "SHS" || department === "Senior High School") {
            return averageGrade >= 75 ? "Passed (SHS)" : "Failed (SHS)";
        }

        return "Unknown Department";
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Evaluation</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-3">Statuses</h2>
                    <ul className="space-y-2">
                        <li>
                            <strong>Documents:</strong> {documentsStatus}
                        </li>
                        <li>
                            <strong>Grades:</strong> {gradesStatus}
                        </li>
                        <li>
                            <strong>Payment:</strong> {paymentStatus}
                        </li>
                        <li>
                            <strong>Average Grade:</strong>{" "}
                            {averageGrade ?? "N/A"}{" "}
                            {averageGrade !== null && (
                                <span className="ml-2 text-sm text-gray-500">
                                    ({getGradeRemark()})
                                </span>
                            )}
                        </li>
                        <li className="hidden">
                            <strong>Department:</strong> {department}
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
