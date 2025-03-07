import Layout from "@/components/layout";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Stats from "./Content/Stats";
import Chart from "./Content/Chart";

export default function Dashboard() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    <Stats />
                    <Stats />
                    <Stats />
                    <Stats />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Chart />
                    <div></div>
                </div>
            </div>
        </Layout>
    );
}
