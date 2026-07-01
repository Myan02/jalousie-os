import { useRef } from "react";
import { useDragContext } from "../../context/DragContext";
import type { AppWindow } from "../../types";
import WindowContent from "./WindowContent";
import "./Window.css";

const Window = ({ window: win }: { window: AppWindow }) => {
    const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useDragContext();
    const dragOffset = useRef({ x: 0, y: 0 });  // Keep track of mouse location in relation to window title position

    const handleTitleMouseDown = (e: React.MouseEvent) => {
        focusWindow(win.id);
        dragOffset.current = { x: e.clientX - win.x, y: e.clientY - win.y };

        const onMove = (e: MouseEvent) => {
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

    if (win.minimized) return null;

    return (
        <div
            className="window"
            style={{
                left: win.x,
                top: win.y,
                width: win.width,
                height: win.height,
                zIndex: win.zIndex
            }}
            onMouseDown={() => focusWindow(win.id)}
        >
            <div className="window__titlebar" onMouseDown={handleTitleMouseDown}>
                <img draggable="false" className="window__titlebar-icon" src={`./src/assets/icons/${win.windowSrc}`} alt={win.title} />
                <span className="window__titlebar-title">{win.title}</span>

                <div className="window__controls">
                    <button
                        className="window__btn window__btn--minimize"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => minimizeWindow(win.id)}
                    >
                        <img src="./src/assets/icons/minimize-icon.png" alt="minimize" />
                    </button>

                    <button
                        className="window__btn window__btn--close"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => closeWindow(win.id)}
                    >
                        <img src="./src/assets/icons/close-icon.png" alt="close" />
                    </button>
                </div>

                <div className="window__content">
                    <WindowContent windowId={win.id} />
                </div>
            </div>
        </div>
    );
};

export default Window;