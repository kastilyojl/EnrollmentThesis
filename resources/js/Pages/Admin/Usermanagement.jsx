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
import { Label } from "@/components/ui/label";
import { Link, router, useForm } from "@inertiajs/react";
import InputError from "@/components/InputError copy";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";

export default function UserManagement({ user, filters }) {
    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const tableHeader = ["Name", "Email", "Email Verified", "Created At"];
    const tableData = ["Name", "Email", "Email Verified", "Created At"];
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            name: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

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

    const FilterData = ["All", "Admin", "Student", "Email Verified", "College"];

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 2);

    const handleSearchSubmit = () => {
        setDataFilter("All");
        router.get(
            route("admin.user.management"),
            {
                search,
                program: "",
                per_page: perPage,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFilterChange = (program) => {
        setDataFilter(program);
        router.get(
            route("admin.user.management"),
            {
                search: "",
                program: program === "All" ? "" : program,
                per_page: perPage,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearAllFilters = () => {
        setSearch("");
        setDataFilter("All");
        router.get(
            route("admin.user.management"),
            { per_page: perPage },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <SearchFilter
                            searchValue={search}
                            onSearchChange={setSearch}
                            onSearchSubmit={handleSearchSubmit}
                            onClearFilters={clearAllFilters}
                            showClearButton={search || dataFilter !== "All"}
                        />
                        <FilterDropdown
                            currentFilter={dataFilter}
                            onFilterChange={handleFilterChange}
                            FilterData={FilterData}
                        />
                    </div>
                </div>
                <Button>
                    <Link href={route("admin.user.management.create")}>
                        Create
                    </Link>
                </Button>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
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
                            {/* <TableHead className="text-center w-1/12"></TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.data.map((users, index) => {
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
                                    {/* <TableCell className="flex justify-center items-center">
                                        <Edit className="h-5 text-blue-600" />
                                        <Trash className="h-5 text-red-600" />
                                    </TableCell> */}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.user.management"}
                    dataFilter={dataFilter}
                />
                <Pagination links={user.links} />
            </div>
        </Layout>
    );
}
