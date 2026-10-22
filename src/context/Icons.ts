import type { AppIcon } from "../types/Types";

// Add them here if you need to scale the project with more desktop icons
// Note: Change scope to "Window" if the app exists IN a window... freaky
const DESKTOP_ICONS: AppIcon[] = [
    { id: "recycleIcon", label: "Recycle Bin", description: "", iconSrc: "recycle-bin-icon.png", col: 0, row: 0, windowId: "recycleWindow", scope: "desktop", copies: 0 },
    { id: "computerIcon", label: "My Computer", description: "", iconSrc: "computer-icon.png", col: 0, row: 1, windowId: "computerWindow", scope: "desktop", copies: 0 },
    { id: "documentsIcon", label: "Documents", description: "", iconSrc: "document-icon.png", col: 0, row: 2, windowId: "documentsWindow", scope: "desktop", copies: 0 },
    { id: "guideIcon", label: "Start Guide", description: "", iconSrc: "guide-icon.png", col: 0, row: 3, windowId: "guideWindow", scope: "desktop", copies: 0 },

    { id: "resumeIcon", label: "resume.pdf", description: "A copy of my current resume.", iconSrc: "file-icon.png", col: 0, row: 0, windowId: "resumeWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "ceramicsIcon", label: "ceramics", description: "Ceramics creations including custom glazes and maker firings.", iconSrc: "document-icon.png", col: 1, row: 0, windowId: "ceramicsWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "workshopsIcon", label: "workshops", description: "Workshop and program ideas, testing, development, and operations.", iconSrc: "document-icon.png", col: 2, row: 0, windowId: "workshopsWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "cdPlayerIcon", label: "cd-player", description: "Custom CD player processes.", iconSrc: "document-icon.png", col: 3, row: 0, windowId: "cdPlayerWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "lowQualityDogsIcon", label: "low-quality-dogs.html", description: "My web app for sharing pet pictures! Note: this icon will open in a new tab.", iconSrc: "manny-favicon.png", col: 4, row: 0, windowId: "lowQualityDogsIcon", scope: "window", parentWindowId: "documentsWindow", copies: 0 },
    { id: "subwayFilesIcon", label: "NYC subway files", description: "Download 3D files of subway station parts I built in Blender.", iconSrc: "document-icon.png", col: 5, row: 0, windowId: "subwayFilesWindow", scope: "window", parentWindowId: "documentsWindow", copies: 0 },


];

export default DESKTOP_ICONS;