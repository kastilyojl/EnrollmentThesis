import React from "react";
import Layout from "@/components/layout";
import Log from "./Content/Log";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Log1 from "./Content/Log1";

export default function AuditTrail() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Audit Trail</h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <ScrollArea className="max-h-[500px]">
                    <Log title={"Enrollment Log"} svg_color={"#2563EB"} />
                </ScrollArea>
                <ScrollArea className="max-h-[500px]">
                    <Log1 title={"Curriculum Log"} svg_color={"#7C3AED"} />
                </ScrollArea>
                <ScrollArea className="max-h-[500px]">
                    <Log title={"Billing Log"} svg_color={"#16A34A"} />
                </ScrollArea>
            </div>
        </Layout>
    );
}
