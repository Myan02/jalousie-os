import Divider from "../../helpers/Divider";
import Tab from "../../helpers/Tab";
import "./DogsContent.css";

const DogsContent = () => {

    const WEBSITE = "https://low-quality-dogs.org"

    const handleNewTab = () => {
        const link = document.createElement('a');
        link.href = String(WEBSITE);
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="dogs">
            <div className="dogs__header">
                <div className="dogs__header-dropdowns">
                    <Divider divType="thick" />
                    <Tab style={{ flex: "0 0 128px", marginLeft: "4px" }} label="Open in a new tab" click={handleNewTab}></Tab>
                </div>
            </div>

            <div className="dogs__body">
                <iframe src={WEBSITE}
                    title="test"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                />
            </div>

            <div className="dogs__footer"></div>
        </div>
    );
};

export default DogsContent;