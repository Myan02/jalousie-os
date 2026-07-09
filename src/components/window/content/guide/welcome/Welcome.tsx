import "./Welcome.css";

const Welcome = () => {
    return (
        <>
            <span className="Welcome__Title">Welcome to the Start Guide</span>

            <span className="Welcome__Description">Use the sections and tabs on the left to explore this online operating system.</span>

            <ul className="Welcome__List">
                <li className="Welcome__Item">Learn more about me.</li>
                <li className="Welcome__Item">Browse through a gallery of my work.</li>
                <li className="Welcome__Item">Find answers to your questions.</li>
                <li className="Welcome__Item">Discover easter eggs.</li>
            </ul>
        </>
    );
};

export default Welcome;