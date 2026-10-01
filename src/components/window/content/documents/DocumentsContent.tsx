import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
// import Label from "../../helpers/Label";
import Divider from "../../helpers/Divider";
import "./DocumentsContent.css";
import { GRID_CELL_HEIGHT, GRID_CELL_WIDTH } from "../../../shared/DraggableIcon";


const DocumentsContent = () => {
    const { windows, selectedIcon } = useDragContext();

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
    let tabs: { label: string, imageSrc: string, disabled: boolean, show: boolean }[] = [
        { label: "Back", imageSrc: "left-arrow-icon.png", disabled: true, show: true },
        { label: "Forward", imageSrc: "right-arrow-icon.png", disabled: true, show: true },
        { label: "Up", imageSrc: "up-folder-icon.png", disabled: false, show: true },
        { label: "Cut", imageSrc: "cut-icon.png", disabled: false, show: true },
        { label: "Copy", imageSrc: "copy-icon.png", disabled: false, show: true },
        { label: "Paste", imageSrc: "paste-icon.png", disabled: false, show: true },
        { label: "Delete", imageSrc: "delete-icon.png", disabled: false, show: true },
        { label: "Properties", imageSrc: "properties-icon.png", disabled: false, show: true },
        { label: "Views", imageSrc: "views-icon.png", disabled: false, show: true }
    ].reduce((acc: { label: string, imageSrc: string, disabled: boolean, show: boolean }[], tab, index) => {

        if (width < (64 * (index + 1)) + 40) {
            tab.show = false;
        }

        acc.push(tab);
        return acc;
    }, []);

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
                            return tab.show === true && <Tab key={index} label={tab.label} imageSrc={tab.imageSrc} disabled={tab.disabled} />
                        })}
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
                    {selectedIcon?.parentWindowId === "documentsWindow" && <div> {
                        selectedIcon.id
                    }
                    </div>}
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