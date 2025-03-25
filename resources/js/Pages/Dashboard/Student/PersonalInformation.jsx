import Layout from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePage } from "@inertiajs/react";
import { User } from "lucide-react";
import React from "react";

export default function PersonalInformation() {
    const { student } = usePage().props;
    const { user } = usePage().props;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">User Profile</h1>
            </div>
            <div className="space-y-4">
                <div class="flex items-center bg-gray-50 space-x-4 border p-4 rounded-lg shadow-sm">
                    <User className="h-16 w-16 text-gray-200 bg-customBlue rounded-lg" />
                    <div>
                        <h2 class="flex items-center text-lg font-medium leading-none text-black">
                            {student.personal_info.first_name}{" "}
                            {student.personal_info.middle_name}{" "}
                            {student.personal_info.last_name}
                        </h2>
                        <span class="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                            {user.email}
                        </span>
                    </div>
                </div>
                <Tabs defaultValue="student_info" className="w-full">
                    <TabsList>
                        <TabsTrigger value="student_info">
                            Student Information
                        </TabsTrigger>
                        <TabsTrigger value="personal_info">
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger value="guardian">Guardian</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student_info">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Student Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Student ID
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.student_id}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Department
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.department}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Academic Year
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.school_year}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Semester
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.semester}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Branch
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.branch}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Year Level
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.year_level}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Program
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.program}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Classified As
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.classified_as}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Last School Attended
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.last_school_attended}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Last School Address
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.last_school_addres}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="personal_info">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Personal Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Name
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.first_name}{" "}
                                            {student.personal_info.middle_name}{" "}
                                            {student.personal_info.last_name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Address
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.address}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Date of Birth
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.birth_date}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Place of Birth
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.birth_place}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Civil Status
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.civil_status}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Gender
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.gender}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Religion
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.personal_info.religion}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="guardian">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Guardian's Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Father's Name
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.father_name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Father's Occupation
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.father_occupation}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Father's Phone #
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.father_phone}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Mother's Name
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.mother_name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Mother's Occupation
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.mother_occupation}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Mother's Phone #
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.mother_phone}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Guardian's Name
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.guardian_name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Relationship to Guardian
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {
                                                student.guardian
                                                    .guardian_relationship
                                            }
                                        </dd>
                                    </div>
                                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">
                                            Guardian's Phone #
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {student.guardian.guardian_phone}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
