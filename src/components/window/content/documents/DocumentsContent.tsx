import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
import Label from "../../helpers/Label";
import Divider from "../../helpers/Divider";
import "./DocumentsContent.css";
import { useLayoutEffect, useRef, useState } from "react";

const DocumentsContent = () => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<object>({ width: 0, height: 0 });

    useLayoutEffect(() => {

        if (windowRef.current) {
            const { width, height } = windowRef.current.getBoundingClientRect();

            setDimensions({ width, height });
        }
    }, []);

    console.log(dimensions)



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

                <div ref={windowRef} className="documents__header-tabs">
                    <Divider divType="thick" />
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
                    <Tab label="Views" imageSrc="views-icon.png" />



                </div>
            </div>

            <div className="documents__body">
                <div className="documents__body-summary">

                </div>

                <div className="documents__body-icons">

                </div>
            </div>

            <div className="documents__footer">

            </div>
        </div>
    );
};

export default DocumentsContent;