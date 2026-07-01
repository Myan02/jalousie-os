import RecycleContent from "./content/RecycleContent";
import ComputerContent from "./content/ComputerContent";
import DocumentsContent from "./content/DocumentsContent";
import GuideContent from "./content/GuideContent";

const WindowContent = ({ windowId }: { windowId: string }) => {
    switch (windowId) {
        case "recycleWindow": return <RecycleContent />;
        case "computerWindow": return <ComputerContent />;
        case "documentsWindow": return <DocumentsContent />;
        case "guideWindow": return <GuideContent />;

        default: return <p>Unknown Window: {windowId}</p>;
    }
};

export default WindowContent;