import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { usePage } from "@inertiajs/react";

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
            <SidebarTrigger />

            <div className="ml-auto">
                <NavUser user={users} />
            </div>
        </header>
    );
}
