import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Link, router, useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ApplicationForm from "../Public/Section/Application";
import Pagination from "@/components/Pagination";
import { ChevronDown, Filter } from "lucide-react";
import RowPerPage from "@/components/RowPerPage";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropDown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";

export default function Application({ student, filters }) {
    const tableHeader = [
        "Name",
        "Department",
        "Year Level",
        "Program",
        "Semester",
        "Branch",
        "Status",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        id: "",
        status: "",
    });

    const studentData = student.data.map((students) => ({
        // student info
        id: students.id,
        department: students.department,
        school_year: students.school_year,
        semester: students.semester,
        branch: students.branch,
        year_level: students.year_level,
        program: students.program,
        classified_as: students.classified_as,
        last_school_attended: students.last_school_attended,
        last_school_address: students.last_school_address,
        email: students.users.email,
        status: students.status,
        // personal info
        first_name: students.personal_info.first_name,
        last_name: students.personal_info.last_name,
        middle_name: students.personal_info.middle_name,
        address: students.personal_info.address,
        birth_date: students.personal_info.birth_date,
        birth_place: students.personal_info.birth_place,
        civil_status: students.personal_info.civil_status,
        gender: students.personal_info.gender,
        religion: students.personal_info.religion,
        // guardian
        father_name: students.guardian.father_name,
        father_occupation: students.guardian.father_occupation,
        father_phone: students.guardian.father_phone,
        mother_name: students.guardian.mother_name,
        mother_phone: students.guardian.mother_phone,
        mother_occupation: students.guardian.mother_occupation,
        guardian_name: students.guardian.guardian_name,
        guardian_relationship: students.guardian.guardian_relationship,
        guardian_phone: students.guardian.guardian_phone,
    }));

    // Filtered data with only the required columns
    const tableData = studentData.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        department: student.department,
        year_level: student.year_level,
        program: student.program,
        semester: student.semester,
        branch: student.branch,
        status: student.status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [create, setCreate] = useState(false);

    const handleCreate = () => {
        setCreate((prev) => !prev);
    };

    const handleDel = (student) => {
        setItemId(student);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.student.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Student has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (student) => {
        student = studentData.find((s) => s.id === student.id);
        setItemId(student);
        console.log("student Data", student);
        setData({
            id: student.id,
            email: student.email,
            department: student.department,
            year_level: student.year_level,
            semester: student.semester,
            school_year: student.school_year,
            branch: student.branch,
            program: student.program,
            classified_as: student.classified_as,
            last_school_attended: student.last_school_attended,
            last_school_address: student.last_school_address,
            status: student.status,

            name:
                student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name,
            address: student.address,
            birth_date: student.birth_date,
            birth_place: student.birth_place,
            civil_status: student.civil_status,
            gender: student.gender,
            religion: student.religion,

            father_name: student.father_name,
            father_occupation: student.father_occupation,
            father_phone: student.father_phone,
            mother_name: student.mother_name,
            mother_occupation: student.mother_occupation,
            mother_phone: student.mother_phone,
            guardian_name: student.guardian_name,
            guardian_relationship: student.guardian_relationship,
            guardian_phone: student.guardian_phone,
        });

        setAdd(true);
    };

    const handleUpdateSubmit = () => {
        post(route("admin.application.update", { id: itemId }), {
            onSuccess: () => {
                toast("Student Application has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    status: "",
                });
            },
        });
    };

    const filterData = {
        Branch: ["Banlic - Main", "Uno"],
        Semester: ["1st Semester", "2nd Semester"],
        Department: ["SHS", "College"],
        Level: [
            "grade 11",
            "Grade 12",
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
        ],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.application",
        filterKey: "filter",
        filterValue: dataFilter,
        perPage,
    });

    const handleSearchChange = (val) => {
        setSearch(val);
        triggerSearch(val);
    };

    const year = sessionStorage.getItem("selectedYear");

    const handleFilterChange = (filterValue) => {
        setDataFilter(filterValue);
        router.get(
            route("admin.application"),
            {
                search: "",
                filter: filterValue === "All" ? "" : filterValue,
                per_page: perPage,
                year,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearAllFilters = () => {
        const year = sessionStorage.getItem("selectedYear");
        setSearch("");
        setDataFilter("All");

        router.get(
            route("admin.application"),
            {
                search: "",
                filter: "",
                per_page: perPage,
                year: year || "",
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Application</h1>
            </div>
            <div className="flex justify-between items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <SearchFilter
                        searchValue={search}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={triggerSearch}
                        onClearFilters={clearAllFilters}
                        showClearButton={search || dataFilter !== "All"}
                    />
                    <FilterDropdown
                        currentFilter={dataFilter}
                        filterData={filterData}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <Link href={route("admin.application.create")}>
                    <Button>Create</Button>
                </Link>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                />
                {create && (
                    <Dialog
                        open={create}
                        onOpenChange={(open) => setCreate(open)}
                    >
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>Add Student</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px]">
                                        <ApplicationForm
                                            setCreate={setCreate}
                                        />
                                    </ScrollArea>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px] p-4">
                                        <div>
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Student Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Email
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.email}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Branch
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.branch}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Department
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.department}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Program
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.program}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Year Level
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.year_level}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Semester
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.semester}
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            School Year
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.school_year}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Classified As
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.classified_as}
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Last School Attended
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.last_school_attended
                                                            }
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Last School Address
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.last_school_address
                                                            }
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Personal Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.name}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Address
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.address}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Date of Birth
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.birth_date}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Place of Birth
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.birth_place}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Civil Status
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.civil_status}
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Gender
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.gender}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Religion
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.religion}
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Parents Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Father's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.father_name}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Occupation
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.father_occupation
                                                            }
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.father_phone}
                                                        </dd>
                                                    </div>
                                                    <div></div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Mother's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.mother_name}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Occupation
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.mother_occupation
                                                            }
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.mother_phone}
                                                        </dd>
                                                    </div>
                                                    <br />
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Guardian's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {data.guardian_name}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Relationship
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.guardian_relationship
                                                            }
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className=" text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            {
                                                                data.guardian_phone
                                                            }
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                    <div className="flex items-center gap-4 mt-3 max-w-[300px]">
                                        <Select
                                            name="status"
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData("status", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-customBlue">
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="approved">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="onhold">
                                                    On Hold
                                                </SelectItem>
                                                <SelectItem value="reject">
                                                    Reject
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleUpdateSubmit}>
                                            Save
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Student</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this student?
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleSubmitDel}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            className="bg-red-600"
                                            onClick={() => setDel(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.application"}
                    perPage={perPage}
                    onPerPageChange={setPerPage}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
