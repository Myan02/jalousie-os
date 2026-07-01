// All types shared by entire app

export type AppIcon = {
    id: string;         
    label: string;
    iconSrc: string;    // Find src in src/assets

    row: number;
    col: number;
    windowId: string;

    scope: "desktop" | "window";    // Desktop: icon lives on the desktop; Window: icon is in a window
    parentWindowId?: string;        // Optional: only required if icon lives in a window
};

export type AppWindow = {
    id: string;
    title: string;
    windowSrc: string;  // Find src in src/assets

    x: number;          // Initial X pos
    y: number;          // Initial Y pos
    width: number;
    height: number;
    zIndex: number;     // Higher Z-index shows up over other windows
    minimized: boolean;
};