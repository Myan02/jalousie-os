import { useEffect, useRef } from "react";
import { useDragContext } from "../../context/DragContext";
import type { AppIcon } from "../../types/Types";
import "./DraggableIcon.css";

// Sizes of each cell, change the size
export const GRID_CELL_WIDTH = 80;
export const GRID_CELL_HEIGHT = 90;

type Props = {
    icon: AppIcon & { displayCol?: number; displayRow?: number };
    maxCols: number;
    maxRows: number;
};

const DraggableIcon = ({ icon, maxCols, maxRows }: Props) => {
    const { icons, openWindow, moveIcon, selectIcon } = useDragContext();
    const ref = useRef<HTMLDivElement>(null);

    const left = typeof icon.displayCol === "number" ? icon.displayCol : icon.col;
    const top = typeof icon.displayRow === "number" ? icon.displayRow : icon.row;

    const style: React.CSSProperties = {
        position: "absolute",
        left: left * GRID_CELL_WIDTH,
        top: top * GRID_CELL_HEIGHT,
        width: GRID_CELL_WIDTH,
        height: GRID_CELL_HEIGHT,
    };

    useEffect(() => {

        // Set selected icon to undefined when a click does not contain the icon div
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;

            if (ref.current && target.className !== ref.current.className) {
                selectIcon(undefined);
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [ref]);

    // Handle icon movement when user drops the icon
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {

        // Get dimensions of parent div based on what is dragged (either desktop or a window)
        const container = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
        const relX = e.clientX - container.left;
        const relY = e.clientY - container.top;

        // Conversion back to row and col integers
        const newCol = Math.max(0, Math.min(maxCols - 1, Math.floor(relX / GRID_CELL_WIDTH)));
        const newRow = Math.max(0, Math.min(maxRows - 1, Math.floor(relY / GRID_CELL_HEIGHT)));

        // Check any collisions
        const siblings = icons.filter(
            (i) => i.id !== icon.id && i.scope === icon.scope && i.parentWindowId === icon.parentWindowId
        );
        const occupied = siblings.some((i) => i.col === newCol && i.row === newRow);

        if (!occupied) moveIcon(icon.id, newCol, newRow);
    };

    return (
        <div
            className="draggable-icon"
            ref={ref}
            style={style}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => selectIcon(icon.id)}
            onDoubleClick={() => openWindow(icon.id)}
            tabIndex={0}
        >
            <img
                className="draggable-icon__img"
                src={`./src/assets/icons/${icon.iconSrc}`}
                alt={icon.label}
                onDragStart={(e) => e.preventDefault()}
            />
            <span className="draggable-icon__label">{icon.label}</span>
        </div>
    );
};

export default DraggableIcon;