import { useDragContext } from "../../../../context/DragContext";
import WindowIconGrid from "../../WindowIconGrid";

const ComputerContent = () => {
    const { windows } = useDragContext();

    const window = windows.filter(win => win.id === "computerWindow");
    const width = window[0].width;
    const height = window[0].height;

    return (
        <div>
            <WindowIconGrid
                parentWindowId="computerWindow"
                parentWidth={width}
                parentHeight={height}
            >

            </WindowIconGrid>
        </div>
    );
}

export default ComputerContent;