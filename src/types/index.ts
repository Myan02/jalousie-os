/** All items shared by entire app
 * 
 * Gotta have these accessible at all times guys
 */


export type AppIcon = {
    id: string;         
    label: string;
    iconSrc: string;    // Find icon in src/assets

    // Grid position on the desktop
    row: number;    
    col: number;

    windowId: string;               // Basically a foreign ID key for the Window, connects app icons to the window they open
    scope: "desktop" | "window";    // Desktop: icon lives on the desktop; Window: icon is in a window
    parentWindowId?: string;        // Optional: only required if icon lives in a window
};

export type AppWindow = {
    id: string;
    title: string;
    windowSrc: string;  // Find icon in src/assets

    x: number;          // Initial X pos
    y: number;          // Initial Y pos
    width: number;      // Initial window width
    height: number;     // Initial window height
    zIndex: number;     // Higher Z-index shows up over other windows
    scaleState: "minimized" | "maximized" | "neutral"; 
};