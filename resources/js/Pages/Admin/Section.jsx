import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ChevronRight,
    Edit,
    Filter,
    MoreHorizontal,
    MoveDownRight,
    Trash,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/components/InputError";
import Schedule from "./Section/Schedule";
import ScheduleTable from "./Section/ScheduleTable";

export default function Section({ program = [], section = [] }) {
    const [itemId, setItemId] = useState(null);
    const [sectionItem, setSectionItem] = useState(null);
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [del, setDel] = useState(false);
    const [sched, setSched] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rotatedRows, setRotatedRows] = useState({});
    const {
        data,
        setData,
        errors,
        post,
        delete: onDelete,
    } = useForm({
        name: "",
        program_code: "",
        semester: "",
        year_level: "",
        department: "",
    });

    const programData = program.map((program) => {
        return program.subjects.map((subject) => ({
            program_code: subject.program_code,
            name: subject.name,
        }));
    });

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            name: "",
            program_code: "",
            semester: "",
            year_level: "",
            department: "",
        });
    };

    const handleEdit = (section) => {
        setItemId(section);
        setAdd(true);
        setData({
            id: section.id,
            name: section.name,
            program_code: section.program_code,
            semester: section.semester,
            year_level: section.year_level,
            department:
                section.year_level === "Grade 11" ||
                section.year_level === "Grade 12"
                    ? "SHS"
                    : "College",
        });
    };

    const handleSubmit = () => {
        console.log(data);
        post(route("admin.section.store"), {
            onSuccess: () => {
                toast("Section has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    name: "",
                    program_code: "",
                    semester: "",
                    year_level: "",
                    department: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.section.update", { id: itemId }), {
            onSuccess: () => {
                toast("Section has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setAdd(false);
                setData({
                    name: "",
                    program_code: "",
                    semester: "",
                    year_level: "",
                    department: "",
                });
            },
        });
    };

    const handleDel = (section) => {
        setItemId(section);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.section.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Section has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    const handleShowSubject = (index) => {
        if (selectedRow === index) {
            setSelectedRow(null);
            setShow(false);

            setRotatedRows((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
        } else {
            setSelectedRow(index);
            setShow(true);

            if (selectedRow !== null) {
                setRotatedRows((prev) => ({
                    ...prev,
                    [selectedRow]: false,
                }));
            }

            setRotatedRows((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
        }
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Section</h1>
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
                            <DropdownMenuContent className="bg-customBlue text-white">
                                <DropdownMenuItem>
                                    Computer Science
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Information System
                                </DropdownMenuItem>
                                <DropdownMenuItem>Tourism</DropdownMenuItem>
                                <DropdownMenuItem>Criminology</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Button onClick={handleAdd}>Create</Button>
            </div>
            <div className="border rounded-sm px-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center"></TableHead>
                            <TableHead className="text-center">
                                Section
                            </TableHead>
                            <TableHead className="text-center">
                                Program
                            </TableHead>
                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Subject Count
                            </TableHead>
                            <TableHead className="text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {section.map((section, index) => (
                            <>
                                <TableRow key={section.id}>
                                    <TableCell className="font-medium">
                                        <ChevronRight
                                            onClick={() =>
                                                handleShowSubject(index)
                                            }
                                            style={{
                                                height: "20px",
                                                transition: "transform 0.3s",
                                                transform: rotatedRows[index]
                                                    ? "rotate(90deg)"
                                                    : "rotate(0deg)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {section.name}
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {section.program_code}
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {section.semester}
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {section.year_level}
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {program
                                            .map((program) => {
                                                return program.subjects.filter(
                                                    (subject) =>
                                                        subject.year_level ===
                                                            section.year_level &&
                                                        subject.period ===
                                                            section.semester
                                                ).length;
                                            })
                                            .reduce(
                                                (total, count) => total + count,
                                                0
                                            )}
                                    </TableCell>
                                    <TableCell className="flex">
                                        <Edit
                                            className="h-5 text-blue-600"
                                            onClick={() => handleEdit(section)}
                                        />
                                        <Trash
                                            className="h-5 text-red-600"
                                            onClick={() => handleDel(section)}
                                        />
                                    </TableCell>
                                </TableRow>
                                {selectedRow === index && show && (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className="overflow-x-auto ">
                                                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                                                    <span>
                                                        {section.program_code}
                                                    </span>
                                                    <span>{section.name}</span>
                                                    <span>
                                                        {section.year_level}
                                                    </span>
                                                </div>

                                                <ScheduleTable
                                                    program={program}
                                                    section={section}
                                                    setItemId={setItemId}
                                                    setSectionItem={
                                                        setSectionItem
                                                    }
                                                    setSched={setSched}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))}
                    </TableBody>
                </Table>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Section"
                                        : "Edit Section"}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="name">
                                                Section Name
                                            </Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="department">
                                                Department
                                            </Label>
                                            <Select
                                                name="department"
                                                value={data.department}
                                                onValueChange={(value) =>
                                                    setData("department", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SHS">
                                                        Senior High School
                                                    </SelectItem>
                                                    <SelectItem value="College">
                                                        College
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="program_code">
                                                Program
                                            </Label>
                                            <Select
                                                name="program_code"
                                                value={data.program_code}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "program_code",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {program
                                                        .filter(
                                                            (program) =>
                                                                program.department ===
                                                                data.department
                                                        )
                                                        .map((program) => (
                                                            <SelectItem
                                                                value={
                                                                    program.code
                                                                }
                                                            >
                                                                {program.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="semester">
                                                Semester
                                            </Label>
                                            <Select
                                                name="semester"
                                                value={data.semester}
                                                onValueChange={(value) =>
                                                    setData("semester", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1st Semester">
                                                        1st Semester
                                                    </SelectItem>
                                                    <SelectItem value="2nd Semester">
                                                        2nd Semester
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="year_level">
                                                Year Level
                                            </Label>
                                            <Select
                                                name="year_level"
                                                value={data.year_level}
                                                onValueChange={(value) =>
                                                    setData("year_level", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data.department ===
                                                        "College" && (
                                                        <>
                                                            <SelectItem value="1st Year">
                                                                1st Year
                                                            </SelectItem>
                                                            <SelectItem value="2nd Year">
                                                                2nd Year
                                                            </SelectItem>
                                                            <SelectItem value="3rd Year">
                                                                3rd Year
                                                            </SelectItem>
                                                            <SelectItem value="4th Year">
                                                                4th Year
                                                            </SelectItem>
                                                        </>
                                                    )}
                                                    {data.department ===
                                                        "SHS" && (
                                                        <>
                                                            <SelectItem value="Grade 11">
                                                                Grade 11
                                                            </SelectItem>
                                                            <SelectItem value="Grade 12">
                                                                Grade 12
                                                            </SelectItem>
                                                        </>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button
                                        className="mt-3"
                                        onClick={
                                            itemId === null
                                                ? handleSubmit
                                                : handleUpdateSubmit
                                        }
                                    >
                                        Save
                                    </Button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}

                {sched && (
                    <Dialog
                        open={sched}
                        onOpenChange={(open) => setSched(open)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Set Schedule"
                                        : "Edit Schedule"}
                                </DialogTitle>
                                <DialogDescription>
                                    <Schedule
                                        subject={itemId}
                                        setSched={setSched}
                                        section={sectionItem}
                                        initialData={sectionItem.schedule}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}

                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Section</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this section?
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
        </Layout>
    );
}
