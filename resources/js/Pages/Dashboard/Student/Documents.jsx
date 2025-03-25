import BadgeSuccess from "@/components/BadgeSuccess";
import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Documents() {
    const { student } = usePage().props;
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Documents</h1>
            </div>
            <div className="space-y-4">
                <p className="flex items-center gap-2">
                    Status:
                    <BadgeSuccess>{student.documents.status}</BadgeSuccess>
                </p>
                <div className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                        Basic Enrollment Requirements Submitted
                    </h3>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Form 138A / Report Card (original copy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.form_138A ? " ✔️" : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Form 137 (original copy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.form_137 ? " ✔️" : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Certificate of Good Moral (original copy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.good_moral
                                        ? " ✔️"
                                        : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    PSA Birth Certificate (photocopy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.psa ? " ✔️" : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    1 pc. Passport Size Picture (white
                                    background)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.pic_2x2 ? " ✔️" : "❌"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                        Additional Requirements for Transferees Submitted
                    </h3>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Honorable Dismissal / Certificate of
                                    Transfer Credentials (original copy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.ctc_transferee
                                        ? " ✔️"
                                        : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Copy of Grades (original copy)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.grade_transferee
                                        ? " ✔️"
                                        : "❌"}
                                </dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    F137 (original copy addressed t Westbridge)
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {student.documents.f137_transferee
                                        ? " ✔️"
                                        : "❌"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
