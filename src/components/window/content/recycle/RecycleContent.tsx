import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";
import Tab from "../../helpers/Tab";
import Divider from "../../helpers/Divider";
import "./RecycleContent.css";

const RecycleContent = () => {
    const { windows, icons, selectedIcon, selectIcon, deleteIcon, deleteAllIcons } = useDragContext();

    const window = windows.filter(win => win.id === "recycleWindow");
    const width = window[0].width;
    const height = window[0].height;

    const handleBinClear = () => {
        const binIcons = icons.filter((icon) => icon.parentWindowId === "recycleWindow")

        if (binIcons) {
            deleteAllIcons();
            selectIcon(undefined);
        }
    };

    const handleDelete = () => {
        if (selectedIcon) {
            deleteIcon(selectedIcon.id);
            selectIcon(undefined);
        }
    }

    return (
        <div className="recycling">
            <div className="recycling__header">
                <Divider divType="thick" />
                <Tab style={{ flex: "0 0 120px", marginLeft: "4px", height: "85%", alignSelf: "center" }} disabled={!selectedIcon || selectedIcon.parentWindowId !== "recycleWindow"} label="Delete Selected Icon" click={handleDelete}></Tab>
                <Tab style={{ flex: "0 0 120px", marginLeft: "4px", height: "85%", alignSelf: "center" }} label="Empty Recycle Bin" click={handleBinClear}></Tab>
            </div>

            <div className="recycling__body">
                <WindowIconGrid
                    parentWindowId="recycleWindow"
                    parentWidth={width}
                    parentHeight={height}
                />
            </div>

            <div className="recycling__footer">
                <div className="recycling__footer-left"></div>
                <div className="recycling__footer-right">
                    {selectedIcon?.parentWindowId === "recycleWindow" && <p>{selectedIcon.label}</p>}
                </div>
            </div>
        </div>
    );
};

export default RecycleContent;

