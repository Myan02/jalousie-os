import "./Divider.css";

type props = {
    divType: "Horizontal" | "Vertical";
}

const Divider = ({ divType }: props) => {
    return (
        <>
            {divType === "Horizontal"
                ? <div className="divider horizontal" />
                : <div className="divider vertical" />}
        </>
    );
};

export default Divider;