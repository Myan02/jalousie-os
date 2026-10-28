import { useState } from "react";
import { useDragContext } from "../../../context/DragContext";
import Divider from "./Divider";
import Tab from "./Tab";
import "./PhotoCarousel.css";

interface Props {
    windowId: string,
    images: { id: number, src: string | undefined, description: string | undefined }[]
};

const PhotoCarousel = ({ windowId, images }: Props) => {
    const { windows } = useDragContext();
    const [currentImage, setCurrentImage] = useState<number>(10);

    const curWindow = windows.find((w) => w.id === windowId)

    const handleNext = () => {
        setCurrentImage((prev) => prev === images.length - 1 ? 0 : prev + 1);
    }

    const handlePrev = () => {
        setCurrentImage((prev) => prev === 0 ? images.length - 1 : prev - 1)
    }

    const displayImages = images.map((image) => {
        return <img
            className="carousel__body-image"
            style={{
                width: "auto",
                height: curWindow ? curWindow?.height - 124 : "100%",
            }} key={image.id} src={image.src} alt={image.description} />
    });

    return (
        <div className="carousel">
            <div className="carousel__header">
                <div className="documents__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 42px", marginLeft: "4px" }} label="File" />
                    <Tab style={{ flex: "0 0 48px" }} label="Edit" />
                    <Tab style={{ flex: "0 0 48px" }} label="View" />
                    <Tab style={{ flex: "0 0 36px" }} label="Go" />
                    <Tab style={{ flex: "0 0 72px" }} label="Favorites" />
                    <Tab style={{ flex: "0 0 48px" }} label="Help" />
                </div>
            </div>

            <div className="carousel__body">
                {displayImages[currentImage]}
            </div>

            <div className="carousel__footer">
                <button className="carousel__footer__button" onClick={handlePrev}>Prev</button>
                <Divider divType="vertical" />
                <h4 className="carousel__footer__description"><i>{images[currentImage].description}</i></h4>
                <Divider divType="vertical" />
                <button className="carousel__footer__button" onClick={handleNext}>Next</button>
            </div>

        </div>
    );
};

export default PhotoCarousel;