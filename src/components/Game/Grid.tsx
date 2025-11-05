import React from "react";
import EmojiCard from "./EmojiCard";
import { Card } from "../../hooks/useGame";

interface Props {
    cards: Card[];
    onCardClick: (id: number) => void;
    cols?: number;
}

const Grid: React.FC<Props> = ({ cards, onCardClick, cols = 4 }) => {
    return (
        <div className="grid" style={{ ["--cols" as any]: cols } as React.CSSProperties}>
            {cards.map((c) => (
                <EmojiCard key={c.id} card={c} onClick={onCardClick} />
            ))}
        </div>
    );
};

export default Grid;
