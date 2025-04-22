import React, { useState } from "react";
import "../../css/UploadButton.css";
import excel from "../../assets/excel.png";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const UploadButton = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
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
                />
            </button>

            <div className="mt-10">
                {selectedFile && (
                    <div className="space-y-4">
                        <p>Selected File:</p>
                        <p className="rounded-md flex justify-between items-center text-white bg-[#307750] p-4">
                            <strong className="truncate">
                                {selectedFile.name}
                            </strong>
                            <X
                                className="h-4 w-4 cursor-pointer hover:text-red-400"
                                onClick={removeSelectedFile} // 👈 Hooked up here
                            />
                        </p>
                        <Button>Upload</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadButton;
