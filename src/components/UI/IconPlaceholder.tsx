import React from "react";

interface Props {
    size?: number;
    children?: React.ReactNode;
    className?: string;
}

const IconPlaceholder: React.FC<Props> = ({ size = 36, children, className = "" }) => {
    const style: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: size / 6,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--card-bg, #fff)",
        boxShadow: "0 2px 6px rgba(16,24,40,0.06)",
    };

    return (
        <div className={`icon-placeholder ${className}`} style={style}>
            {children ?? "😊"}
        </div>
    );
};

export default IconPlaceholder;
