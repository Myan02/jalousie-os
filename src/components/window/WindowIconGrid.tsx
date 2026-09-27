import { useDragContext } from "../../context/DragContext";
import DraggableIcon, { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../shared/DraggableIcon";
import { useRef } from "react";
import "./WindowGridIcon.css";

interface props {
    parentWindowId: string;
    parentWidth: number;
    parentHeight: number;
}

const WindowIconGrid = ({ parentWindowId, parentWidth, parentHeight }: props) => {
    const { icons, selectIcon } = useDragContext();

    const containerRef = useRef<HTMLDivElement>(null);

    const maxCols = Math.floor(parentWidth / GRID_CELL_WIDTH);
    const maxRows = Math.floor(parentHeight / GRID_CELL_HEIGHT);

    const windowIcons = icons.filter((icon) =>
        icon.scope === "window" && icon.parentWindowId === parentWindowId
    );

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