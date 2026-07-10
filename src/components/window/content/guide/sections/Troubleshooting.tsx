import "./Sections.css";

const Troubleshooting = () => {
    return (
        <>
            <span className="Section__Title">Troubleshooting Your System</span>

            <span className="Section__Description">
                This software was built bit by bit with no additional packages. Every minute detail.
                Therefore, there might be bugs. If you find anything strange and can reproduce it, send me an
                email. Otherwise, here are some quick fixes:
            </span>

            <ul className="Section__List">
                <li className="Section__List-Item">Restart the page.</li>
                <li className="Section__List-Item">That's it, just restart the page hehe.</li>
            </ul>

            <span className="Section__Description">
                Thank you :3
            </span>
        </>
    );
};

export default Troubleshooting;