/**
 * A cosmetic divider for adding style to headers and footers.
 * Choose the type of divider using the divType prop. Results will
 * vary depending on this components parent and its flex direction.
 * 
 */

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