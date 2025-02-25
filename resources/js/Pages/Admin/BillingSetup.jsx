import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function BillingSetup() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Billing</h1>
            </div>
            <div className="flex justify-between mb-3">
                <Input type="text" placeholder="Search" className="w-[300px]" />
                <Button>Create</Button>
            </div>
            <div className="border rounded-sm px-4"></div>
        </Layout>
    );
}
