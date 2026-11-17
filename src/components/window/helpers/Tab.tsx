/**
 * Tab helper component. A tab is a button with a label. 
 * It can have an image or a distinct style. It can even have a custom click function
 * if needed.
 * 
 * Separate from Label.tsx purely based on purpose and styling. Refer to GuideContent.tsx 
 * for an example.
 */

import "./Tab.css";

type props = {
    label: string;
    imageSrc?: string;
    disabled?: boolean;
    style?: object,
    click?: (e: React.MouseEvent) => void;  /* Set in parent component any desired funcionality */
};

const Tab = ({ label, imageSrc, disabled, style, click }: props) => {

    return (
        <button style={style} disabled={disabled} draggable="false" className="tab" onClick={click}>
            {imageSrc && <img className="tab__img" src={`/assets/icons/${imageSrc}`} alt={label} />}
            <span className="tab__label">{label}</span>
        </button>
    );
};

export default Tab;