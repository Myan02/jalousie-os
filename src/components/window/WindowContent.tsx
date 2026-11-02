/**
 * TL;DR Return the matching window component based on the parent who rendered this component
 * 
 * Every window component needs has basic features (dragging, scaling, title, etc) and 
 * unique content. Depending on the window that is rendered, a different component will be
 * returned. This component chooses what is displayed on each window based on the 
 * matching switch statement. Desktop icons are on the top, window icons are on the bottom.
 */

import RecycleContent from "./content/recycle/RecycleContent";
import ComputerContent from "./content/computer/ComputerContent";
import DocumentsContent from "./content/documents/DocumentsContent";
import GuideContent from "./content/guide/GuideContent";
import ResumeContent from "./content/resume/ResumeContent";
import CeramicsContent from "./content/ceramics/CeramicsContent";
import WorkshopsContent from "./content/workshops/WorkshopsContent";
import CDPlayerContent from "./content/cd-player/CDPlayerContent";
import DogsContent from "./content/dogs/DogsContent";
import SubwayFilesContent from "./content/subway-files/SubwayFilesContent";

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
        case "lowQualityDogsWindow": return <DogsContent />;
        case "subwayFilesWindow": return <SubwayFilesContent />;

        /* Default option if no window component is fine */
        default: return <p>Unknown Window: {windowId}</p>;
    }
};

export default WindowContent;