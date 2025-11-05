import React from "react";
import { Card } from "../../hooks/useGame";

interface Props {
    card: Card;
    onClick: (id: number) => void;
}

const EmojiCard: React.FC<Props> = ({ card, onClick }) => {
    return (
        <div
            className={`emoji-card ${card.revealed ? "revealed" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => onClick(card.id)}
            role="button"
            aria-pressed={card.revealed}
            aria-label={card.matched ? "matched card" : "card"}
        >
            <div className="card-face front">?</div>
            <div className="card-face back">{card.emoji}</div>
        </div>
    );
};

export default EmojiCard;
