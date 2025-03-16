import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import BadgeSuccess from "./BadgeSuccess";
import BadgeWarning from "./BadgeWarning";

export default function TableData({
    tablerow,
    tabledata,
    handleEdit,
    handleDel,
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {tablerow.map((row, index) => {
                        return <TableHead key={index}>{row}</TableHead>;
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tabledata.map((program) => {
                    const { id, ...programWithoutId } = program;
                    return (
                        <TableRow key={id}>
                            {Object.values(programWithoutId).map((col, idx) => {
                                return (
                                    <TableCell
                                        className="font-medium"
                                        key={idx}
                                    >
                                        {col === "approved" ? (
                                            <BadgeSuccess>{col}</BadgeSuccess>
                                        ) : col === "pending" ? (
                                            <BadgeWarning>{col}</BadgeWarning>
                                        ) : (
                                            col
                                        )}
                                    </TableCell>
                                );
                            })}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreHorizontal />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() => handleEdit(program)}
                                        >
                                            <Edit />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Download />
                                            Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDel(program)}
                                        >
                                            <Trash />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
