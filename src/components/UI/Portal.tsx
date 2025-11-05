import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const containerId = "modal-root";

const ensureContainer = () => {
    let el = document.getElementById(containerId);
    if (!el) {
        el = document.createElement("div");
        el.id = containerId;
        document.body.appendChild(el);
    }
    return el;
};

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const el = ensureContainer();
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);
    return createPortal(children, el);
};

export default Portal;
