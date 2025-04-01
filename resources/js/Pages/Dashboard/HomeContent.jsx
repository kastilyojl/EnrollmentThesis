import { usePage } from "@inertiajs/react";
import React from "react";
import Home from "./Admin/Home";
import HomeProfile from "./Student/HomeProfile";
import Enrollment from "./Admin/Enrollment";
import Billing from "./Admin/Billing";

export default function HomeContent() {
    const user = usePage().props.auth.user;
    return (
        <>
            {user.role === "super admin" ? (
                <Home />
            ) : user.role === "registrar" ? (
                <Enrollment />
            ) : user.role === "accounting" ? (
                <Billing />
            ) : user.role === "student" ? (
                <HomeProfile />
            ) : null}
        </>
    );
}
