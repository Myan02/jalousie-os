import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
import Label from "../../helpers/Label";
import Divider from "../../helpers/Divider";
import "./DocumentsContent.css";

const DocumentsContent = () => {
    return (
        <div className="documents">
            <div className="documents__header">
                <div className="documents__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 48px" }} label="File" />
                    <Tab label="Edit" />
                    <Tab label="View" />
                    <Tab label="Go" />
                    <Tab label="Favorites" />
                    <Tab label="Help" />
                </div>

                <Divider divType="horizontal" />

                <div className="documents__header-tabs">

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