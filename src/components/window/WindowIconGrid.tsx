/**
 * TL;DR a canvas component that displays any icons
 * 
 * Use this component to create a canvas that will take any icons and display them 
 * in a grid pattern. Must provide parent window and size to get the number of 
 * allowable icon rows and cols.
 * 
 * Use the icon type and parent window id to filter out specific icons you
 * would like to display.
 */

import { useDragContext } from "../../context/DragContext";
import DraggableIcon, { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../shared/DraggableIcon";
import { useRef, useEffect } from "react";
import "./WindowGridIcon.css";
import type { AppIcon } from "../../types/Types";

const FIRST_ROW: number = 0;

interface props {
    parentWindowId: string;     /* Important: lets us filter specific icons to show */
    parentWidth: number;
    parentHeight: number;
}

const WindowIconGrid = ({ parentWindowId, parentWidth, parentHeight }: props) => {
    const { icons, selectIcon, moveIcon } = useDragContext();
    const containerRef = useRef<HTMLDivElement>(null);  /* Keeps track of the grid size */

    /* Max cols and rows changes based on parent window size */
    const maxCols = Math.floor(parentWidth / GRID_CELL_WIDTH);
    const maxRows = Math.floor(parentHeight / GRID_CELL_HEIGHT);
    let curRow = 1; // Start at the second row when updating locations
    let curCol = 0

    /* Grab the proper window icons and reset their positions on window scale */
    let windowIcons = icons.filter((icon) =>
        icon.scope === "window" && icon.parentWindowId === parentWindowId
    )
        .reduce((acc: AppIcon[], icon) => {

            /* Icons are OUT of bounds */
            if (icon.col >= maxCols) {
                if (curCol >= maxCols) {
                    curCol = 0
                    curRow += 1
                }

                acc.push({ ...icon, row: curRow, col: curCol })
                curCol += 1
            }

            /* Icons are IN bounds, do not modify */
            else {
                acc.push(icon);
            }

            return acc;
        }, []);

    /* Reset the position of icons upon rerender */
    useEffect(() => {
        windowIcons.forEach((icon, index) => moveIcon(icon.id, index, FIRST_ROW));
    }, [containerRef]);

    /**
     * Unselect Icon when clicking outside of an icon in the grid space
     * 
     * @param e : mouse click event
     */
    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
                ? <h1 className="window-icon-grid__empty">There's nothing here...</h1>
                : windowIcons.map((icon) => (
                    <DraggableIcon key={icon.id} icon={icon} maxCols={maxCols} maxRows={maxRows} />
                ))
            }
        </div>
    );
};

export default WindowIconGrid;