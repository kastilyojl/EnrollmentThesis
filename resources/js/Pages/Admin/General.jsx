import Layout from "@/components/layout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import AcademicYear from "./General/AcademicYear";
import NavLink from "@/components/NavLink";
import FAQ from "./General/FAQ";
export default function General({ faq = [] }) {
    const [activeTab, setActiveTab] = useState("academicYear"); // Initial active tab

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Setting</h1>
            </div>

            <div className="flex w-full shadow bg-slate-50  py-2 rounded-md">
                <div className=" space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <NavLink>Annoucement</NavLink>
                    <NavLink onClick={() => setActiveTab("academicYear")}>
                        Academic Setup
                    </NavLink>
                    <NavLink>Requirements</NavLink>
                    <NavLink onClick={() => setActiveTab("FAQ")}>FAQ</NavLink>
                    <NavLink>Campus</NavLink>
                    <NavLink>Profile</NavLink>
                </div>
            </div>

            <div className=" p-4 mt-4 shadow rounded-md">
                {activeTab === "academicYear" && <AcademicYear />}
                {activeTab === "id" && <div>ID Content</div>}
                {activeTab === "FAQ" && <FAQ faq={faq} />}
            </div>
        </Layout>
    );
}
