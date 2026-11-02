/**
 * Label helper component. A label is a div with a label. 
 * It can have an image or a distinct style. It can even have a custom click function
 * if needed.
 * 
 * Separate from Tab.tsx purely based on purpose and styling. Refer to GuideContent.tsx 
 * for an example.
 */

import "./Label.css";

type props = {
    id: string;
    label: string;
    imageSrc?: string;
    click?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Label = ({ id, label, imageSrc, click }: props) => {
    return (
        <div id={id} draggable="false" className="WinLabel" onClick={click}>
            {imageSrc && <img className="WinLabel__img" src={`./src/assets/icons/${imageSrc}`} alt={label} />}
            <span className="WinLabel__text">{label}</span>
        </div>
    );
};

export default Label;

