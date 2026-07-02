import RecycleContent from "./content/recycle/RecycleContent";
import ComputerContent from "./content/computer/ComputerContent";
import DocumentsContent from "./content/documents/DocumentsContent";
import GuideContent from "./content/guide/GuideContent";

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