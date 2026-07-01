import { useDragContext } from "../../context/DragContext";
import type { AppIcon } from "../../types";
import "./DraggableIcon.css";

// Sizes of each cell, change the size
export const GRID_CELL_WIDTH = 80;
export const GRID_CELL_HEIGHT = 90;

type Props = {
    icon: AppIcon;
    maxCols: number;
    maxRows: number;
};

const DraggableIcon = ({ icon, maxCols, maxRows }: Props) => {
    const { icons, openWindow, moveIcon } = useDragContext();

    const style: React.CSSProperties = {
        position: "absolute",
        left: icon.col * GRID_CELL_WIDTH,   // Beginning pixel position of the column
        top: icon.row * GRID_CELL_HEIGHT,   // Beginning pixel position of the row

        // Icon size
        width: GRID_CELL_WIDTH,
        height: GRID_CELL_HEIGHT,
    };

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
            style={style}
            draggable
            onDragEnd={handleDragEnd}
            onDoubleClick={() => openWindow(icon.id)}
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