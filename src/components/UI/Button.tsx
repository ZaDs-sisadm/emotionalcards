import React from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    children: React.ReactNode;
}

const classFor = (v: Variant) =>
    v === "primary"
        ? "btn btn-primary"
        : v === "secondary"
            ? "btn btn-secondary"
            : "btn btn-ghost";

const Button: React.FC<Props> = ({ variant = "primary", children, ...rest }) => {
    return (
        <button className={classFor(variant)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
