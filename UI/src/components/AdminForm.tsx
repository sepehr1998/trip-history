import { useState } from "react";

export default function AdminForm() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("code", code.toUpperCase());
        formData.append("name", name);
        formData.append("description", description);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const res = await fetch("http://localhost:3001/api/countries", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Country added!");
                setCode(""); setName(""); setDescription(""); setImages([]);
            } else {
                alert("Error uploading country.");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }
    };

    return (
        <div className="mt-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-500">Upload Trip</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="ISO A3 Code (e.g. USA)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="input"
                />

                <input
                    type="text"
                    placeholder="Country Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload</button>
            </form>
        </div>
    );
}
