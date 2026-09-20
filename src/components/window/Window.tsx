import { useRef } from "react";
import { useDragContext } from "../../context/DragContext";
import type { AppWindow } from "../../types";
import WindowContent from "./WindowContent";
import "./Window.css";

const Window = ({ window: win }: { window: AppWindow }) => {
    const { closeWindow, minimizeWindow, focusWindow, moveWindow, scaleWindow } = useDragContext();
    const dragOffset = useRef({ x: 0, y: 0 });  // Keep track of mouse location in relation to window title position
    const windowBorderPosition = useRef({
        "top-left": { x: 0, y: 0 },
        "top-right": { x: 0, y: 0 },
        "bottom-left": { x: 0, y: 0 },
        "bottom-right": {x: 0, y: 0}
    });    // Used for scaling
     

    const handleScaleDrag = (e: React.MouseEvent) => {
        e.stopPropagation();

        focusWindow(win.id);
        let newWidth: number, newHeight: number;
        let pos: "corner" | "right" | "bottom";

        windowBorderPosition.current = { 
            "top-left": { x: win.x, y: win.y },
            "top-right": { x: win.x + win.width, y: win.y },
            "bottom-left": { x: win.x, y: win.y + win.height },
            "bottom-right": { x: win.x + win.width, y: win.y + win.height }
        }

        const onMove = (e: MouseEvent) => {
            const distToEdgeX = window.innerWidth - windowBorderPosition.current["top-left"].x;
            const distToEdgeY = window.innerHeight - windowBorderPosition.current["top-left"].y;
            
            newWidth = Math.max(window.innerWidth / 3, Math.min(distToEdgeX, e.clientX - win.x));
            newHeight = Math.max(window.innerHeight / 2, Math.min(distToEdgeY, e.clientY - win.y + 32));

            if (pos == "bottom") {
                document.body.style.cursor = "ns-resize";
                newWidth = win.width;
            } else if (pos == "right") {
                document.body.style.cursor = "ew-resize";
                newHeight = win.height + 32;
            } else {
                document.body.style.cursor = "nwse-resize";
            }

            scaleWindow(win.id, newWidth, newHeight, "neutral");
        }

        const onUp = () => {
            document.body.style.cursor = "default";

            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        if ((e.clientY <= windowBorderPosition.current["bottom-left"].y && e.clientY >= windowBorderPosition.current["bottom-left"].y - 24) ||
            ((e.clientX <= windowBorderPosition.current["top-right"].x && e.clientX >= windowBorderPosition.current["top-right"].x - 24) && (e.clientY >= windowBorderPosition.current["top-right"].y + 28))
        ) {
            if (e.clientX <= windowBorderPosition.current["bottom-right"].x - 24) {
                pos = "bottom";
            } else if (e.clientY <= windowBorderPosition.current["bottom-right"].y - 24) {
                pos = "right";
            } else {
                pos = "corner";
            }

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        }

    };

    // Move window when title is dragged
    const handleTitleMouseDown = (e: React.MouseEvent) => {
        focusWindow(win.id);
        dragOffset.current = { x: e.clientX - win.x, y: e.clientY - win.y };

        const onMove = (e: MouseEvent) => {
            e.stopPropagation();

            // Clamps the X position to the screen. remove clamp to give free movement.
            const newX = Math.max(0, Math.min(
                window.innerWidth - win.width,
                e.clientX - dragOffset.current.x
            ));

            // clamps the Y position to the screen
            const newY = Math.max(0, Math.min(
                window.innerHeight - win.height - 32,
                e.clientY - dragOffset.current.y
            ));

            moveWindow(win.id, newX, newY);
        };
        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    };

    // Update window scale when maximize button is clicked
    const handleScaleButtonClicked = () => {
        let x, y, newWidth, newHeight;

        if (win.scaleState === "neutral") {
            x = 0;
            y = 0
            newWidth = window.innerWidth;
            newHeight = window.innerHeight;
            
        } else {
            x = (window.innerWidth / 2) - ((window.innerWidth / 3) / 2);
            y = (window.innerHeight / 2) - ((window.innerHeight / 1.875) / 2);
            newWidth = window.innerWidth / 3;
            newHeight = window.innerHeight / 1.875;
        }

        moveWindow(win.id, x, y);
        scaleWindow(win.id, newWidth, newHeight, win.scaleState === "maximized" ? "neutral" : "maximized");
    };

    if (win.minimized) return null;

    return (
        <div
            className="window"
            style={{
                left: win.x,
                top: win.y,
                width: win.width,
                height: win.height,
                zIndex: win.zIndex,
                userSelect: "none"
            }}
            onDragStart={e => e.preventDefault()}
            onMouseDown={handleScaleDrag}
            onMouseMove={(e) => {

                windowBorderPosition.current = { 
                    "top-left": { x: win.x, y: win.y },
                    "top-right": { x: win.x + win.width, y: win.y },
                    "bottom-left": { x: win.x, y: win.y + win.height },
                    "bottom-right": { x: win.x + win.width, y: win.y + win.height }
                }

                // Update cursor based on location of user mouse 
                // For scaling window
                if ((e.clientY <= windowBorderPosition.current["bottom-left"].y && e.clientY >= windowBorderPosition.current["bottom-left"].y - 24) ||
                    ((e.clientX <= windowBorderPosition.current["top-right"].x && e.clientX >= windowBorderPosition.current["top-right"].x - 24) && (e.clientY >= windowBorderPosition.current["top-right"].y + 28))
                ) {
                    if (e.clientX <= windowBorderPosition.current["bottom-right"].x - 24 && e.clientY >= windowBorderPosition.current["bottom-right"].y - 24) {
                        document.body.style.cursor = "ns-resize";
                    } else if (e.clientY <= windowBorderPosition.current["bottom-right"].y - 24 && e.clientX >= windowBorderPosition.current["bottom-right"].x - 24) {
                        document.body.style.cursor = "ew-resize";
                    } else {
                        document.body.style.cursor = "nwse-resize";
                    }
                } else {
                    document.body.style.cursor = "default";
                }
            }}
            onMouseLeave={() => document.body.style.cursor = "default"}
        >
            <div className="window__titlebar" onMouseDown={handleTitleMouseDown} onDoubleClick={handleScaleButtonClicked}>
                <img className="window__titlebar-icon" src={`./src/assets/icons/${win.windowSrc}`} alt={win.title} />
                <span className="window__titlebar-title">{win.title}</span>

                <div className="window__controls">
                    <button
                        className="window__btn window__btn--minimize"
                        onMouseDown={e => e.stopPropagation()}
                        onClick={() => minimizeWindow(win.id)}
                    >
                        <img src="./src/assets/icons/minimize-icon.png" alt="minimize" />
                    </button>

                    {/* Update window icon to maximize */}
                    <button
                        className="window__btn window__btn--minimize"
                        onMouseDown={e => e.stopPropagation()}
                        onClick={() => handleScaleButtonClicked()}
                    >
                        <img src="./src/assets/icons/maximize-icon.png" alt="maximize" />
                    </button>

                    <button
                        className="window__btn window__btn--close"
                        onMouseDown={e => e.stopPropagation()}
                        onClick={() => closeWindow(win.id)}
                    >
                        <img src="./src/assets/icons/close-icon.png" alt="close" />
                    </button>
                </div>
            </div>

            <div className="window__content">
                <WindowContent windowId={win.id} />
            </div>
        </div>
    );
};

export default Window;