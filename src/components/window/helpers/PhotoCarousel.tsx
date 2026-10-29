import { useState } from "react";
import { useDragContext } from "../../../context/DragContext";
import Divider from "./Divider";
import Tab from "./Tab";
import "./PhotoCarousel.css";

interface Props {
    windowId: string,
    media: { id: number, src: string | undefined, extension: string | undefined, description: string | undefined }[]
};

const PhotoCarousel = ({ windowId, media }: Props) => {
    const { windows } = useDragContext();
    const [currentMedia, setCurrentMedia] = useState<number>(0);

    const curWindow = windows.find((w) => w.id === windowId);

    const handleNext = () => {
        setCurrentMedia((prev) => prev === media.length - 1 ? 0 : prev + 1);
    };

    const handlePrev = () => {
        setCurrentMedia((prev) => prev === 0 ? media.length - 1 : prev - 1)
    };

    const handleDownload = (m: number) => {
        const link = document.createElement('a');
        link.href = String(media[m].src);
        link.download = String(media[m].description);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const displayMedia = media.map((m) => {

        if (m.extension === ".glb") {
            // @ts-ignore
            return (<model-viewer
                key={m.id}
                className="carousel__body-media"
                src={m.src}
                alt={m.description}
                loading="auto"
                touch-action
                auto-rotate
                camera-controls
                auto-rotate-delay="0"
                rotation-per-second="-20deg"
                style={{
                    width: "90%",
                    height: curWindow ? curWindow?.height - 124 : "100%",
                    backgroundColor: "var(--win-silver)"
                }}
            >    {/* @ts-ignore */}
            </model-viewer>)
        }

        if (m.extension === ".mp4") {
            return <video
                className="carousel__body-media"
                controls
                muted
                key={m.id}
                style={{
                    width: "auto",
                    height: curWindow ? curWindow?.height - 124 : "100%",
                }}
            >
                <source src={m.src} type="video/mp4" />
                Your browser does not support video.
            </video>
        }

        return <img
            className="carousel__body-media"
            style={{
                width: "auto",
                height: curWindow ? curWindow?.height - 124 : "100%",
            }}
            key={m.id}
            src={m.src}
            alt={m.description} />
    });

    return (
        <div className="carousel">
            <div className="carousel__header">
                <div className="documents__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 72px", marginLeft: "4px" }} label="Download" click={() => handleDownload(currentMedia)} />
                </div>
            </div>

            <div className="carousel__body">
                {displayMedia[currentMedia]}
            </div>

            <div className="carousel__footer">
                <button className="carousel__footer__button" onClick={handlePrev}>Prev</button>
                <Divider divType="vertical" />
                <h4 className="carousel__footer__description"><i>{media[currentMedia].description}</i></h4>
                <Divider divType="vertical" />
                <button className="carousel__footer__button" onClick={handleNext}>Next</button>
            </div>

        </div>
    );
};

export default PhotoCarousel;