/** This context provides info about all app and window icons
 *  and their methods to every component in the entire project
 */

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../components/shared/DraggableIcon";
import type { AppIcon, AppWindow } from "../types/Types";
import DESKTOP_ICONS from "./Icons";

// The shape of the context
type DragContextType = {
    icons: AppIcon[];
    windows: AppWindow[];
    selectedIcon: AppIcon | undefined;

    moveIcon: (iconId: string, newCol: number, newRow: number) => void;
    selectIcon: (iconId: string | undefined) => void;
    createIcon: (icon: AppIcon) => AppIcon | null;
    deleteIcon: (iconId: string) => void;
    deleteAllIcons: () => void;

    openWindow: (iconId: string) => void;
    closeWindow: (windowId: string) => void;
    minimizeWindow: (windowId: string) => void;
    focusWindow: (windowId: string) => void;
    moveWindow: (windowId: string, newX: number, newY: number) => void;
    scaleWindow: (windowId: string, newWidth: number, newHeight: number, newScaleState?: "maximized" | "neutral") => void;
};

// Actual context declaration
const DragContext = createContext<DragContextType | null>(null);

// Context implementation, again provide all components with the icons, windows, and their methods
export const DragProvider = ({ children }: { children: ReactNode }) => {

    // Track the current icons
    const [icons, setIcons] = useState<AppIcon[]>(DESKTOP_ICONS);

    // Track the icon that the user single clicked on
    const [selectedIcon, setSelectedIcon] = useState<AppIcon | undefined>(undefined);

    // Track the current windows + add the guide on startup
    const [windows, setWindows] = useState<AppWindow[]>([{
        id: "guideWindow",
        title: "Start Guide",
        windowSrc: "guide-icon.png",

        // Center of the window; get the top left corner of the window in the center of the browser and offset in by half of the size of the window
        x: Math.max(0, (window.innerWidth - (Math.min(Math.max(window.innerWidth / 3, 300), window.innerWidth - 24))) / 2),
        y: Math.max(0, (window.innerHeight - (Math.min(Math.max(window.innerHeight / 1.875, 200), window.innerHeight - 48))) / 2),
        width: Math.min(Math.max(window.innerWidth / 3, 300), window.innerWidth - 24),
        height: Math.min(Math.max(window.innerHeight / 1.875, 200), window.innerHeight - 48),

        zIndex: 1,
        minimized: false,
        scaleState: "neutral",
    }]);

    console.log({
        innerWidth: window.innerWidth,
        clientWidth: document.documentElement.clientWidth,
        visualWidth: window.visualViewport?.width
    })

    // Global z index value for all windows
    const [nextZ, setNextZ] = useState(10);

    // Helpful to write the method like this when setting the global z state AND updating a window z value
    const getNextZ = () => {
        setNextZ((prev) => prev + 1);
        return nextZ;
    };

    // Move a icon by iconID to a new grid cell 
    const moveIcon = (iconId: string, newCol: number, newRow: number) => {
        setIcons((prev) =>
            prev.map((icon) => icon.id === iconId ? { ...icon, col: newCol, row: newRow } : icon)
        );
    };

    // Set the selected icon or set to undefined if the user clicked somewhere else
    const selectIcon = (iconId: string | undefined) => {
        if (iconId === undefined) {
            setSelectedIcon(undefined);
            return;
        }

        const icon = icons.find(i => i.id === iconId);
        setSelectedIcon(icon);
    };

    // Add an icon to the array of icons
    const createIcon = (icon: AppIcon) => {
        const baseId = icon.id.replace(/_\d+$/, "");
        const nextCopyNumber = icon.copies + 1;
        const newIconId = `${baseId}_${nextCopyNumber}`;

        const parentWindowId = icon.parentWindowId ?? icon.windowId;
        const parentWin = windows.find((win) => win.id === parentWindowId);

        const CONTENT_SUMMARY_WIDTH_OFFSET = parentWin ? ((parentWin.width - 150) * (1 / 7) + 150) + (GRID_CELL_WIDTH / 2) : 0;
        const CONTENT_HEADER_HEIGHT_OFFSET = parentWin ? (parentWin.height * (1 / 5)) + (GRID_CELL_HEIGHT / 2) : 0;
        const maxCols = parentWin ? Math.floor((parentWin.width - CONTENT_SUMMARY_WIDTH_OFFSET) / GRID_CELL_WIDTH) : 1;
        const maxRows = parentWin ? Math.floor((parentWin.height - CONTENT_HEADER_HEIGHT_OFFSET) / GRID_CELL_HEIGHT) : 1;

        const occupiedPositions = new Set(
            icons
                .filter((item) =>
                    item.parentWindowId === icon.parentWindowId &&
                    item.scope === icon.scope
                )
                .map((item) => `${item.row},${item.col}`)
        );

        let newRow = 0;
        let newCol = 0;
        let foundEmptySlot = false;

        for (let row = 0; row < maxRows; row++) {
            for (let col = 0; col < maxCols; col++) {
                const positionKey = `${row},${col}`;

                if (!occupiedPositions.has(positionKey)) {
                    newRow = row;
                    newCol = col;
                    foundEmptySlot = true;
                    break;
                }
            }

            if (foundEmptySlot) {
                break;
            }
        }

        if (!foundEmptySlot) {
            return null;
        }

        const updatedIcons = icons.map((item) => {
            const isSameIconFamily = item.id === baseId || item.id.startsWith(`${baseId}_`);

            if (!isSameIconFamily) {
                return item;
            }

            return {
                ...item,
                copies: Math.max(item.copies, nextCopyNumber),
            };
        });

        const newIcon: AppIcon = {
            ...icon,
            id: newIconId,
            copies: nextCopyNumber,
            row: newRow,
            col: newCol,
        };

        setIcons([...updatedIcons, newIcon]);

        return newIcon;
    };

    // Remove an icon from the array of icons
    const deleteIcon = (iconId: string) => {
        const icon = icons.find((i) => i.id === iconId);

        if (icon) {

            if (icon.parentWindowId === "recycleWindow") {
                setIcons((prev) => prev.filter((icon) => icon.id !== iconId));
                return;
            }

            const newIcons = icons.map((i) => i.id === icon.id ? { ...i, parentWindowId: "recycleWindow" } : i)
            setIcons(newIcons);
        }
    };

    // Remove all icons from the recycle bin
    const deleteAllIcons = () => {
        const newIcons = icons.filter((i) => i.parentWindowId !== "recycleWindow");
        setIcons(newIcons);
    }

    // Open a window when an icon is double clicked
    const openWindow = (iconId: string) => {
        const icon = icons.find((i) => i.id === iconId);    // Find the icon using the id
        if (!icon) return;

        const alreadyOpen = windows.find((w) => w.id === icon.windowId);    // Check if the window is already open
        if (alreadyOpen) {
            focusWindow(icon.windowId);
            return;
        };

        // Use the number of open windows to determine new window offset so windows don't open on top of eachother
        const numOpenWindows: number = windows.length;
        const WIN_POS_OFFSET: number = 15;

        // add the window to the open window state
        setWindows((prev) => [...prev, {
            id: icon.windowId,
            title: icon.label,
            windowSrc: icon.iconSrc,
            x: Math.max(0, (window.innerWidth - (Math.min(Math.max(window.innerWidth / 3, 300), window.innerWidth - 24))) / 2) + (numOpenWindows * WIN_POS_OFFSET),
            y: Math.max(0, (window.innerHeight - (Math.min(Math.max(window.innerHeight / 1.875, 200), window.innerHeight - 48))) / 2) + (numOpenWindows * WIN_POS_OFFSET),
            width: Math.min(Math.max(window.innerWidth / 3, 300), window.innerWidth - 24),
            height: Math.min(Math.max(window.innerHeight / 1.875, 200), window.innerHeight - 48),
            zIndex: getNextZ(),
            minimized: false,
            scaleState: "neutral",
        }]);
    };

    // Remove window from window state by id
    const closeWindow = (windowId: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== windowId));
    };

    // Set the minimized state of a window to the value inverse
    const minimizeWindow = (windowId: string) => {
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, minimized: true } : w)
        );
    };

    // Update the z value of the window and set minimized to false
    const focusWindow = (windowId: string) => {
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, zIndex: getNextZ(), minimized: false } : w)
        );
    };

    // Same as move icon but with a window's positional x and y value
    const moveWindow = (windowId: string, newX: number, newY: number) => {
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, x: newX, y: newY } : w)
        );
    };

    // Change window size based on a new width and height
    const scaleWindow = (windowId: string, newWidth: number, newHeight: number, newScaleState?: "maximized" | "neutral") => {
        if (newScaleState) {
            setWindows((prev) =>
                prev.map((w) => w.id === windowId ? { ...w, width: newWidth, height: newHeight - 32, scaleState: newScaleState } : w)
            );
        } else {
            setWindows((prev) =>
                prev.map((w) => w.id === windowId ? { ...w, width: newWidth, height: newHeight - 32 } : w)
            );
        }
    };

    return (
        <DragContext.Provider value={{
            icons,
            windows,
            selectedIcon,
            moveIcon,
            selectIcon,
            createIcon,
            deleteIcon,
            deleteAllIcons,
            openWindow,
            closeWindow,
            minimizeWindow,
            focusWindow,
            moveWindow,
            scaleWindow
        }}>
            {children}
        </DragContext.Provider>
    );
};

// Custom hook to wrap components that are icons (draggable and with windows)
export const useDragContext = () => {
    const context = useContext(DragContext);
    if (context == null) throw new Error("Drag context is null...");
    return context;
};

