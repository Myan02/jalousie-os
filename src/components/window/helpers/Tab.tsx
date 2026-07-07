import "./Tab.css";

type props = {
    label: string;
    imageSrc: string;
    disabled?: boolean;
    click: () => void;  // Set in parent component any desired funcionality
};

// A wrapper for any clickable item in a window that has an image and a label
const WindowTab = ({ label, imageSrc, disabled, click }: props) => {

    return (
        <button disabled={disabled} draggable="false" className="tab" onClick={click}>
            <img className="tab__img" src={`./src/assets/icons/${imageSrc}`} alt={label} />
            <span className="tab__label">{label}</span>
        </button>
    );
};

export default WindowTab;