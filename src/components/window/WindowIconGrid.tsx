import { useDragContext } from "../../context/DragContext";
import DraggableIcon, { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../shared/DraggableIcon";
import { useRef, useEffect } from "react";
import "./WindowGridIcon.css";

const FIRST_ROW: number = 0;

interface props {
    parentWindowId: string;
    parentWidth: number;
    parentHeight: number;
}

const WindowIconGrid = ({ parentWindowId, parentWidth, parentHeight }: props) => {
    const { icons, selectIcon, moveIcon } = useDragContext();
    const containerRef = useRef<HTMLDivElement>(null);

    // The left side of the expression calculates the size of the "summary" width based on its flex property
    // the right side of the expression just adds half the width of an icon to add a little padding
    const CONTENT_SUMMARY_OFFSET = ((parentWidth - 150) * (1 / 7) + 150) + (GRID_CELL_WIDTH / 2);

    const maxCols = Math.floor((parentWidth - CONTENT_SUMMARY_OFFSET) / GRID_CELL_WIDTH);
    const maxRows = Math.floor(parentHeight / GRID_CELL_HEIGHT);

    const windowIcons = icons.filter((icon) =>
        icon.scope === "window" && icon.parentWindowId === parentWindowId
    ).map((icon, index) => (icon.col >= maxCols || icon.row >= maxRows) ? { ...icon, col: index, row: FIRST_ROW } : icon);

    // Reset the position of icons upon rerender
    useEffect(() => {
        windowIcons.forEach((icon, index) => moveIcon(icon.id, index, FIRST_ROW));
    }, [containerRef])

    /**
     * Unselect Icon when clicking outside of an icon in the grid space
     * 
     * @param e : click event
     */
    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (e.target === containerRef.current) {
            selectIcon(undefined);
        }
    }

    return (
        <div
            className="window-icon-grid"
            ref={containerRef}
            onClick={handleGridClick}
            onDragStart={e => e.stopPropagation()}
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