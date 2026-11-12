import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";

const RecycleContent = () => {
    const { windows } = useDragContext();

    const window = windows.filter(win => win.id === "recycleWindow");
    const width = window[0].width;
    const height = window[0].height;

    return (
        <WindowIconGrid
            parentWindowId="recycleWindow"
            parentWidth={width}
            parentHeight={height}
        />
    );
};

export default RecycleContent;