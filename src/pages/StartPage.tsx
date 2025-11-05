import React, { useState } from "react";

interface Props {
    onStart: (level: "easy" | "medium" | "hard") => void;
}

const StartPage: React.FC<Props> = ({ onStart }) => {
    const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");

    return (
        <div className="page start-page">
            <h1>Емоційні пари</h1>
            <p>Знайди однакові емодзі за мінімум ходів.</p>

            <div>
                <label>
                    <input type="radio" name="level" value="easy" checked={level === "easy"} onChange={() => setLevel("easy")} />
                    Легкий (4 пар)
                </label>
                <label style={{ marginLeft: 12 }}>
                    <input type="radio" name="level" value="medium" checked={level === "medium"} onChange={() => setLevel("medium")} />
                    Середній (8 пар)
                </label>
                <label style={{ marginLeft: 12 }}>
                    <input type="radio" name="level" value="hard" checked={level === "hard"} onChange={() => setLevel("hard")} />
                    Важкий (12 пар)
                </label>
            </div>

            <div style={{ marginTop: 16 }}>
                <button onClick={() => onStart(level)} className="btn-primary">Почати</button>
            </div>
        </div>
    );
};

export default StartPage;
