import "./Sections.css";

const Credits = () => {
    return (
        <>
            <span className="Section__Title">Credit and Inspirations</span>

            <span className="Section__Description">
                This project could not have been possible without inspiration from the folks below.
                Huge thank you to:
            </span>

            <ul className="Section__List">
                <li className="Section__List-Item">Shar @ <a target="_blank" href="https://www.sharyap.com/">sharyap.com</a></li>
                <li className="Section__List-Item">Copy @ <a target="_blank" href="https://copy.sh/">copy.sh</a></li>
                <li className="Section__List-Item">Alex Meub @ <a target="_blank" href="https://alexmeub.com/">alexmeub.com</a></li>
                <li className="Section__List-Item">98.js.org @ <a target="_blank" href="https://98.js.org/">98.js.org</a></li>
            </ul>
        </>
    );
};

export default Credits;