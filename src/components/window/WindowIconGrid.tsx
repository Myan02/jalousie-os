import { useDragContext } from "../../context/DragContext";
import DraggableIcon, { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../shared/DraggableIcon";
import { useRef, useEffect, useState } from "react";
import "./WindowGridIcon.css";

const WindowIconGrid = ({ parentWindowId }: { parentWindowId: string }) => {
    const { icons } = useDragContext();

    const containerRef = useRef<HTMLDivElement>(null);

    const [maxCols, setMaxCols] = useState(5);
    const [maxRows, setMaxRows] = useState(4);

    useEffect(() => {
        if (!containerRef.current) return;

        const { width, height } = containerRef.current.getBoundingClientRect();
        setMaxCols(Math.floor(width / GRID_CELL_WIDTH));
        setMaxRows(Math.floor(height / GRID_CELL_HEIGHT));
    }, []);

    const windowIcons = icons.filter((icon) =>
        icon.scope === "window" && icon.parentWindowId === parentWindowId
    );

    return (
        <div
            className="window-icon-grid"
            style={{ position: "relative", width: maxCols * GRID_CELL_WIDTH, height: maxRows * GRID_CELL_HEIGHT }}
        >
            {windowIcons.length === 0
                ? <p className="window-icon-grid__empty">This folder is empty</p>
                : windowIcons.map((icon) => (
                    <DraggableIcon key={icon.id} icon={icon} maxCols={maxCols} maxRows={maxRows} />
                ))
            }
        </div>
    );

};

export default WindowIconGrid;