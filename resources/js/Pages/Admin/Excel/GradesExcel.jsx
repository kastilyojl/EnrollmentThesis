import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Download, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import excel from "../../../../assets/excel.png";
import "../../../../css/UploadButton.css";

const fieldLabels = {
    student_info_id: "Student ID",
    semester: "Semester",
    year_level: "Year Level",
    subject: "Subject",
    grade: "Grades",
    status: "Remarks",
};

export default function BulkUploadExcel() {
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleDownloadFormat = () => {
        const link = document.createElement("a");
        link.href = "/storage/format/Grades.xlsx";
        link.setAttribute("download", "grades.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const data = new Uint8Array(ev.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                newFiles.push({
                    name: file.name,
                    data: jsonData,
                    isLoading: false,
                    error: null,
                });

                if (newFiles.length === files.length) {
                    setUploadedFiles((prev) => [...prev, ...newFiles]);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const removeFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateGrades = (grades) => {
        const requiredFields = Object.keys(fieldLabels);
        for (let field of requiredFields) {
            if (
                !grades[field] ||
                (typeof grades[field] === "string" &&
                    grades[field].trim() === "")
            ) {
                return {
                    valid: false,
                    message: `${fieldLabels[field]} is required`,
                };
            }
        }
        return { valid: true };
    };

    const handleSave = async (index) => {
        const file = uploadedFiles[index];
        const validGrades = [];
        const errors = [];

        file.data.forEach((row, i) => {
            const grades = {
                student_info_id: row["Student ID"],
                semester: row["Semester"],
                year_level: row["Year Level"],
                subject: row["Subject"],
                grade: row["Grades"],
                status: row["Remarks"],
            };

            const validation = validateGrades(grades);
            if (!validation.valid) {
                errors.push(`Row ${i + 1}: ${validation.message}`);
            } else {
                validGrades.push(grades);
            }
        });

        if (errors.length > 0) {
            toast("Validation Errors", {
                description: (
                    <div className="max-h-40 overflow-y-auto text-red-600">
                        {errors.map((err, i) => (
                            <div key={i}>{err}</div>
                        ))}
                    </div>
                ),
            });
            return;
        }

        setUploadedFiles((prev) =>
            prev.map((f, i) =>
                i === index ? { ...f, isLoading: true, error: null } : f
            )
        );

        try {
            const response = await axios.post("/grades/store-from-excel", {
                grades: validGrades,
            });

            if (response.data.duplicates?.length > 0) {
                toast("Some grades were skipped", {
                    description: (
                        <div className="text-gray-900 mx-4">
                            <p>Uploaded: {response.data.success_count}</p>
                            <ul className="mt-2 max-h-40 overflow-y-auto">
                                {response.data.duplicates.map((dup, i) => (
                                    <li key={i} className="text-red-600">
                                        {dup.code ?? "-"} - {dup.name ?? "-"}
                                        <br />
                                        <span className="text-sm text-gray-700">
                                            {dup.error}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ),
                    duration: 10000,
                });
            } else {
                toast.success("Programs uploaded successfully!");
            }
        } catch (error) {
            toast.error("Upload failed", {
                description:
                    error.response?.data?.message || "Something went wrong.",
            });

            setUploadedFiles((prev) =>
                prev.map((f, i) =>
                    i === index
                        ? {
                              ...f,
                              isLoading: false,
                              error: error.message || "Failed",
                          }
                        : f
                )
            );
        } finally {
            setUploadedFiles((prev) =>
                prev.map((f, i) =>
                    i === index ? { ...f, isLoading: false } : f
                )
            );
        }
    };

    return (
        <Layout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Upload Grades</h1>
            </div>
            <div className="flex justify-end gap-4 mb-4">
                <Button
                    className=" text-wrap cursor-pointer"
                    onClick={handleDownloadFormat}
                >
                    <Download />
                    Download Format
                </Button>
                <Button className="container-btn-file cursor-pointer text-wrap p-7 ">
                    <img src={excel} alt="excel" className="h-4 w-4 mr-2" />
                    Upload File
                    <input
                        className="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx, .xls, .csv"
                    />
                </Button>
            </div>

            {uploadedFiles.length === 0 && (
                <p className="text-gray-500 bg-gray-50 p-4 rounded-md">
                    No files uploaded yet.
                </p>
            )}

            {uploadedFiles.map((file, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-6 bg-white shadow-sm"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-md font-semibold">
                            Selected File: {file.name}
                        </div>
                        <X
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => removeFile(index)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {file.data.length > 0 && (
                            <table className="w-full text-sm text-left text-gray-700 mb-4">
                                <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                                    <tr>
                                        {Object.keys(file.data[0]).map(
                                            (header, i) => (
                                                <th
                                                    key={i}
                                                    className="px-3 py-2"
                                                >
                                                    {header}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {file.data.map((row, rowIndex) => {
                                        // Determine if this row contains a Name (adjust logic as needed)
                                        const highlightRow = row["Name"]; // Replace "Name" with the appropriate header if needed

                                        return (
                                            <tr
                                                key={rowIndex}
                                                className={`border-b hover:bg-gray-50 ${
                                                    highlightRow
                                                        ? "bg-yellow-100"
                                                        : ""
                                                }`} // Apply background color if it's the "Name" row
                                            >
                                                {Object.values(row).map(
                                                    (cell, cellIndex) => (
                                                        <td
                                                            key={cellIndex}
                                                            className="px-3 py-2"
                                                        >
                                                            {cell}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="text-right">
                        <Button
                            onClick={() => handleSave(index)}
                            disabled={file.isLoading}
                        >
                            {file.isLoading ? "Saving..." : "Save to Database"}
                        </Button>
                        {file.error && (
                            <p className="text-sm text-red-600 mt-2">
                                {file.error}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </Layout>
    );
}
