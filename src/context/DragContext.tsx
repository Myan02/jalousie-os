/** This context provides info about all app and window icons
 *  and their methods to every component in the entire project
 */

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { AppIcon, AppWindow } from "../types";

// These are all of the desktop icons
// Add them here if you need to scale the project with more desktop icons
// Note: Change scope to "Window" if the app exists IN a window... freaky
const DESKTOP_ICONS: AppIcon[] = [
    { id: "recycleIcon", label: "Recycle Bin", iconSrc: "recycle-bin-icon.png", col: 0, row: 0, windowId: "recycleWindow", scope: "desktop", },
    { id: "computerIcon", label: "My Computer", iconSrc: "computer-icon.png", col: 0, row: 1, windowId: "computerWindow", scope: "desktop" },
    { id: "documentsIcon", label: "Documents", iconSrc: "document-icon.png", col: 0, row: 2, windowId: "documentsWindow", scope: "desktop" },
    { id: "guideIcon", label: "Start Guide", iconSrc: "guide-icon.png", col: 0, row: 3, windowId: "guideWindow", scope: "desktop" }
];

// The shape of the context
type DragContextType = {
    icons: AppIcon[];
    windows: AppWindow[];

    moveIcon: (iconId: string, newCol: number, newRow: number) => void;
    openWindow: (iconId: string) => void;
    closeWindow: (windowId: string) => void;
    minimizeWindow: (windowId: string) => void;
    focusWindow: (windowId: string) => void;
    moveWindow: (windowId: string, newX: number, newY: number) => void;
};

// Actual context declaration
const DragContext = createContext<DragContextType | null>(null);

// Context implementation, again provide all components with the icons, windows, and their methods
export const DragProvider = ({ children }: { children: ReactNode }) => {

    // Track the current icons
    const [icons, setIcons] = useState<AppIcon[]>(DESKTOP_ICONS);

    // Track the current windows + add the guide on startup
    const [windows, setWindows] = useState<AppWindow[]>([{
        id: "guideWindow",
        title: "Start Guide",
        windowSrc: "guide-icon.png",

        // Center of the window; get the top left corner of the window in the center of the browser and offset in by half of the size of the window
        x: (window.innerWidth / 2) - ((window.innerWidth / 3) / 2),
        y: (window.innerHeight / 2) - ((window.innerHeight / 1.875) / 2),
        width: window.innerWidth / 3,
        height: window.innerHeight / 1.875,

        zIndex: 1,
        minimized: false,
    }]);

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

    // Open a window when an icon is double clicked
    const openWindow = (iconId: string) => {
        const icon = icons.find((i) => i.id === iconId);    // Find the icon using the id
        if (!icon) return;

        const alreadyOpen = windows.find((w) => w.id === icon.windowId);    // Check if the window is already open
        if (alreadyOpen) {
            focusWindow(icon.windowId);
            return;
        };

        // add the window to the open window state
        setWindows((prev) => [...prev, {
            id: icon.windowId,
            title: icon.label,
            windowSrc: icon.iconSrc,
            x: (window.innerWidth / 2) - ((window.innerWidth / 3) / 2),
            y: (window.innerHeight / 2) - ((window.innerHeight / 1.875) / 2),
            width: window.innerWidth / 3,
            height: window.innerHeight / 1.875,
            zIndex: getNextZ(),
            minimized: false,
        }]);
    };

    // Remove window from window state by id
    const closeWindow = (windowId: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== windowId));
    };

    // Set the minimized state of a window to the value inverse
    const minimizeWindow = (windowId: string) => {
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, minimized: !w.minimized } : w)
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

    return (
        <DragContext.Provider value={{
            icons,
            windows,
            moveIcon,
            openWindow,
            closeWindow,
            minimizeWindow,
            focusWindow,
            moveWindow
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

