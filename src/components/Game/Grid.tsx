import React from "react";
import EmojiCard from "./EmojiCard";

interface Props { items: (null | string)[]; }

const Grid: React.FC<Props> = ({ items }) => {
    return (
        <div className="grid" style={{ "--cols": 4 } as React.CSSProperties}>
            {items.map((it, i) => (
                <EmojiCard key={i} id={i} emoji={it ?? "🐶"} />
            ))}
        </div>
    );
};

export default Grid;
