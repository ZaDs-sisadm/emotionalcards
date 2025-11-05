import React, { useEffect, useMemo, useState } from "react";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import { useResults } from "../hooks/useResults";
import Grid from "../components/Game/Grid";
import MovesPlaceholder from "../components/Shared/MovesPlaceholder";

interface Props {
    onFinish: () => void;
    initialLevel?: "easy" | "medium" | "hard";
}

const GamePage: React.FC<Props> = ({ onFinish, initialLevel = "easy" }) => {
    const [level] = useState(initialLevel);
    const { cards, moves, openCard, reset, finished, busy, pairsCount } = useGame(level);
    const { seconds, reset: resetTimer } = useTimer(!finished && moves > 0); // start timer on first move
    const { save } = useResults();
    const cols = useMemo(() => (level === "easy" ? 4 : level === "medium" ? 4 : 6), [level]);

    useEffect(() => {
        if (finished) {
            save({
                moves,
                time: seconds,
                level,
                date: new Date().toISOString(),
            });
            // небольшая пауза перед вызовом onFinish для показа результату
            const t = setTimeout(() => onFinish(), 500);
            return () => clearTimeout(t);
        }
    }, [finished, moves, seconds, level, save, onFinish]);

    const handleReset = () => {
        reset();
        resetTimer();
    };

    return (
        <div className="page game-page">
            <div className="game-top">
                <div>
                    <div>Час</div>
                    <div>{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</div>
                </div>
                <MovesPlaceholder value={moves} />
                <div>Пари: {pairsCount}</div>
            </div>

            <Grid cards={cards} onCardClick={(id) => { if (!busy) openCard(id); }} cols={cols} />

            <div className="game-controls" style={{ marginTop: 16 }}>
                <button onClick={handleReset} className="btn-secondary">Перезапустити</button>
            </div>
        </div>
    );
};

export default GamePage;
