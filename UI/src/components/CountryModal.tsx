import React, { useState } from "react";

function CountryModal({ isOpen, onClose, data }) {
    const [expanded, setExpanded] = useState(null);

    if (!isOpen || !data) return null;

    const toggle = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh] animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-4">{data.name}</h2>

                {data.trips && data.trips.length > 0 ? (
                    data.trips.map((trip, index) => (
                        <div key={index} className="mb-4 border rounded-md">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left p-4 font-medium bg-gray-100 hover:bg-gray-200"
                            >
                                {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
                            </button>
                            {expanded === index && (
                                <div className="p-4 bg-white border-t">
                                    <p className="mb-3 text-gray-700">{trip.summary}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {trip.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={`http://localhost:3001/${img}`}
                                                alt={`Trip ${i}`}
                                                className="rounded object-cover h-32 w-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No trips recorded yet.</p>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default CountryModal;
