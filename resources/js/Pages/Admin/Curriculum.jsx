import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Download,
    Edit,
    File,
    MoreHorizontal,
    Trash,
    View,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SHS from "./Curriculum/SHS";
import College from "./Curriculum/College";
import FilterDropdown from "@/components/FilterDropdown";

export default function Curriculum({ program = [] }) {
    const [itemId, setItemId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        code: "",
    });

    const handleEdit = (program) => {
        setItemId(program);
        setEdit(true);
        setData({
            id: program.id,
            code: program.code,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.otherfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    title: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.otherfee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fees has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Curriculum</h1>
            </div>
            <div className="flex space-x-4 mb-3">
                <Input type="text" placeholder="Search" className="w-[300px]" />
                <FilterDropdown
                // currentFilter={dataFilter}
                // filterData={filterData}
                // onFilterChange={handleFilterChange}
                />
                {/* <Button>Create</Button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {program.map((program) => (
                    <Card
                        key={program.id}
                        className="w-full text-sm odd:bg-gray-100 space-y-2"
                    >
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                <File className="h-10 w-10" />
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal className="h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    // Defer to let Dropdown close before Dialog opens
                                                    document.activeElement?.blur();
                                                    setTimeout(
                                                        () =>
                                                            handleEdit(program),
                                                        0
                                                    );
                                                }}
                                            >
                                                <View />
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download />
                                                Download
                                            </DropdownMenuItem>
                                            {/* <DropdownMenuItem>
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="space-y-2">
                            <p className="text-gray-600 flex justify-between">
                                code:
                                <span className="text-black text-end text-wrap">
                                    {program.code}
                                </span>
                            </p>

                            <p className="text-gray-600 flex justify-between">
                                name:
                                <span className="text-black text-end text-wrap">
                                    {program.name}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {edit && (
                    <Dialog open={edit} onOpenChange={(open) => setEdit(open)}>
                        {program
                            .filter((program) => program.code === itemId.code)
                            .map((program) => (
                                <DialogContent className="max-w-5xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {/* {program.name} */}
                                        </DialogTitle>
                                        <DialogDescription>
                                            <ScrollArea className="h-[500px] px-4">
                                                {program.department ===
                                                "College" ? (
                                                    <College
                                                        program={program}
                                                    />
                                                ) : (
                                                    <SHS program={program} />
                                                )}
                                            </ScrollArea>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            ))}
                    </Dialog>
                )}
            </div>
        </Layout>
    );
}
