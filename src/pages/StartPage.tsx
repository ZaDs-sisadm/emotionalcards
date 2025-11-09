import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsForm from "../components/UI/SettingsForm";

const StartPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const startForUser = () => {
        const id = userId.trim() || `user_${Math.floor(Math.random() * 10000)}`;
        navigate(`/user/${encodeURIComponent(id)}/game`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Емоційні пари</h1>
                <p className="text-sm text-gray-500">Обери налаштування та почни гру під своїм ID</p>
            </header>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">ID користувача (опціонально)</label>
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Введіть ID або залиште порожнім"
                    className="w-full border rounded p-2"
                />
            </div>

            <div className="mb-6">
                <SettingsForm />
            </div>

            <div className="flex gap-3">
                <button onClick={startForUser} className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Почати гру
                </button>
                <button onClick={() => navigate("/")} className="px-4 py-2 border rounded">
                    Скинути
                </button>
            </div>
        </div>
    );
};

export default StartPage;
