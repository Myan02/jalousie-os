/**
 *  A type of window content that displays media.
 */

import { useState } from "react";
import { useDragContext } from "../../../context/DragContext";
import Divider from "./Divider";
import Tab from "./Tab";
import "./PhotoCarousel.css";

interface Props {
    windowId: string,
    media: { id: number, src: string | undefined, extension: string | undefined, description: string | undefined }[]
};


/**
 * Add photo carousel components to any window content components.
 * 
 * @param windowId: The id of the window that is rendering this photo carousel
 * @param media: The type of media to be rendered. Can be a .glb, .mp4, or any image format.
 * @returns PhotoCarousel component
 */
const PhotoCarousel = ({ windowId, media }: Props) => {
    const { windows } = useDragContext();
    const [currentMedia, setCurrentMedia] = useState<number>(0);    /* This stateful number refers to the index of the image */

    const curWindow = windows.find((w) => w.id === windowId);

    console.log(media);

    /**
     * Increment the current media being displayed. If the user has reached the final
     * media item, loop back to the beginning.
     */
    const handleNext = () => {
        setCurrentMedia((prev) => prev === media.length - 1 ? 0 : prev + 1);
    };

    /**
     * Decrement the current media being displayed. If the user has reached the 
     * first media item, loop to the end.
     */
    const handlePrev = () => {
        setCurrentMedia((prev) => prev === 0 ? media.length - 1 : prev - 1)
    };

    /**
     * Allow the user to download the current media being displayed. 
     * Simulate the creation of an anchor tag with a download attribute being clicked.
     * 
     * @param m: the index of the current media being displayed 
     */
    const handleDownload = (m: number) => {
        const link = document.createElement('a');
        link.href = String(media[m].src);
        link.download = String(media[m].description);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /**
     * map each media source file to its html tag. Only supports .glb for 3D models and .mp4 
     * for videos. Most other images files are supported.
     */
    const displayMedia = media.map((m) => {

        /* .GLB model */
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
                    height: "90%",
                    width: "90%",
                    backgroundColor: "var(--win-silver)",
                }}
            >    {/* @ts-ignore */}
            </model-viewer>)
        }

        /* .MP4 video */
        if (m.extension === ".mp4") {
            return <video
                className="carousel__body-media"
                autoPlay
                controls
                muted
                key={m.id}
                style={{
                    maxHeight: curWindow ? `calc(${curWindow.height - 124}px - 32px)` : "calc(100% - 32px)",
                    maxWidth: curWindow ? `calc(${curWindow.width - 64}px - 32px)` : "calc(100% - 32px)",
                }}
            >
                <source src={m.src} type="video/mp4" />
                Your browser does not support video.
            </video>
        }

        /* Image: commonly .jpg or .png */
        return <img
            className="carousel__body-media"
            style={{
                maxHeight: curWindow ? `calc(${curWindow.height - 124}px - 32px)` : "calc(100% - 32px)",
                maxWidth: curWindow ? `calc(${curWindow.width - 64}px - 32px)` : "calc(100% - 32px)",
            }}
            key={m.id}
            src={m.src}
            alt={m.src}
        />
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