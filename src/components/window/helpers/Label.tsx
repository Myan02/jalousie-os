import "./Label.css";

type props = {
    id: string;
    label: string;
    imageSrc: string;
    click: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Label = ({ id, label, imageSrc, click }: props) => {
    return (
        <div id={id} draggable="false" className="WinLabel" onClick={click}>
            <img className="WinLabel__img" src={`./src/assets/icons/${imageSrc}`} alt={label} />
            <span className="WinLabel__text">{label}</span>
        </div>
    );
};

export default Label;

