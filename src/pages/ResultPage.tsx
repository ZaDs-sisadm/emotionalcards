import React from "react";
import { useResults } from "../hooks/useResults";

interface Props {
    onPlayAgain: () => void;
}

const ResultsPage: React.FC<Props> = ({ onPlayAgain }) => {
    const { best } = useResults();

    return (
        <div className="page results-page">
            <h2>Результати</h2>
            {best ? (
                <>
                    <p><strong>Рівень:</strong> {best.level}</p>
                    <p><strong>Ходи:</strong> {best.moves}</p>
                    <p><strong>Час:</strong> {best.time}s</p>
                    <p><strong>Дата:</strong> {new Date(best.date).toLocaleString()}</p>
                </>
            ) : (
                <p>Результатів ще немає</p>
            )}
            <div style={{ marginTop: 12 }}>
                <button onClick={onPlayAgain} className="btn-primary">Грати ще</button>
            </div>
        </div>
    );
};

export default ResultsPage;
