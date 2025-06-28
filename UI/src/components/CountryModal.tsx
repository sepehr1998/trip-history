import { useState } from "react";

function CountryModal({ isOpen, onClose, data }) {
    const [zoomedImage, setZoomedImage] = useState(null);

    if (!isOpen || !data) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center text-black">
                <div className="bg-white p-6 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-extrabold">{data.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black text-3xl"
                        >
                            &times;
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">My Trips to {data.name}</p>

                    <h3 className="text-xl font-semibold mb-3">Trips</h3>

                    {data.trips?.length > 0 ? (
                        <div className="space-y-4">
                            {data.trips.map((trip, index) => {
                                const title = `${trip.startDate?.slice(0, 10)} → ${trip.endDate?.slice(0, 10)}`;
                                return (
                                    <details key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <summary className="cursor-pointer bg-gray-100 px-4 py-3 hover:bg-gray-200 font-medium">
                                            {title}
                                        </summary>
                                        <div className="p-4 space-y-4">
                                            <p className="text-sm text-gray-700">{trip.summary}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {trip.images.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={`http://localhost:3001/${img}`}
                                                        alt={`trip-${i}`}
                                                        onClick={() => setZoomedImage(`http://localhost:3001/${img}`)}
                                                        className="w-full aspect-video object-contain rounded-lg shadow-lg cursor-pointer bg-white p-2"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No trips added yet.</p>
                    )}
                </div>
            </div>

            {zoomedImage && (
                <div
                    onClick={() => setZoomedImage(null)}
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                >
                    <img
                        src={zoomedImage}
                        alt="Zoomed"
                        className="max-w-4xl max-h-[90vh] rounded-xl shadow-2xl"
                    />
                </div>
            )}
        </>
    );
}

export default CountryModal;
