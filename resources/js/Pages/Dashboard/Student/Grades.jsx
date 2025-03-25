import Layout from "@/components/layout";
import React from "react";

export default function Grades() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Grade</h1>
            </div>
            <div className="space-y-4">Grade are not available</div>
        </Layout>
    );
}
