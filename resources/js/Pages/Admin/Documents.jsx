import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/components/InputLabel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import BadgeSuccess from "@/components/BadgeSuccess";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";

export default function Documents({ student, filters }) {
    const tableHeader = [
        "Name",
        "Department",
        "Year Level",
        "Classified As",
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
        form_138A: "",
        form_137: "",
        good_moral: "",
        psa: "",
        pic_2x2: "",
        ctc_transferee: "",
        grade_transferee: "",
        f137_transferee: "",
        doc_status: "",
    });

    const document = student.data.map((student) => ({
        id: student.id,
        student_id: student.student_id,

        first_name: student.personal_info?.first_name || "",
        middle_name: student.personal_info?.middle_name || "",
        last_name: student.personal_info?.last_name || "",
        department: student?.department || "",
        year_level: student?.year_level || "",
        classified_as: student?.classified_as || "",
        status: student?.status || "",

        form_138A: student.documents?.form_138A || "",
        form_137: student.documents?.form_137 || "",
        good_moral: student.documents?.good_moral || "",
        psa: student.documents?.psa || "",
        pic_2x2: student.documents?.pic_2x2 || "",

        ctc_transferee: student.documents?.ctc_transferee || "",
        grade_transferee: student.documents?.grade_transferee || "",
        f137_transferee: student.documents?.f137_transferee || "",
        doc_status: student.documents?.status || "",
    }));

    // Filtered data with only the required columns
    const tableData = document.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        department: student.department,
        year_level: student.year_level,
        classified_as: student.classified_as,
        doc_status: student.doc_status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    // const handleAdd = () => {
    //     setItemId(null);
    //     setAdd(true);
    //     setData({
    //         code: "",
    //         name: "",
    //         department: "",
    //         duration: "",
    //         campus: "",
    //         status: "",
    //     });
    // };

    const handleDel = (student) => {
        setItemId(student);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.documents.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Documents has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (student) => {
        student = document.find((s) => s.id === student.id);
        setItemId(student);
        console.log("student Data", student);
        setData({
            id: student.id,

            name:
                student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name,
            department: student.department,
            year_level: student.year_level,
            classified_as: student.classified_as,
            status: student.status,

            form_138A: student.form_138A,
            form_137: student.form_137,
            good_moral: student.good_moral,
            psa: student.psa,
            pic_2x2: student.pic_2x2,

            ctc_transferee: student.ctc_transferee,
            grade_transferee: student.grade_transferee,
            f137_transferee: student.f137_transferee,
        });

        setAdd(true);
    };

    const handleSubmit = () => {
        post(route("admin.program.store"), {
            onSuccess: () => {
                toast("Program has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    code: "",
                    name: "",
                    department: "",
                    duration: "",
                    campus: "",
                    status: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(
            route("admin.documents.haha", {
                student_info_id: itemId.student_id,
            }),
            {
                onSuccess: () => {
                    toast("Documents has been updated", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    });

                    setAdd(false);
                    setData({
                        id: "",
                        form_138A: "",
                        form_137: "",
                        good_moral: "",
                        psa: "",
                        pic_2x2: "",
                        ctc_transferee: "",
                        grade_transferee: "",
                        f137_transferee: "",
                        doc_status: "",
                    });
                },
            }
        );
    };

    const FilterData = ["All", "Approved", "OnHold", "Pending"];

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const handleSearchSubmit = () => {
        setDataFilter("All");
        router.get(
            route("admin.documents"),
            {
                search,
                status: "",
                per_page: perPage,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFilterChange = (status) => {
        setDataFilter(status);
        router.get(
            route("admin.documents"),
            {
                search: "",
                status: status === "All" ? "" : status,
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
            route("admin.documents"),
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
                <h1 className="text-2xl font-bold">Documents</h1>
            </div>
            <div className="flex justify-between mb-3">
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
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                    showDownload={false}
                    showDelete={false}
                />
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>Documents</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="p-4">
                                        <div>
                                            <div className="grid grid-cols-2 border border-customBlue py-4 px-2">
                                                <div className="flex">
                                                    <InputLabel>
                                                        Name:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.name}
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <InputLabel>
                                                        Department:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.department}
                                                    </p>
                                                </div>

                                                <div className="flex">
                                                    <InputLabel>
                                                        Classified As:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.classified_as}
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <InputLabel>
                                                        Application Status:
                                                    </InputLabel>
                                                    <p
                                                        className="
                                                        text-center pl-4 font-medium text-gray-900"
                                                    >
                                                        {data.status ===
                                                        "approved" ? (
                                                            <BadgeSuccess>
                                                                {data.status}
                                                            </BadgeSuccess>
                                                        ) : (
                                                            data.status
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className="text-black font-bold text-md mt-3 bg-customBlue px-2 py-1">
                                                Basic Requirements
                                            </h1>
                                            <div className="flow-root border border-customBlue py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Form 138A / Report
                                                            Card (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.form_138A
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "form_138A",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="form_138A"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.form_138A ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "form_138A",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="form_138A"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.form_138A ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "form_138A",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Form 137 (original
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.form_137
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "form_137",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="form_137"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.form_137 ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "form_137",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="form_137"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.form_137 ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "form_137",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Certificate of Good
                                                            Moral (original
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.good_moral
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "good_moral",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="good_moral"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.good_moral ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "good_moral",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="good_moral"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.good_moral ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "good_moral",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            PSA Birth
                                                            Certificate (photo
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={data.psa}
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "psa",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="psa"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.psa ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "psa",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="psa"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.psa ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "psa",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            1pc. Passport Size
                                                            picture (white
                                                            background)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <dd className="text-gray-700 sm:col-span-2">
                                                                <RadioGroup
                                                                    value={
                                                                        data.pic_2x2
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) =>
                                                                        setData(
                                                                            "pic_2x2",
                                                                            value
                                                                        )
                                                                    }
                                                                    className="flex justify-center"
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem
                                                                            name="pic_2x2"
                                                                            value={
                                                                                1
                                                                            }
                                                                            checked={
                                                                                data.pic_2x2 ===
                                                                                1
                                                                            }
                                                                            onValueChange={(
                                                                                value
                                                                            ) =>
                                                                                setData(
                                                                                    "pic_2x2",
                                                                                    value
                                                                                )
                                                                            }
                                                                        />
                                                                        <Label htmlFor="option-one">
                                                                            ✔️
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem
                                                                            name="pic_2x2"
                                                                            value={
                                                                                0
                                                                            }
                                                                            checked={
                                                                                data.pic_2x2 ===
                                                                                0
                                                                            }
                                                                            onValueChange={(
                                                                                value
                                                                            ) =>
                                                                                setData(
                                                                                    "pic_2x2",
                                                                                    value
                                                                                )
                                                                            }
                                                                        />
                                                                        <Label htmlFor="option-two">
                                                                            ❌
                                                                        </Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </dd>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Additional Requirements for
                                                Transferee
                                            </h1>
                                            <div className="flow-root border border-customBlue py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Honorabol Dismissal
                                                            / Certificate of
                                                            Transfer Credentials
                                                            (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.ctc_transferee
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "ctc_transferee",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="ctc_transferee"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.ctc_transferee ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "ctc_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="ctc_transferee"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.ctc_transferee ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "ctc_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Copy of Grades
                                                            (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.grade_transferee
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "grade_transferee",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="grade_transferee"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.grade_transferee ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "grade_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="grade_transferee"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.grade_transferee ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "grade_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            F137 (original copy
                                                            addressed to
                                                            Westbridge)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.f137_transferee
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "f137_transferee",
                                                                        value
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="f137_transferee"
                                                                        value={
                                                                            1
                                                                        }
                                                                        checked={
                                                                            data.f137_transferee ===
                                                                            1
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "f137_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-one">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        name="f137_transferee"
                                                                        value={
                                                                            0
                                                                        }
                                                                        checked={
                                                                            data.f137_transferee ===
                                                                            0
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "f137_transferee",
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label htmlFor="option-two">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </ScrollArea>

                                    <div className="flex items-center gap-4 mt-3 max-w-[300px]">
                                        <Select
                                            name="status"
                                            value={data.doc_status}
                                            onValueChange={(value) =>
                                                setData("doc_status", value)
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
                                        <Button
                                            onClick={
                                                itemId === null
                                                    ? handleSubmit
                                                    : handleUpdateSubmit
                                            }
                                        >
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
                                <DialogTitle>Delete Documents</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this documents?
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
                    routeName={"admin.documents"}
                    dataFilter={dataFilter}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
