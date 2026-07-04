import WindowTab from "../../helpers/Tab";
import Divider from "../../helpers/Divider";
import "./GuideContent.css";

const GuideContent = () => (
    <div className="guide">
        <div className="guide__header">
            <WindowTab label="Hide" imageSrc="hide-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Back" imageSrc="left-arrow-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Forward" imageSrc="right-arrow-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Options" imageSrc="options-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Web Help" imageSrc="web-help-icon.png" click={() => console.log("clicked")} />
        </div>

        <Divider divType="Horizontal" />

        <div className="guide__body">
            <div className="guide__body-table">
            </div>

            <div className="guide__body-content">

            </div>
        </div>
    </div>
);
export default GuideContent;