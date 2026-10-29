import RecycleContent from "./content/recycle/RecycleContent";
import ComputerContent from "./content/computer/ComputerContent";
import DocumentsContent from "./content/documents/DocumentsContent";
import GuideContent from "./content/guide/GuideContent";
import ResumeContent from "./content/resume/ResumeContent";
import CeramicsContent from "./content/ceramics/CeramicsContent";
import WorkshopsContent from "./content/workshops/WorkshopsContent";
import CDPlayerContent from "./content/cd-player/CDPlayerContent";

const WindowContent = ({ windowId }: { windowId: string }) => {
    switch (windowId) {
        /* Desktop Icon Content */
        case "recycleWindow": return <RecycleContent />;
        case "computerWindow": return <ComputerContent />;
        case "documentsWindow": return <DocumentsContent />;
        case "guideWindow": return <GuideContent />;

        /* Window Icon Content */
        case "resumeWindow": return <ResumeContent />;
        case "ceramicsWindow": return <CeramicsContent />;
        case "workshopsWindow": return <WorkshopsContent />;
        case "cdPlayerWindow": return <CDPlayerContent />;
        case "lowQualityDogsIcon": return "";
        case "subwayFilesIcon": return "";

        default: return <p>Unknown Window: {windowId}</p>;
    }
};

export default WindowContent;