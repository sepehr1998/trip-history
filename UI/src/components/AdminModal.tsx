import { useState } from "react";

function AdminModal({ isOpen, onClose }) {
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("code", countryCode);
        formData.append("name", countryName);
        formData.append("description", description);
        for (let img of images) formData.append("images", img);

        try {
            const res = await fetch("http://localhost:3001/api/countries", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error("Failed");
            alert("Trip uploaded successfully!");
            onClose();
        } catch (err) {
            alert("Upload failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4 text-blue-500">Upload New Trip</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="input"
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        className="input"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input"
                        rows={3}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-600 hover:text-black"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminModal;
