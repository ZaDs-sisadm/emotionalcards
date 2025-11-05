import React from "react";
import Button from "../components/UI/Button";
import Logo from "../components/UI/Logo";

interface Props { onStart: () => void; }

const StartPage: React.FC<Props> = ({ onStart }) => {
    return (
        <div className="page start-page">
            <Logo />
            <h1>Емоційні пари</h1>
            <p>Знайди однакові емодзі за мінімум ходів. Обери складність та починай гру.</p>
            <div className="level-controls">
                <label>Рівень:</label>
                <select aria-label="level-select">
                    <option>Легкий (4x2)</option>
                    <option>Середній (6x4)</option>
                    <option>Важкий (8x6)</option>
                </select>
            </div>
            <Button onClick={onStart}>Почати гру</Button>
        </div>
    );
};

export default StartPage;
