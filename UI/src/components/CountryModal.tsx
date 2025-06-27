import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function CountryModal({ isOpen, onClose, data }) {
    if (!data) return null;

    const images = data.images?.map((img) => ({
        original: img,
        thumbnail: img,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Country Info"
            style={{
                content: { maxWidth: "600px", margin: "auto", inset: "40px" },
            }}
        >
            <h2>{data.name}</h2>
            <p>{data.description}</p>

            {images?.length ? (
                <ImageGallery items={images} showPlayButton={false} />
            ) : (
                <p>No images available.</p>
            )}

            <button onClick={onClose} style={{ marginTop: "1rem" }}>
                Close
            </button>
        </Modal>
    );
}
