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
import BadgeEnrolled from "./BadgeEnrolled";
import BadgeOnhold from "./BadgeOnhold";

export default function TableData({
    tablerow,
    tabledata,
    handleEdit,
    handleDel,
    showDelete = true,
    showDownload = true,
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
                                        ) : col === "enrolled" ? (
                                            <BadgeEnrolled>{col}</BadgeEnrolled>
                                        ) : col === "onhold" ? (
                                            <BadgeOnhold>{col}</BadgeOnhold>
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
                                        {showDownload && (
                                            <DropdownMenuItem>
                                                <Download />
                                                Download
                                            </DropdownMenuItem>
                                        )}
                                        {showDelete && (
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDel(program)
                                                }
                                            >
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem>
                                        )}
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
