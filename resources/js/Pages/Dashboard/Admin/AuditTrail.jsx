import React from "react";
import Layout from "@/components/layout";
import Log from "./Content/Log";

export default function AuditTrail() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Audit Trail</h1>
            </div>
            <div className="space-y-4">
                <div>
                    <Log title={"Enrollment Log"} svg_color={"#2563EB"} />
                </div>
                <div>
                    <Log title={"Curriculum Log"} svg_color={"#7C3AED"} />
                </div>
                <div>
                    <Log title={"Billing Log"} svg_color={"#16A34A"} />
                </div>
            </div>
        </Layout>
    );
}
