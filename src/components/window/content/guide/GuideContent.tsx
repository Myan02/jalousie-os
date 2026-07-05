import { useState } from "react";
import WindowTab from "../../helpers/Tab";
import Divider from "../../helpers/Divider";
import "./GuideContent.css";

const GuideContent = () => {

    const [tab, setTab] = useState<string>("Content");

    const handleTabClick = (newTab: string) => {
        if (newTab === tab) return;

        setTab(newTab);
    };

    return (
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
                    <div className="guide__body-top">
                        <button className={tab == "Content" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Content")}>Content</button>
                        <button className={tab == "Index" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Index")}>Index</button>
                        <button className={tab == "Search" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Search")}>Search</button>
                    </div>
                    <div className="guide__body-sections"></div>
                </div>


                <div className="guide__body-content">

                </div>
            </div>
        </div>
);
};
    
    
export default GuideContent;