import React, { useState } from "react";

function TripUploadModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        code: "",
        startDate: "",
        endDate: "",
        summary: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((p) => ({ ...p, images: e.target.files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "images") {
                for (let file of value) {
                    payload.append("images", file);
                }
            } else {
                payload.append(key, value);
            }
        });

        try {
            const res = await fetch("http://localhost:3001/api/countries", {
                method: "POST",
                body: payload,
            });
            if (!res.ok) throw new Error("Upload failed");
            alert("Trip uploaded!");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to upload trip.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4 shadow-xl"
            >
                <h2 className="text-xl font-semibold">Add New Trip</h2>

                <input
                    type="text"
                    name="code"
                    placeholder="Country Code (e.g., US)"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <div className="flex gap-4">
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-1/2 border rounded px-3 py-2"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="w-1/2 border rounded px-3 py-2"
                    />
                </div>

                <textarea
                    name="summary"
                    placeholder="Trip Summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                    multiple
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                />

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TripUploadModal;
