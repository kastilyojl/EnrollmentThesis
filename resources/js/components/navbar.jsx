import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { usePage } from "@inertiajs/react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Navbar() {
    const user = usePage().props.auth.user;

    const users = {
        id: 1,
        name: user.name,
        avatar: "/avatars/shadcn.jpg",
        email: user.email,
    };
    return (
        <header className="sticky z-10 bg-background/95 supports-[backfrop-filter]:bg-background/60 backdrop-blur top-0 flex shrink-0 items-center gap-2 border-b h-16 px-3">
            <div className="flex gap-4 items-center">
                <SidebarTrigger />
                <Select className="h-[6px] w-[10px]">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="School Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">SY: 2025 - 2026</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="ml-auto">
                <NavUser user={users} />
            </div>
        </header>
    );
}
