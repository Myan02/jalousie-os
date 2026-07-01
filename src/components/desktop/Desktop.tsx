import { useDragContext } from "../../context/DragContext";
import DraggableIcon, { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../shared/DraggableIcon";
import "./Desktop.css";

const Desktop = () => {
    // Only retrieve desktop icons hence the filter
    const { icons } = useDragContext();
    const desktopIcons = icons.filter((icon) => icon.scope === "desktop");

    const maxCols = Math.floor(window.innerWidth / GRID_CELL_WIDTH);
    const maxRows = Math.floor((window.innerHeight - 32) / GRID_CELL_HEIGHT);   // Subtract 32 to account for taskbar height

    return (
        <div className="desktop">
            {desktopIcons.map((icon) => (
                <DraggableIcon
                    key={icon.id}
                    icon={icon}
                    maxCols={maxCols}
                    maxRows={maxRows}
                />
            ))}
        </div>
    );
};

export default Desktop;