import "./Divider.css";

type props = {
    divType: "horizontal" | "vertical" | "thick";
}

const Divider = ({ divType }: props) => {
    return (
        <div className={`divider ${divType}`} />
    );
};

export default Divider;