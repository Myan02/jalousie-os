import { useState } from "react";
import WindowTab from "../../helpers/Tab";
import Divider from "../../helpers/Divider";
import Label from "../../helpers/Label";
import Welcome from "./welcome/Welcome";
import Background from "./sections/Background";
import Explore from "./sections/Explore";
import Accessibility from "./sections/Accessibility";
import Credits from "./sections/Credits";

import "./GuideContent.css";
import Troubleshooting from "./sections/Troubleshooting";
import Questions from "./sections/Questions";

const GuideContent = () => {

    const [tab, setTab] = useState<string>("Content");          // tab keeps track of the current table tab (content, index, search)
    const [hidden, setHidden] = useState<boolean>(true);
    const [sections, setSections] = useState<string[]>(["1"]);  // sections tracks the user click history and the last item is the one the user is currently seeing
    const [curIndex, setCurIndex] = useState<number>(0);        // curIndex is where ther user is in the section click history

    // On hide button clicked, toggle off the left-hand table
    const handleHideClick = () => {
        setHidden((prev) => !prev);
    };

    // On table tab click, update tab
    const handleTabClick = (newTab: string) => {
        if (newTab === tab) return;

        setTab(newTab);
    };

    // Set the section to view
    const handleNewSectionClick = (e: React.MouseEvent) => {
        const curId = e.currentTarget.id;
        if (curId == sections[curIndex]) return;    // User clicked on the section they are already viewing

        // Reset history in case the user has clicked back arrow
        const newsections = [...sections.slice(0, curIndex + 1), curId];
        setSections(newsections);
        setCurIndex((prev) => prev + 1);
    };

    // User clicks to go back in their history
    const handleBackClick = () => {
        if (curIndex == 0) return;

        setCurIndex((prev) => prev - 1);
    };

    // User clicks to go forward in their history
    const handleForwardClick = () => {
        if (curIndex == sections.length - 1) return;

        setCurIndex((prev) => prev + 1);
    }

    return (
        <div className="guide">
            <div className="guide__header">
                <WindowTab label={hidden ? "Show" : "Hide"} imageSrc={hidden ? "show-icon.png" : "hide-icon.png"} click={handleHideClick} />
                <WindowTab label="Back" imageSrc="left-arrow-icon.png" disabled={Boolean(curIndex == 0)} click={handleBackClick} />
                <WindowTab label="Forward" imageSrc="right-arrow-icon.png" disabled={Boolean(curIndex == sections.length - 1)} click={handleForwardClick} />
                <WindowTab label="Options" imageSrc="options-icon.png" click={() => console.log(sections, curIndex)} />
                <WindowTab label="Web Help" imageSrc="web-help-icon.png" click={() => console.log("clicked")} />
            </div>

            <Divider divType="horizontal" />

            <div className="guide__body">
                {!hidden &&
                    <div className="guide__body-table">
                        <div className="guide__body-top">
                            <button className={tab == "Content" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Content")}>Content</button>
                            <button className={tab == "Index" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Index")}>Index</button>
                            <button className={tab == "Search" ? "guide__body-top__btn guide__body-top__btn-selected" : "guide__body-top__btn"} onClick={() => handleTabClick("Search")}>Search</button>
                        </div>

                        {tab == "Content" && <div className="guide__body-sections">
                            <Label id="1" imageSrc="help-icon.png" label="Welcome to Help" click={handleNewSectionClick} />
                            <Label id="2" imageSrc="copy-icon.png" label="Background" click={handleNewSectionClick} />
                            <Label id="3" imageSrc="computer-icon.png" label="Exploring Your Online Desktop" click={handleNewSectionClick} />
                            <Label id="4" imageSrc="guide-icon.png" label="Accessibility Features" click={handleNewSectionClick} />
                            <Label id="5" imageSrc="guide-icon.png" label="Troubleshooting" click={handleNewSectionClick} />
                            <Label id="6" imageSrc="help-icon.png" label="Infrequently Asked Questions" click={handleNewSectionClick} />
                            <Label id="7" imageSrc="copy-icon.png" label="Credit and Inspirations" click={handleNewSectionClick} />
                        </div>}

                        {tab == "Index" && <div className="guide__body-sections"></div>}

                        {tab == "Search" && <div className="guide__body-sections"></div>}
                    </div>
                }

                <div style={sections[curIndex] == "1"
                    ? {
                        backgroundImage: "url('./src/assets/backdrops/help-backdrop.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left top",
                    }
                    : { backgroundImage: "none" }}
                    className="guide__body-content">
                    {sections[curIndex] == "1" && <Welcome />}
                    {sections[curIndex] == "2" && <Background />}
                    {sections[curIndex] == "3" && <Explore />}
                    {sections[curIndex] == "4" && <Accessibility />}
                    {sections[curIndex] == "5" && <Troubleshooting />}
                    {sections[curIndex] == "6" && <Questions />}
                    {sections[curIndex] == "7" && <Credits />}
                </div>

            </div>
        </div>
    );
};


export default GuideContent;