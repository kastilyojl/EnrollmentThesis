// import React, { useState } from "react";
// import "../../css/UploadButton.css";
// import excel from "../../assets/excel.png";
// import { X } from "lucide-react";
// import { Button } from "./ui/button";
// import * as XLSX from "xlsx";
// import { router } from "@inertiajs/react"; // Use Inertia's router

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "./ui/scroll-area";

// const UploadButton = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [tableData, setTableData] = useState([]);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedFile(file); // Update selectedFile state

//             const reader = new FileReader();
//             reader.onload = async () => {
//                 const binaryStr = reader.result;
//                 const workbook = XLSX.read(binaryStr, { type: "binary" });

//                 // Assuming the data is in the first sheet
//                 const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//                 // Convert sheet data to JSON (all rows including headers)
//                 const jsonData = XLSX.utils.sheet_to_json(worksheet, {
//                     header: 1, // The first row will be treated as headers
//                 });

//                 // Set tableData for preview (include all rows for display)
//                 setTableData(jsonData); // All rows, including headers
//             };

//             reader.readAsBinaryString(file);
//         }
//     };

//     const removeSelectedFile = () => {
//         setSelectedFile(null);
//         setTableData([]);
//     };

//     const handleSaveToDatabase = async () => {
//         // Skip the first two rows for database insertion (headers and initial row data)
//         const subjects = [];

//         // Iterate through the rows, excluding the first two rows (header and initial row)
//         for (let i = 2; i < tableData.length; i++) {
//             const row = tableData[i];

//             // Find the program code in the Program table based on the program name
//             const programName = row[2]; // Assuming column index 2 is 'Program'

//             subjects.push({
//                 category: row[0], // Category
//                 department: row[1], // Department
//                 program_name: programName, // Pass program name instead of program code
//                 year_level: row[3], // Year Level
//                 period: row[4], // Period
//                 name: row[5], // Subject Name
//                 code: row[6], // Subject Code
//                 prerequisites: row[7], // Prerequisites
//                 lec: row[8], // Lec
//                 lab: row[9], // Lab
//                 unit: row[10], // Total
//             });
//         }

//         // Send the data to the backend using Inertia
//         if (subjects.length > 0) {
//             router
//                 .post("/subject/store-from-excel", { sub: subjects })
//                 .then(() => {
//                     alert("Subjects uploaded successfully!");
//                 })
//                 .catch((error) => {
//                     console.error("Error uploading subjects:", error);
//                     alert("There was an error uploading the subjects.");
//                 });
//         } else {
//             alert("No valid data to upload.");
//         }
//     };

//     return (
//         <div>
//             <button className="container-btn-file">
//                 <img src={excel} alt="excel" className="h-6 w-6 mr-2" />
//                 Upload File
//                 <input
//                     className="file"
//                     name="file"
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".xlsx, .xls, .csv"
//                 />
//             </button>

//             {selectedFile && (
//                 <div className="mt-10">
//                     <div className="space-y-4">
//                         <p>Selected File:</p>
//                         <p className="rounded-md flex justify-between items-center text-white bg-[#307750] p-4">
//                             <strong className="truncate">
//                                 {selectedFile.name}
//                             </strong>
//                             <X
//                                 className="h-4 w-4 cursor-pointer hover:text-red-400"
//                                 onClick={removeSelectedFile}
//                             />
//                         </p>
//                         <Button>Upload</Button>
//                     </div>
//                 </div>
//             )}

//             {selectedFile && (
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
//                             Preview in Dialog
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-5xl">
//                         <DialogHeader>
//                             <DialogTitle>Preview Data</DialogTitle>
//                             <DialogDescription>
//                                 Confirm this data before saving to the database.
//                             </DialogDescription>
//                         </DialogHeader>

//                         <ScrollArea className="h-[500px] p-4">
//                             {tableData.length > 0 && (
//                                 <table className="w-full text-sm text-left text-gray-500">
//                                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                                         <tr>
//                                             {tableData[0].map(
//                                                 (header, index) => (
//                                                     <th
//                                                         key={index}
//                                                         className="px-4 py-2"
//                                                     >
//                                                         {header}
//                                                     </th>
//                                                 )
//                                             )}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {tableData
//                                             .slice(1)
//                                             .map((row, rowIndex) => (
//                                                 <tr
//                                                     key={rowIndex}
//                                                     className="border-b bg-white hover:bg-gray-50"
//                                                 >
//                                                     {row.map(
//                                                         (cell, cellIndex) => (
//                                                             <td
//                                                                 key={cellIndex}
//                                                                 className="px-4 py-2"
//                                                             >
//                                                                 {cell}
//                                                             </td>
//                                                         )
//                                                     )}
//                                                 </tr>
//                                             ))}
//                                     </tbody>
//                                 </table>
//                             )}

//                             <div className="mt-4 text-right">
//                                 <Button onClick={handleSaveToDatabase}>
//                                     Save to Database
//                                 </Button>
//                             </div>
//                         </ScrollArea>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </div>
//     );
// };

// export default UploadButton;

import React, { useState } from "react";
import "../../css/UploadButton.css";
import excel from "../../assets/excel.png";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import * as XLSX from "xlsx";
import axios from "axios";
import { toast } from "sonner";
import { getFormattedDateTime } from "./utils/formatDateTime";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

const fieldLabels = {
    department: "Department",
    program_code: "Program Code",
    year_level: "Year Level",
    period: "Period",
    category: "Category",
    name: "Subject Name",
    code: "Subject Code",
    prerequisites: "Prerequisites",
    lec: "Lecture Hours",
    lab: "Lab Hours",
    unit: "Units",
};

const UploadButton = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            setTableData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        setTableData([]);
        setDialogOpen(false);
    };

    const validateSubject = (subject) => {
        const requiredFields = [
            "department",
            "program_code",
            "year_level",
            "period",
            "category",
            "name",
            "code",
            "prerequisites",
            "lec",
            "lab",
            "unit",
        ];

        for (let field of requiredFields) {
            const value = subject[field];
            if (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            ) {
                return {
                    valid: false,
                    message: `${fieldLabels[field] || field} is required`,
                };
            }
        }

        return { valid: true };
    };

    const handleSaveToDatabase = async () => {
        setIsLoading(true);
        const validSubjects = [];
        const errors = [];

        tableData.forEach((row, index) => {
            const subject = {
                department: row.Department,
                program_code: row.Program,
                year_level: row["Year Level"],
                period: row.Period,
                category: row.Category,
                name: row["Subject Name"],
                code: row["Subject Code"],
                prerequisites: row.Prerequisites,
                lec: Number(row["Lec."]) || 0,
                lab: Number(row["Lab."]) || 0,
                unit: Number(row["Units"]) || 0,
            };

            const validation = validateSubject(subject);
            if (!validation.valid) {
                errors.push(`Row ${index + 1}: ${validation.message}`);
            } else {
                validSubjects.push(subject);
            }
        });

        if (errors.length > 0) {
            toast("Validation Errors", {
                description: (
                    <div className="max-h-40 overflow-y-auto">
                        {errors.map((error, i) => (
                            <div key={i} className="py-1 text-red-600">
                                {error}
                            </div>
                        ))}
                    </div>
                ),
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("/subject/store-from-excel", {
                subjects: validSubjects,
            });

            if (response.data.duplicates?.length > 0) {
                toast("❗ Duplicates Found", {
                    description: (
                        <div className="text-gray-900 mx-4">
                            <p>
                                Successfully uploaded:{" "}
                                {response.data.success_count}
                            </p>
                            <div className="mt-2 max-h-40 overflow-y-auto">
                                {response.data.duplicates.map((dup, i) => (
                                    <div key={i} className="py-1">
                                        • {dup.code} - {dup.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ),
                    duration: 10000,
                });
            } else {
                toast("Subjects uploaded", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
            }

            setDialogOpen(false);
        } catch (error) {
            console.error("Upload error:", error);
            let errorMessage = "Failed to upload subjects";

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            toast("Upload Error", {
                description: (
                    <span className="text-gray-900 mx-4">{errorMessage}</span>
                ),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button className="container-btn-file">
                <img src={excel} alt="excel" className="h-6 w-6 mr-2" />
                Upload File
                <input
                    className="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls, .csv"
                />
            </button>

            {selectedFile && (
                <div className="mt-10">
                    <div className="space-y-4">
                        <p>Selected File:</p>
                        <p className="rounded-md flex justify-between items-center text-white bg-[#307750] p-4">
                            <strong className="truncate">
                                {selectedFile.name}
                            </strong>
                            <X
                                className="h-4 w-4 cursor-pointer hover:text-red-400"
                                onClick={removeSelectedFile}
                            />
                        </p>

                        {/* Show this button to open dialog manually */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    View Preview
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-5xl">
                                <DialogHeader>
                                    <DialogTitle>Preview Data</DialogTitle>
                                    <DialogDescription>
                                        Confirm the data before uploading to the
                                        database.
                                    </DialogDescription>
                                </DialogHeader>

                                <ScrollArea className="h-[500px] p-4">
                                    {tableData.length > 0 && (
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    {Object.keys(
                                                        tableData[0]
                                                    ).map((header, i) => (
                                                        <th
                                                            key={i}
                                                            className="px-4 py-2"
                                                        >
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map(
                                                    (row, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className="border-b bg-white hover:bg-gray-50"
                                                        >
                                                            {Object.values(
                                                                row
                                                            ).map(
                                                                (
                                                                    cell,
                                                                    cellIndex
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            cellIndex
                                                                        }
                                                                        className="px-4 py-2"
                                                                    >
                                                                        {cell}
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    )}

                                    <div className="mt-4 text-right">
                                        <Button
                                            onClick={handleSaveToDatabase}
                                            disabled={isLoading}
                                        >
                                            {isLoading
                                                ? "Saving..."
                                                : "Save to Database"}
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}

            {dialogOpen && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
                            Preview in Dialog
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Preview Data</DialogTitle>
                            <DialogDescription>
                                Confirm this data before saving to the database.
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="h-[500px] p-4">
                            {tableData.length > 0 && (
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            {Object.keys(tableData[0]).map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-4 py-2"
                                                    >
                                                        {header}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b bg-white hover:bg-gray-50"
                                            >
                                                {Object.values(row).map(
                                                    (cell, cellIndex) => (
                                                        <td
                                                            key={cellIndex}
                                                            className="px-4 py-2"
                                                        >
                                                            {cell}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4 text-right">
                                <Button
                                    onClick={handleSaveToDatabase}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Saving..."
                                        : "Save to Database"}
                                </Button>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default UploadButton;

// import React, { useState } from "react";
// import "../../css/UploadButton.css";
// import excel from "../../assets/excel.png";
// import { X } from "lucide-react";
// import { Button } from "./ui/button";
// import * as XLSX from "xlsx";
// import { router } from "@inertiajs/react"; // Use Inertia's router
// import { toast } from "sonner";

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "./ui/scroll-area";
// import { getFormattedDateTime } from "./utils/formatDateTime";

// const UploadButton = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [tableData, setTableData] = useState([]);
//     const [dialogOpen, setDialogOpen] = useState(false); // State to manage the dialog visibility

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedFile(file); // Update selectedFile state

//             const reader = new FileReader();
//             reader.onload = async () => {
//                 const binaryStr = reader.result;
//                 const workbook = XLSX.read(binaryStr, { type: "binary" });

//                 // Assuming the data is in the first sheet
//                 const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//                 // Convert sheet data to JSON (all rows including headers)
//                 const jsonData = XLSX.utils.sheet_to_json(worksheet, {
//                     header: 1, // The first row will be treated as headers
//                 });

//                 // Set tableData for preview (include all rows for display)
//                 setTableData(jsonData); // All rows, including headers
//                 setDialogOpen(true); // Open the dialog after data is loaded
//             };

//             reader.readAsBinaryString(file);
//         }
//     };

//     const removeSelectedFile = () => {
//         setSelectedFile(null);
//         setTableData([]);
//         setDialogOpen(false); // Close the dialog when file is removed
//     };

//     const handleSaveToDatabase = async () => {
//         // Skip the first two rows for database insertion (headers and initial row data)
//         const subjects = [];

//         // Iterate through the rows, excluding the first two rows (header and initial row)
//         for (let i = 2; i < tableData.length; i++) {
//             const row = tableData[i];

//             // Find the program code in the Program table based on the program name
//             const programName = row[2]; // Assuming column index 2 is 'Program'

//             subjects.push({
//                 category: row[0], // Category
//                 department: row[1], // Department
//                 program_name: programName, // Pass program name instead of program code
//                 year_level: row[3], // Year Level
//                 period: row[4], // Period
//                 name: row[5], // Subject Name
//                 code: row[6], // Subject Code
//                 prerequisites: row[7], // Prerequisites
//                 lec: row[8], // Lec
//                 lab: row[9], // Lab
//                 unit: row[10], // Total
//             });
//         }

//         // Send the data to the backend using Inertia
//         if (subjects.length > 0) {
//             router
//                 .post("/subject/store-from-excel", { sub: subjects })
//                 .then(() => {
//                     // Close the dialog and show toast notification
//                     onSuccess(); // Call the onSuccess function here
//                 })
//                 .catch((error) => {
//                     console.error("Error uploading subjects:", error);
//                     alert("There was an error uploading the subjects.");
//                 });
//         } else {
//             alert("No valid data to upload.");
//         }

//         // Define the onSuccess function
//         const onSuccess = () => {
//             toast("Subjects uploaded successfully!", {
//                 description: (
//                     <span className="text-gray-900">
//                         {getFormattedDateTime()}{" "}
//                         {/* Format date/time as needed */}
//                     </span>
//                 ),
//             });
//             setDialogOpen(false); // Close the dialog after the success
//         };
//     };
//     return (
//         <div>
//             <button className="container-btn-file">
//                 <img src={excel} alt="excel" className="h-6 w-6 mr-2" />
//                 Upload File
//                 <input
//                     className="file"
//                     name="file"
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".xlsx, .xls, .csv"
//                 />
//             </button>

//             {selectedFile && (
//                 <div className="mt-10">
//                     <div className="space-y-4">
//                         <p>Selected File:</p>
//                         <p className="rounded-md flex justify-between items-center text-white bg-[#307750] p-4">
//                             <strong className="truncate">
//                                 {selectedFile.name}
//                             </strong>
//                             <X
//                                 className="h-4 w-4 cursor-pointer hover:text-red-400"
//                                 onClick={removeSelectedFile}
//                             />
//                         </p>
//                         <Button>Upload</Button>
//                     </div>
//                 </div>
//             )}

//             {dialogOpen && (
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
//                             Preview in Dialog
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-5xl">
//                         <DialogHeader>
//                             <DialogTitle>Preview Data</DialogTitle>
//                             <DialogDescription>
//                                 Confirm this data before saving to the database.
//                             </DialogDescription>
//                         </DialogHeader>

//                         <ScrollArea className="h-[500px] p-4">
//                             {tableData.length > 0 && (
//                                 <table className="w-full text-sm text-left text-gray-500">
//                                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                                         <tr>
//                                             {tableData[0].map(
//                                                 (header, index) => (
//                                                     <th
//                                                         key={index}
//                                                         className="px-4 py-2"
//                                                     >
//                                                         {header}
//                                                     </th>
//                                                 )
//                                             )}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {tableData
//                                             .slice(1)
//                                             .map((row, rowIndex) => (
//                                                 <tr
//                                                     key={rowIndex}
//                                                     className="border-b bg-white hover:bg-gray-50"
//                                                 >
//                                                     {row.map(
//                                                         (cell, cellIndex) => (
//                                                             <td
//                                                                 key={cellIndex}
//                                                                 className="px-4 py-2"
//                                                             >
//                                                                 {cell}
//                                                             </td>
//                                                         )
//                                                     )}
//                                                 </tr>
//                                             ))}
//                                     </tbody>
//                                 </table>
//                             )}

//                             <div className="mt-4 text-right">
//                                 <Button onClick={handleSaveToDatabase}>
//                                     Save to Database
//                                 </Button>
//                             </div>
//                         </ScrollArea>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </div>
//     );
// };

// export default UploadButton;
