import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { usePage } from "@inertiajs/react";
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

    const getLatestAcademicYear = () => {
        if (academic_year.length > 0) {
            const sortedYears = [...academic_year].sort((a, b) => {
                return new Date(b.start) - new Date(a.start);
            });

            const latestYear = sortedYears[0];
            return `SY: ${format(
                new Date(latestYear.start),
                "yyyy"
            )} - ${format(new Date(latestYear.end), "yyyy")}`;
        }
        return null;
    };

    const [selectedYear, setSelectedYear] = useState(() => {
        if (typeof window !== "undefined") {
            const storedYear = sessionStorage.getItem("selectedYear");
            if (storedYear) {
                return storedYear;
            }
        }
        return getLatestAcademicYear();
    });
    const handleSelectChange = (value) => {
        setSelectedYear(value);
        sessionStorage.setItem("selectedYear", value);
    };

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
                <Select
                    className="h-[6px] w-[10px]"
                    value={selectedYear}
                    onValueChange={handleSelectChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="School Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {academic_year.length > 0 ? (
                            academic_year.map((year) => {
                                const formattedYear = `SY: ${format(
                                    new Date(year.start),
                                    "yyyy"
                                )} - ${format(new Date(year.end), "yyyy")}`;

                                return (
                                    <SelectItem
                                        key={year.id}
                                        value={formattedYear}
                                    >
                                        {formattedYear}
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

            <div className="ml-auto">
                <NavUser user={users} />
            </div>
        </header>
    );
}
