import { useDragContext } from "../../../../context/DragContext";
import { useRef } from "react";
import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
// import Label from "../../helpers/Label";
import Divider from "../../helpers/Divider";
import "./DocumentsContent.css";

const DocumentsContent = () => {
    const { windows, selectedIcon } = useDragContext();
    const contentRef = useRef<HTMLDivElement>(null);

    const dimensions = windows.filter(win => win.id === "documentsWindow");
    const width = dimensions[0].width;
    const height = dimensions[0].height;

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
                        <Tab style={{ marginLeft: "4px" }} label="Back" imageSrc="left-arrow-icon.png" disabled />
                        <Tab label="Forward" imageSrc="right-arrow-icon.png" disabled />
                        <Tab label="Up" imageSrc="up-folder-icon.png" />
                        <Divider divType="vertical" />
                        <Tab label="Cut" imageSrc="cut-icon.png" />
                        <Tab label="Copy" imageSrc="copy-icon.png" />
                        <Tab label="Paste" imageSrc="paste-icon.png" />
                        <Divider divType="vertical" />
                        <Tab label="Delete" imageSrc="delete-icon.png" />
                        <Tab label="Properties" imageSrc="properties-icon.png" />
                        <Divider divType="vertical" />
                        <Tab label="Views" imageSrc="views-icon.png" />
                    </div>
                </div>
            </div>

            <div className="documents__body" ref={contentRef}>
                <div className="documents__body-summary">
                    <img style={{ maxWidth: "48px", margin: "24px 0 24px 24px" }} src="./src/assets/icons/document-icon.png" alt="Documents Image" />
                    <h1 style={{ margin: "0 0 12px 24px" }}>My Documents </h1>
                    <div className="documents__body-summary__color-lines">
                        <div style={{ border: "1px solid #ff0000", width: "100%" }} />
                        <div style={{ border: "1px solid #ffff00", width: "100%" }} />
                        <span style={{ border: "1px solid #00ff00", width: "100%" }} />
                        <span style={{ border: "1px solid #00ffff", width: "100%" }} />
                    </div>
                    {selectedIcon?.parentWindowId === "documentsWindow" && <div> {
                        selectedIcon.id
                    }
                    </div>}
                </div>

                <div className="documents__body-icons" >
                    <WindowIconGrid
                        parentWindowId="documentsWindow"
                        parentWidth={width}
                        parentHeight={contentRef.current ? contentRef.current.clientHeight : height}
                    />
                </div>
            </div>

            <div className="documents__footer">

            </div>
        </div>
    );
};

export default DocumentsContent;