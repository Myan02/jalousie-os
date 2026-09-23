import "./Sections.css";

const Explore = () => {
    return (
        <>
            <span className="Section__Title">Explore Your Online Desktop</span>

            <span className="Section__Description">
                Look through the bullet points below to learn tips on navigating this operating system.
            </span>

            <ol className="Section__List">
                <li className="Section__List-Item">Drag and drop desktop icons to move them around.</li>
                <li className="Section__List-Item">Drag and drop windows by grabbing them from their top blue title bars.</li>
                <li className="Section__List-Item">Close, minimize, and maximize windows with the controls in the top right corner.</li>
                <li className="Section__List-Item">Double click the top title bar as shortcut for maximizing and minimizing windows.</li>
                <li className="Section__List-Item">Make a window smaller or bigger by grabbing and dragging the bottom or right edges.</li>
                <li className="Section__List-Item">Look through each desktop app for something different:</li>
                <ul style={{ marginLeft: "6%" }} className="Section__List">
                    <li className="Section__List-Item"><b>Recycle Bin:</b> Projects that I never got to finish. Hopefully one day I'll go back to them...</li>
                    <li className="Section__List-Item"><b>My Computer:</b> Apps and Projects that I published.</li>
                    <li className="Section__List-Item"><b>My Documents:</b> A showcase of my work and skill as a gallery.</li>
                    <li className="Section__List-Item"><b>Start Guide:</b> Help on navigating this operating system.</li>
                </ul>
                <li className="Section__List-Item">Explore! There's a ton of fun things to do.</li>
            </ol>
        </>
    );
};

export default Explore;