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
        <div style={{ padding: 20 }}>
            <h2>Add New Country</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ISO A3 Code (e.g. USA)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                /><br /><br />

                <input
                    type="text"
                    placeholder="Country Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                /><br /><br />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                    required
                /><br /><br />

                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
