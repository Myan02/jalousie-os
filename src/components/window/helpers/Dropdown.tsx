/**
 * A dropdown displayed only when certain buttons are clicked. Useful for
 * showing content that has overflowed (such as Tab components in headers).
 */

import type { ReactNode } from "react";
import "./Dropdown.css";

const Dropdown = ({ children }: { children: ReactNode }) => {

    return (
        <div className="Dropdown">
            {children}
        </div>
    );
};

export default Dropdown;