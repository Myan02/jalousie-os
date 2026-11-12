import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
import Divider from "../../helpers/Divider";
import Dropdown from "../../helpers/Dropdown";
import { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../../../shared/DraggableIcon";
import "./DocumentsContent.css";
import { Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import type { AppIcon } from "../../../../types/Types";

type tabButton = {
    label: string;
    imageSrc: string;
    disabled: boolean;
    show: boolean;
    onClick: () => void;
};

const DocumentsContent = () => {
    const { icons, windows, selectedIcon, selectIcon, createIcon, deleteIcon } = useDragContext();

    const [dropdown, setDropdown] = useState<string | null>(null);
    const [copyBuffer, setCopyBuffer] = useState<{ icon: AppIcon, cutFlag: boolean } | null>(null);

    const [selectedHistory, setSelectedHistory] = useState<AppIcon[]>([]);
    const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number>(-1);

    useEffect(() => {
        const handleOutsideClick = () => {
            setDropdown(null);
        };

        const handleIconClick = (e: PointerEvent) => {
            const target = e.target as HTMLDivElement;
            const iconElement = target.closest(".draggable-icon")

            if (!iconElement) {
                return;
            }

            const iconId = iconElement.getAttribute("data-icon-id")
            if (!iconId) {
                return
            }

            const icon = icons.find((i) => i.id === iconId);

            if (!icon) {
                return;
            }

            if (icon.parentWindowId === "documentsWindow") {

                setSelectedHistory((prev) => {
                    const nextHistory = prev.slice(0, selectedHistoryIndex + 1);
                    return [...nextHistory, icon];
                });
                setSelectedHistoryIndex((prev) => prev + 1);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("click", handleIconClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("click", handleIconClick);
        };
    }, [icons, selectedHistoryIndex]);

    const handleCut = () => {
        if (selectedIcon) {
            setCopyBuffer({ icon: selectedIcon, cutFlag: true });
        }
    };

    const handleCopy = () => {
        if (selectedIcon) {
            setCopyBuffer({ icon: selectedIcon, cutFlag: false });
        }
    };

    const handlePaste = () => {
        if (copyBuffer && copyBuffer.icon.parentWindowId === "documentsWindow") {
            const newIcon = createIcon(copyBuffer.icon);
            const bufferId = copyBuffer.icon.id;

            if (copyBuffer.cutFlag) {
                deleteIcon(bufferId);
            }

            // No more space for an icon
            if (!newIcon) {
                return;
            }

            selectIcon(newIcon.id);
            setCopyBuffer({ icon: newIcon, cutFlag: false });
            setSelectedHistoryIndex(-1);
            setSelectedHistory([]);
        }
    };

    const handleDelete = () => {
        if (selectedIcon && selectedIcon.parentWindowId === "documentsWindow") {
            deleteIcon(selectedIcon.id);
            setSelectedHistoryIndex(-1);
            setSelectedHistory([]);
            selectIcon(undefined);
            setCopyBuffer(null);
        }
    };

    const handleBack = () => {
        if (!selectedIcon) {
            selectIcon(selectedHistory[selectedHistoryIndex]?.id)
            return;
        }

        let newIndex = Math.max(-1, selectedHistoryIndex - 1)
        selectIcon(selectedHistory[newIndex]?.id);
        setSelectedHistoryIndex(newIndex);
    };

    const handleForward = () => {
        let newIndex = Math.min(selectedHistory.length, selectedHistoryIndex + 1);

        if (newIndex == selectedHistory.length) {
            newIndex -= 1;
        }

        selectIcon(selectedHistory[newIndex]?.id);
        setSelectedHistoryIndex(newIndex);
    };

    const window = windows.filter(win => win.id === "documentsWindow");
    const width = window[0].width;
    const height = window[0].height;

    // The left side of the expression calculates the size of the "summary" width based on its flex property
    // the right side of the expression just adds half the width of an icon to add a little padding
    const CONTENT_SUMMARY_WIDTH_OFFSET = ((width - 150) * (1 / 7) + 150) + (GRID_CELL_WIDTH / 2);
    const CONTENT_HEADER_HEIGHT_OFFSET = (height * (1 / 5)) + (GRID_CELL_HEIGHT / 2);

    // Reduce this function to accumulate an array
    // Array will hold the following objects based on whether they
    //      are shown or now depending on the width of the window
    let tabs: tabButton[] = [
        { label: "Back", imageSrc: "left-arrow-icon.png", disabled: selectedHistoryIndex == -1, show: true, onClick: handleBack },
        { label: "Forward", imageSrc: "right-arrow-icon.png", disabled: selectedHistoryIndex == selectedHistory.length - 1, show: true, onClick: handleForward },
        { label: "Up", imageSrc: "up-folder-icon.png", disabled: false, show: true, onClick: () => { } },
        { label: "Cut", imageSrc: "cut-icon.png", disabled: false, show: true, onClick: handleCut },
        { label: "Copy", imageSrc: "copy-icon.png", disabled: false, show: true, onClick: handleCopy },
        { label: "Paste", imageSrc: "paste-icon.png", disabled: false, show: true, onClick: handlePaste },
        { label: "Delete", imageSrc: "delete-icon.png", disabled: false, show: true, onClick: handleDelete },
        { label: "Properties", imageSrc: "properties-icon.png", disabled: false, show: true, onClick: () => { } },
        { label: "Views", imageSrc: "views-icon.png", disabled: false, show: true, onClick: () => { } }
    ].reduce((acc: tabButton[], tab, index) => {

        if (width < (64 * (index + 1)) + 85) {
            tab.show = false;
        }

        acc.push(tab);
        return acc;
    }, []);

    const hiddenTabs = tabs.filter((tab) => !tab.show);

    return (
        <div className="documents">
            <div className="documents__header">
                <div className="documents__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 42px", marginLeft: "4px" }} label="File" />
                    <Tab style={{ flex: "0 0 48px" }} label="Edit" />
                    <Tab style={{ flex: "0 0 48px" }} label="View" />
                    <Tab style={{ flex: "0 0 36px" }} label="Go" />
                    <Tab style={{ flex: "0 0 72px" }} label="Favorites" />
                    <Tab style={{ flex: "0 0 48px" }} label="Help" />
                </div>

                <Divider divType="horizontal" />

                <div className="documents__header-tabs__container">
                    <Divider divType="thick" />
                    <div className="documents__header-tabs">
                        <span style={{ margin: "4px" }}></span>

                        {tabs.map((tab, index) => {
                            return tab.show && (index % 3 === 2 ?
                                <Fragment key={index}>
                                    <Tab key={tab.label} label={tab.label} imageSrc={tab.imageSrc} disabled={tab.disabled} click={tab.onClick} />
                                    <Divider key={-index} divType="vertical" />
                                </ Fragment> :
                                <Tab key={tab.label} label={tab.label} imageSrc={tab.imageSrc} disabled={tab.disabled} click={tab.onClick} />
                            )
                        })}

                        {
                            hiddenTabs.length > 0 &&
                            <Tab
                                label=">"
                                style={{ maxWidth: "24px", marginLeft: "auto", fontSize: "2px" }}
                                click={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    dropdown === null ? setDropdown("main") : setDropdown(null);
                                }}
                            />
                        }

                        {
                            dropdown === "main" && <Dropdown>
                                {hiddenTabs.map((tab) => {
                                    return <Tab key={tab.label} label={tab.label} imageSrc={tab.imageSrc} click={tab.onClick} style={{ flex: "0 0 24px", flexDirection: "row", justifyContent: "flex-start", zIndex: "999" }} />
                                })}
                            </ Dropdown>
                        }

                    </div>
                </div>
            </div>

            <div className="documents__body">
                <div className="documents__body-summary">
                    <img style={{ maxWidth: "48px", margin: "24px 0 24px 24px" }} src="./src/assets/icons/document-icon.png" alt="Documents Image" />
                    <h1 style={{ margin: "0 0 12px 24px" }}>My Documents </h1>
                    <div className="documents__body-summary__color-lines">
                        <div style={{ border: "1px solid #ff0000", width: "100%" }} />
                        <div style={{ border: "1px solid #ffff00", width: "100%" }} />
                        <span style={{ border: "1px solid #00ff00", width: "100%" }} />
                        <span style={{ border: "1px solid #00ffff", width: "100%" }} />
                    </div>
                    <div style={{ margin: "12px 12px 36px 24px" }}>
                        {selectedIcon?.parentWindowId === "documentsWindow"
                            ? <div> <span style={{ fontFamily: "MS Sans Serif Bold" }}>{selectedIcon.label}</span> <br />  {selectedIcon.description} </div>
                            : <p>Select an item to view its description</p>
                        }
                    </div>
                </div>

                <div className="documents__body-icons" >
                    <WindowIconGrid
                        parentWindowId="documentsWindow"
                        parentWidth={width - CONTENT_SUMMARY_WIDTH_OFFSET}
                        parentHeight={height - CONTENT_HEADER_HEIGHT_OFFSET}
                    />
                </div>
            </div>

            <div className="documents__footer">

            </div>
        </div>
    );
};

export default DocumentsContent;