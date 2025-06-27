import React, { useState } from "react";
import WorldMap from "./components/WorldMap";
import CountryModal from "./components/CountryModal";

function App() {
    const [countryData, setCountryData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleCountryClick = async (geo) => {
        const code = geo.ISO_A3;
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
        <div style={{ position: "relative" }}>
            <h1 style={{ textAlign: "center" }}>Clickable World Map</h1>

            <WorldMap
                onCountryClick={handleCountryClick}
                onHover={(name) => setHoveredCountry(name)}
                onLeave={() => setHoveredCountry(null)}
                onMouseMove={(e) => {
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
            />

            {hoveredCountry && (
                <div
                    style={{
                        position: "fixed",
                        top: tooltipPos.y + 15,
                        left: tooltipPos.x + 15,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        pointerEvents: "none",
                        fontSize: "14px",
                        zIndex: 1000,
                    }}
                >
                    {hoveredCountry}
                </div>
            )}

            <CountryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                data={countryData}
            />
        </div>
    );
}

export default App;
