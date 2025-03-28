import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export default function FilterDropdown({
    currentFilter = "All",
    FilterData,
    onFilterChange,
    buttonClassName = "bg-primary flex items-center px-3 py-1.5 rounded-md text-sm",
    menuClassName = "bg-customBlue text-white min-w-[180px]",
    activeItemClassName = "bg-primary/80",
}) {
    return (
        <div className="text-white">
            <DropdownMenu>
                <DropdownMenuTrigger className={buttonClassName}>
                    {currentFilter === "All"
                        ? "Filter"
                        : `Filter: ${currentFilter}`}
                    <Filter className="h-4 w-4 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={menuClassName}>
                    <div className="text-white">
                        {FilterData.map((program) => (
                            <DropdownMenuItem
                                key={program}
                                onSelect={() => onFilterChange(program)}
                                className={
                                    currentFilter === program
                                        ? activeItemClassName
                                        : ""
                                }
                            >
                                {program}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
