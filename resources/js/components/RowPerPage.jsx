import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";

export default function RowPerPage({
    filters,
    search = "",
    dataFilter = "All",
}) {
    const [perPage, setPerPage] = useState(filters?.per_page || 2);
    const handlePerPageChange = (value) => {
        setPerPage(value);
        router.get(
            route("admin.application"),
            {
                search,
                program: dataFilter === "All" ? "" : setDataFilter,
                per_page: value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 border rounded">
                    {perPage}
                    <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                    {[2, 10, 25, 50, 100].map((option) => (
                        <DropdownMenuItem
                            key={option}
                            onSelect={() => handlePerPageChange(option)}
                            className={perPage === option ? "bg-gray-100" : ""}
                        >
                            {option}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
