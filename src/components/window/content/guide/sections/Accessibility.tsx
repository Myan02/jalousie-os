import "./Sections.css";

const Accessibility = () => {
    return (
        <>
            <span className="Section__Title">Accessibility Available to You</span>

            <span className="Section__Description">
                For the best experience,
                check out some options in the taskbar below and avoid using a mobile device. <br /><br />
                Some available options are:
            </span>

            <ul className="Section__List">
                <li className="Section__List-Item">High contrast themes.</li>
                <li className="Section__List-Item">Dark mode for night time viewing.</li>
                <li className="Section__List-Item">Alternative text on all media for screenreaders.</li>
                <li className="Section__List-Item">Volume adjustment.</li>
            </ul>
        </>
    );
};

export default Accessibility;