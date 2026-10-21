import type { AppIcon } from "../types/Types";

// Add them here if you need to scale the project with more desktop icons
// Note: Change scope to "Window" if the app exists IN a window... freaky
const DESKTOP_ICONS: AppIcon[] = [
    { id: "recycleIcon", label: "Recycle Bin", description: "", iconSrc: "recycle-bin-icon.png", col: 0, row: 0, windowId: "recycleWindow", scope: "desktop", copies: 0 },
    { id: "computerIcon", label: "My Computer", description: "", iconSrc: "computer-icon.png", col: 0, row: 1, windowId: "computerWindow", scope: "desktop", copies: 0 },
    { id: "documentsIcon", label: "Documents", description: "", iconSrc: "document-icon.png", col: 0, row: 2, windowId: "documentsWindow", scope: "desktop", copies: 0 },
    { id: "guideIcon", label: "Start Guide", description: "", iconSrc: "guide-icon.png", col: 0, row: 3, windowId: "guideWindow", scope: "desktop", copies: 0 },

    { id: "resumeIcon", label: "resume.pdf", description: "A copy of my current resume.", iconSrc: "file-icon.png", col: 0, row: 0, windowId: "resumeWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "ceramicsFolderIcon", label: "ceramics", description: "Directory containing my ceramics prototyping, programming, and creations.", iconSrc: "document-icon.png", col: 1, row: 0, windowId: "ceramicsWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "prototypingFolderIcon", label: "prototypes", description: "Directory containing activity development and old prototypes.", iconSrc: "document-icon.png", col: 2, row: 0, windowId: "prototypeWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "cdPlayerFolderIcon", label: "cd-player", description: "Directory containing the build process for a home made cd player.", iconSrc: "document-icon.png", col: 3, row: 0, windowId: "cdPlayerWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "screenPrintingIcon", label: "screen printing", description: "Directory containing my screen prints.", iconSrc: "document-icon.png", col: 4, row: 0, windowId: "screenPrintingWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "feltPaintingIcon", label: "felt painting", description: "Directory containing my felt needle paintings.", iconSrc: "document-icon.png", col: 5, row: 0, windowId: "feltPaintingWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "lowQualityDogsIcon", label: "low-quality-dogs.html", description: "My web app for sharing pet pictures! Note: this icon will open in a new tab.", iconSrc: "manny-favicon.png", col: 6, row: 0, windowId: "feltPaintingWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },

];

export default DESKTOP_ICONS;