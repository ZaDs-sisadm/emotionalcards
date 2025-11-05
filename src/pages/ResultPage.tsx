import React from "react";
import Button from "../components/UI/Button";

interface Props { onPlayAgain: () => void; }

const ResultsPage: React.FC<Props> = ({ onPlayAgain }) => {
    return (
        <div className="page results-page">
            <h2>Результати</h2>
            <p>Кількість ходів: —</p>
            <p>Час: —</p>
            <Button onClick={onPlayAgain}>Грати ще раз</Button>
        </div>
    );
};

export default ResultsPage;
