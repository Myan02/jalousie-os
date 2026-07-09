import "./Explore.css";

const Explore = () => {
    return (
        <>
            <span className="Explore__Title">Explore Your Online Desktop</span>

            <span className="Explore__Description">Look through the bullet points below to learn tips on navigating this operating system.</span>

            <ol className="Explore__List">
                <li className="Explore__Item">Drag and drop desktop icons to move them around.</li>
                <li className="Explore__Item">Drag and drop windows by grabbing them from their top blue bars.</li>
                <li className="Explore__Item">Close and minimize windows with the controls in the top right corner.</li>
                <li className="Explore__Item">Look through each desktop app for something different:</li>
                <ul style={{ marginLeft: "6%" }} className="Explore__list">
                    <li className="Explore__Item"><b>Recycle Bin:</b> Projects that I never got to finish. Hopefully one day I'll go back to them...</li>
                    <li className="Explore__Item"><b>My Computer:</b> Apps and Projects that I published.</li>
                    <li className="Explore__Item"><b>My Documents:</b> A showcase of my work and skill as a gallery.</li>
                    <li className="Explore__Item"><b>Start Guide:</b> Help on navigating this operating system.</li>
                </ul>
            </ol>
        </>
    );
};

export default Explore;