import { useState } from "react";
import WorldMap from "./components/WorldMap";
import CountryModal from "./components/CountryModal";
import AdminForm from "./components/AdminForm";
import TripUploadModal from "./components/TripUploadModal.tsx";

function App() {
    const [countryData, setCountryData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [uploadModalOpen, setUploadModalOpen] = useState(false);


    const handleCountryClick = async (geo) => {
        const code = geo.name;
        try {
            const res = await fetch(`http://localhost:3001/api/countries/${code}`);
            if (!res.ok) throw new Error("Country not found");
            const data = await res.json();
            setCountryData(data);
            setModalOpen(true);
        } catch (err) {
            alert("Data not available for selected country.");
            setModalOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">🌍 Travel Admin</h2>
                    <button
                        className="w-full bg-white text-blue-800 font-semibold py-2 px-4 rounded-lg mb-4 hover:bg-blue-100 transition"
                        onClick={() => setUploadModalOpen(true)}
                    >
                        Upload New Trip
                    </button>

                    <TripUploadModal
                        isOpen={uploadModalOpen}
                        onClose={() => setUploadModalOpen(false)}
                    />

                    <p className="text-sm opacity-80 mb-8">
                        Manage your visited countries and memories.
                    </p>
                </div>

                <div className="text-xs opacity-60">
                    &copy; {new Date().getFullYear()} Sepehr's Travel App
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-y-auto relative">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-fade-in-down">
                        My Trip History
                    </h1>
                    <p className="text-gray-500 mt-2">Click a country to view memories</p>
                </div>

                <div className="bg-white bg-opacity-80 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto animate-fade-in-up">
                    <WorldMap
                        onCountryClick={handleCountryClick}
                        onHover={(name) => setHoveredCountry(name)}
                        onLeave={() => setHoveredCountry(null)}
                        onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                    />
                </div>

                {hoveredCountry && (
                    <div
                        className="fixed z-50 pointer-events-none px-3 py-1.5 bg-black text-white text-sm rounded shadow-lg"
                        style={{ top: tooltipPos.y + 15, left: tooltipPos.x + 15 }}
                    >
                        {hoveredCountry}
                    </div>
                )}

                <CountryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    data={countryData}
                />
            </main>
        </div>

    );
}

export default App;
