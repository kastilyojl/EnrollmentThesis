import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { router, usePage } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function Navbar() {
    const { academic_year } = usePage().props;
    const user = usePage().props.auth.user;

    const formatYear = (year) =>
        `SY: ${format(new Date(year.start), "yyyy")} - ${format(
            new Date(year.end),
            "yyyy"
        )}`;

    const getLatestAcademicYear = () => {
        if (academic_year.length > 0) {
            const sortedYears = [...academic_year].sort((a, b) => {
                return new Date(b.start) - new Date(a.start);
            });
            return formatYear(sortedYears[0]);
        }
        return null;
    };

    const [selectedYear, setSelectedYear] = useState(() => {
        if (typeof window !== "undefined") {
            const storedYear = sessionStorage.getItem("selectedYear");
            if (storedYear) return storedYear;
        }
        return getLatestAcademicYear();
    });

    // Handle selecting a year from the dropdown
    const handleSelectChange = (value) => {
        setSelectedYear(value);
        sessionStorage.setItem("selectedYear", value);

        // Construct the new URL with the current query params
        const currentUrl = new URL(window.location.href);
        const currentYear = currentUrl.searchParams.get("year");

        // Get the other query parameters
        const perPage = currentUrl.searchParams.get("per_page");
        const search = currentUrl.searchParams.get("search");
        const role = currentUrl.searchParams.get("role");

        // Only update the `year` query parameter if it has changed
        if (currentYear !== value) {
            currentUrl.searchParams.set("year", value);
        }

        // Rebuild the URL with the current year and other parameters
        router.get(
            currentUrl.pathname + currentUrl.search,
            {
                per_page: perPage,
                role: role,
                search: search,
                year: value, // Set the selected year here
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const users = {
        id: 1,
        name: user.name,
        avatar: "/avatars/shadcn.jpg",
        email: user.email,
    };

    return (
        <header className="sticky z-10 bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur top-0 flex shrink-0 items-center gap-2 border-b h-16 px-3">
            <div className="flex gap-4 items-center">
                <SidebarTrigger />
                <div className="hidden sm:block">
                    <Select
                        value={selectedYear}
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="School Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {academic_year.length > 0 ? (
                                academic_year.map((year) => {
                                    const formatted = formatYear(year);
                                    return (
                                        <SelectItem
                                            key={year.id}
                                            value={formatted}
                                        >
                                            {formatted}
                                        </SelectItem>
                                    );
                                })
                            ) : (
                                <SelectItem disabled>
                                    No Academic Years Available
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="ml-auto">
                <NavUser user={users} />
            </div>
        </header>
    );
}
