import React from "react";
import SettingsForm from "../components/UI/SettingsForm";

interface Props { onStart: (level: "easy" | "medium" | "hard") => void; }

const StartPage: React.FC<Props> = ({ onStart }) => {
    return (
        <div className="page start-page">
            <h1>Емоційні пари</h1>
            <p>Налаштуйте гру:</p>
            <SettingsForm />
            <div style={{marginTop:16}}>
                <button onClick={() => onStart("easy")} className="btn-primary">Почати (за налаштуваннями)</button>
            </div>
        </div>
    );
};
export default StartPage;
