import React from "react";

interface Props {
    id: number;
    revealed?: boolean;
    matched?: boolean;
    onClick?: (id: number) => void;
    emoji?: string; // optional placeholder
}

const EmojiCard: React.FC<Props> = ({ id, revealed = false, matched = false, onClick, emoji = "😊" }) => {
    const className = `emoji-card ${revealed ? "revealed" : ""} ${matched ? "matched" : ""}`;
    return (
        <div className={className} onClick={() => onClick?.(id)} role="button" aria-pressed={revealed}>
            <div className="card-face front">?</div>
            <div className="card-face back">{emoji}</div>
        </div>
    );
};

export default EmojiCard;
