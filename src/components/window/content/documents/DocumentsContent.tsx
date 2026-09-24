import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
// import Label from "../../helpers/Label";
import Divider from "../../helpers/Divider";
import "./DocumentsContent.css";

const DocumentsContent = () => {
    const { windows } = useDragContext();

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

            <div className="documents__body">
                {/* <div className="documents__body-summary">
                    meow
                </div> */}

                <div className="documents__body-icons" >
                    <WindowIconGrid
                        parentWindowId="documentsWindow"
                        parentWidth={width}
                        parentHeight={height}
                    />
                </div>

            </div>



            <div className="documents__footer">

            </div>
        </div>
    );
};

export default DocumentsContent;