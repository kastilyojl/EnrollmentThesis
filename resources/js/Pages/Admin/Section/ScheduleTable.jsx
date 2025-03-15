// ScheduleTable.jsx
import { Edit } from "lucide-react";
import React from "react";

export default function ScheduleTable({
    program,
    section,
    setItemId,
    setSectionItem,
    setSched,
}) {
    const handleSetSched = (subject, section) => {
        const subjectSchedule = section.schedule.find(
            (sched) => sched.subject_code === subject.code
        );

        setItemId(subject);
        setSectionItem({
            ...section,
            schedule: subjectSchedule,
        });
        setSched(true);
    };

    return (
        <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
                <tr className="bg-[#EEEEEE]">
                    <th
                        colSpan={8}
                        className="text-center border border-primary whitespace-nowrap px-4 font-bold text-gray-900"
                    >
                        {section.semester}
                    </th>
                </tr>
                <tr className="bg-[#EEEEEE]">
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Subject
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Mon
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Tue
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Wed
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Thu
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Fri
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Sat
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900"></th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {program.map((programItem) => {
                    return programItem.subjects
                        .filter(
                            (subject) =>
                                subject.year_level === section.year_level &&
                                subject.period === section.semester
                        )
                        .map((subject) => {
                            const subjectSchedule = section.schedule.find(
                                (sched) => sched.subject_code === subject.code
                            );

                            return (
                                <tr className="table-fixed" key={subject.id}>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subject.code}
                                    </th>

                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.monday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.tuesday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.wednesday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.thursday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.friday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.saturday || ""}
                                    </th>
                                    <th className="whitespace-nowrap border w-1/6 border-primary px-4 font-medium text-gray-900">
                                        <Edit
                                            className="h-4"
                                            onClick={() =>
                                                handleSetSched(subject, section)
                                            }
                                        />
                                    </th>
                                </tr>
                            );
                        });
                })}
            </tbody>
        </table>
    );
}
