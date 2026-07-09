import "./Accessibility.css";

const Accessibility = () => {
    return (
        <>
            <span className="Accessibility__Title">Accessibility Available to You</span>

            <span className="Accessibility__Description">For the best experience,
                check out some options in the taskbar below and avoid using a mobile device. <br /><br />
                Some available options are:
            </span>

            <ul className="Accessibility__List">
                <li className="Accessibility__Item">High contrast themes.</li>
                <li className="Accessibility__Item">Dark mode for night time viewing.</li>
                <li className="Accessibility__Item">Alternative text on all media for screenreaders.</li>
                <li className="Accessibility__Item">Volume adjustment.</li>
            </ul>
        </>
    );
};

export default Accessibility;