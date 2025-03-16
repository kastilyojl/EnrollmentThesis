import React, { useState } from "react";
import { format } from "date-fns";
import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Edit, Filter, Trash, User } from "lucide-react";
import BadgeWarning from "@/components/BadgeWarning";
import BadgereDanger from "@/components/BadgeDanger";
import BadgeSuccess from "@/components/BadgeSuccess";

export default function UserManagement({ user = [] }) {
    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const tableHeader = ["Name", "Email", "Email Verified", "Created At"];
    const tableData = ["Name", "Email", "Email Verified", "Created At"];

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleEdit = (program) => {
        setItemId(program);
        setAdd(true);
        setData({
            id: program.id,
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-[300px]"
                    />
                    <div className="text-white">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-primary flex px-2 py-1 rounded-md">
                                Filter
                                <Filter className="h-5 ml-2" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-customBlue ">
                                <DropdownMenuItem>Role</DropdownMenuItem>
                                <DropdownMenuItem>Name</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Email Verified
                                </DropdownMenuItem>
                                <DropdownMenuItem>Created</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Button>Create</Button>
            </div>
            <div className="border rounded-sm px-4">
                <Table>
                    <TableHeader>
                        <TableRow className="table-fixed">
                            <TableHead className="text-center w-1/12">
                                Name
                            </TableHead>
                            <TableHead className="text-center w-1/12">
                                Email
                            </TableHead>
                            <TableHead className="text-center w-1/12">
                                Role
                            </TableHead>
                            <TableHead className="text-center w-1/12">
                                Email Verified
                            </TableHead>
                            <TableHead className="text-center w-1/12">
                                Created At
                            </TableHead>
                            <TableHead className="text-center w-1/12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.map((users, index) => {
                            return (
                                <TableRow className="table-fixed">
                                    <TableCell className="font-medium text-center w-1/12">
                                        {users.name}
                                    </TableCell>
                                    <TableCell className="font-medium text-center w-1/12">
                                        {users.email}
                                    </TableCell>
                                    <TableCell className="font-medium text-center w-1/12">
                                        {users.role}
                                    </TableCell>
                                    <TableCell className="font-medium text-center w-1/12">
                                        {users.email_verified_at ? (
                                            <BadgeSuccess>
                                                {format(
                                                    new Date(
                                                        users.email_verified_at
                                                    ),
                                                    "yyyy-MM-dd"
                                                )}
                                            </BadgeSuccess>
                                        ) : (
                                            <BadgereDanger>
                                                not verified
                                            </BadgereDanger>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium text-center w-1/12">
                                        {users.created_at
                                            ? format(
                                                  new Date(users.created_at),
                                                  "yyyy-MM-dd"
                                              )
                                            : "not verified yet"}
                                    </TableCell>
                                    <TableCell className="flex justify-center items-center">
                                        <Edit className="h-5 text-blue-600" />
                                        <Trash className="h-5 text-red-600" />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
