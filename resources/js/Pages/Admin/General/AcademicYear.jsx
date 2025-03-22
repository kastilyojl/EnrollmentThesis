import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AcademicYear() {
    const [add, setAdd] = useState("false");

    const handleAdd = () => {
        setAdd(true);
    };

    const handleCancel = () => {
        setAdd(false);
    };

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={handleAdd}>Create</Button>
            </div>
            {add && (
                <div className="border shadow-sm bg-white">
                    <div className="p-4 w-[400px] space-y-4">
                        <div className="flex items-center gap-4">
                            <Label className="w-24">Start Date</Label>
                            <Input />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-24">End Date</Label>
                            <Input />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-24">Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="close">close</SelectItem>
                                    <SelectItem value="open">open</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-x-4">
                            <Button>Save</Button>
                            <Button
                                onClick={handleCancel}
                                className="bg-gray-600 hover:bg-gray-500"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="table-fixed">
                        <TableHead className="w-1/12 text-center">
                            Start
                        </TableHead>
                        <TableHead className="w-1/12  text-center">
                            End
                        </TableHead>
                        <TableHead className="w-1/12  text-center">
                            Status
                        </TableHead>
                        <TableHead className="w-1/12  text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="table-fixed">
                        <TableCell className="w-1/12  text-center">
                            Paid
                        </TableCell>
                        <TableCell className="w-1/12  text-center">
                            Paid
                        </TableCell>
                        <TableCell className="w-1/12  text-center">
                            Credit Card
                        </TableCell>
                        <TableCell className="w-1/12  text-center">
                            <div className="flex justify-center">
                                <div>
                                    <Edit className="h-5 text-blue-600" />
                                </div>
                                <div>
                                    <Trash className="h-5  text-red-600" />
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
