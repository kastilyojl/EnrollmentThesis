import { usePage } from "@inertiajs/react";
import React from "react";
import Home from "./Admin/Home";
import HomeProfile from "./Student/HomeProfile";

export default function HomeContent() {
    const user = usePage().props.auth.user;
    return (
        <>
            {user.role === "super admin" ? (
                <Home />
            ) : user.role === "student" ? (
                <HomeProfile />
            ) : null}
        </>
    );
}
