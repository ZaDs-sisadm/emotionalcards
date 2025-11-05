import React from "react";
import Grid from "../components/Game/Grid";
import TimerPlaceholder from "../components/Shared/TimerPlaceholder";
import MovesPlaceholder from "../components/Shared/MovesPlaceholder";

interface Props { onFinish: () => void; }

const GamePage: React.FC<Props> = ({ onFinish }) => {

    const placeholders = new Array(12).fill(null);

    return (
        <div className="page game-page">
            <div className="game-top">
                <TimerPlaceholder />
                <MovesPlaceholder />
            </div>
            <Grid items={placeholders} />
            <div className="game-controls">
                <button onClick={onFinish} className="btn-secondary">Закінчити (placeholder)</button>
            </div>
        </div>
    );
};

export default GamePage;
