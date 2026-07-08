import "./Welcome.css";

const Welcome = () => {
    return (
        <>
            <span className="Title">Welcome to the Start Guide</span>

            <span className="Description">Use the sections and tabs on the left to explore this online operating system.</span>

            <ul className="List">
                <li className="Item">Learn more about me.</li>
                <li className="Item">Browse through a gallery of my work.</li>
                <li className="Item">Find answers to your questions.</li>
                <li className="Item">Discover easter eggs.</li>
            </ul>
        </>
    );
};

export default Welcome;