import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { AppIcon, AppWindow } from "../types";

// Metadata on desktop icons
const DESKTOP_ICONS: AppIcon[] = [
    { id: "recycleIcon", label: "Recycle Bin", iconSrc: "recycle-bin-icon.png", col: 0, row: 0, windowId: "recycleWindow", scope: "desktop", },
    { id: "computerIcon", label: "My Computer", iconSrc: "computer-icon.png", col: 0, row: 1, windowId: "computerWindow", scope: "desktop" },
    { id: "documentsIcon", label: "Documents", iconSrc: "document-icon.png", col: 0, row: 2, windowId: "documentsWindow", scope: "desktop" },
    { id: "guideIcon", label: "Start Guide", iconSrc: "guide-icon.png", col: 0, row: 3, windowId: "guideWindow", scope: "desktop" }
];

// Context type shape
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
const DragContext = createContext<DragContextType | undefined>(undefined);

// Context implementation, wrap ANY icon with DragContext to make it draggable and with a window
export const DragProvider = ({ children }: { children: ReactNode }) => {
    const [icons, setIcons] = useState<AppIcon[]>(DESKTOP_ICONS);   // Track the current icons
    const [windows, setWindows] = useState<AppWindow[]>([]);        // Track the current windows
    const [nextZ, setNextZ] = useState(10);                         // Global z index value

    // This function increments the global z index when called and returns it
    const getNextZ = () => {
        const z = nextZ;
        setNextZ((prev) => prev + 1);
        return z;
    };

    const moveIcon = (iconId: string, newCol: number, newRow: number) => {
        setIcons((prev) =>
            prev.map((icon) => icon.id === iconId ? { ...icon, col: newCol, row: newRow } : icon)
        );
    };

    const openWindow = (iconId: string) => {
        const icon = icons.find((i) => i.id === iconId);    // Find the icon using the id
        if (!icon) return;

        const alreadyOpen = windows.find((w) => w.id === icon.windowId);    // Check if the window is already open
        if (alreadyOpen) {
            focusWindow(icon.windowId);
            return;
        };

        setWindows((prev) => [...prev, {
            id: icon.windowId,
            title: icon.label,
            windowSrc: icon.iconSrc,
            x: window.innerWidth / 2 - 300,
            y: window.innerHeight / 2 - 200,
            width: 600,     // default 600
            height: 500,    // default 500
            zIndex: getNextZ(),
            minimized: false,
        }]);
    };

    const closeWindow = (windowId: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== windowId));
    };

    const minimizeWindow = (windowId: string) => {
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, minimized: !w.minimized } : w)
        );
    };

    const focusWindow = (windowId: string) => {
        const z = getNextZ();
        setWindows((prev) =>
            prev.map((w) => w.id === windowId ? { ...w, zIndex: z, minimized: false } : w)
        );
    };

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

// Custome hook to wrap components that are icons (draggable and with windows)
export const useDragContext = () => {
    const context = useContext(DragContext);
    if (!context) throw new Error("useDragContext must be in <DragProvider>");
    return context;
};

