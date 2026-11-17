import Divider from "../../helpers/Divider";
import Tab from "../../helpers/Tab";
import "./ResumeContent.css";
import RESUME from "/src/assets/documents/resume_michael_baburyan.pdf";

const ResumeContent = () => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = RESUME
        link.download = "my resume"

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpen = () => {
        const link = document.createElement('a');
        link.href = String(RESUME);
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="resume">
            <div className="resume__header">
                <div className="resume__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 112px", marginLeft: "4px" }} label="Open in a new tab" click={handleOpen}></Tab>
                    <Tab style={{ flex: "0 0 72px", marginLeft: "4px" }} label="Download" click={handleDownload}></Tab>
                </div>
            </div>

            <div className="resume__body">
                <object
                    data={RESUME}
                    type="application/pdf"
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none" }}
                >
                    <a href={RESUME} target="_blank">Download my resume!</a>
                </object>
            </div>

            <div className="resume__footer"></div>
        </div>

    );
};

export default ResumeContent;