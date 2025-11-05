import React from "react";
import Logo from "../UI/Logo";
import Button from "../UI/Button";

interface Props {
    onGoHome?: () => void;
}

const Header: React.FC<Props> = ({ onGoHome }) => {
    return (
        <header className="header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Logo />
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Button variant="ghost" onClick={onGoHome}>Головна</Button>
            </div>
        </header>
    );
};

export default Header;
