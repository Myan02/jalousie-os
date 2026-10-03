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