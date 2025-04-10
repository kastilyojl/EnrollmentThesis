import Layout from "@/components/layout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function CSVTable() {
    const [file, setFile] = useState(null);
    const { csvData } = usePage().props; // Access the csvData passed via Inertia

    // Convert the object into an array for easier iteration
    const dataArray = csvData ? Object.values(csvData) : [];

    const { data, setData, post, errors } = useForm({
        csv_file: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("csv_file", data.csv_file); // Attach the CSV file to the FormData

        // Submit the form data via Inertia's post method
        post(route("upload.csv"), formData, {
            onError: () => {
                console.error("There was an error uploading the file!");
            },
            onSuccess: () => {
                console.log("File uploaded successfully!");
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Enrollment</h1>
            </div>
            <div className="space-y-4">
                <div>
                    <h1>Upload CSV</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept=".csv"
                            name="csv_file"
                            onChange={(e) =>
                                setData("csv_file", e.target.files[0])
                            }
                        />
                        <button type="submit">Upload</button>
                    </form>

                    {dataArray && dataArray.length > 0 && (
                        <div>
                            <h2>CSV Data</h2>
                            <table border="1">
                                <thead>
                                    <tr>
                                        {Object.keys(dataArray[0]).map(
                                            (key) => (
                                                <th key={key}>{key}</th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataArray.map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).map(
                                                (value, idx) => (
                                                    <td key={idx}>{value}</td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
