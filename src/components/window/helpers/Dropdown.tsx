/**
 * A dropdown displayed only when certain buttons are clicked. Useful for
 * showing content that has overflowed (such as Tab components in headers).
 */

import type { ReactNode } from "react";
import "./Dropdown.css";

const Dropdown = ({ style, children }: { style: {}, children: ReactNode, }) => {

    return (
        <div className="Dropdown" style={style}>
            {children}
        </div>
    );
};

export default Dropdown;