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
                <TableRow className="table-fixed">
                    {tablerow.map((row, index) => {
                        return (
                            <TableHead
                                key={index}
                                className="w-1/12 text-center"
                            >
                                {row}
                            </TableHead>
                        );
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tabledata.map((program) => {
                    const { id, ...programWithoutId } = program;
                    return (
                        <TableRow key={id} className="table-fixed">
                            {Object.values(programWithoutId).map((col, idx) => {
                                return (
                                    <TableCell
                                        className="font-medium w-1/12 text-center"
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
                            <TableCell className="font-medium w-1/12 text-center">
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
