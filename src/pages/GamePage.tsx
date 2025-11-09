import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import Grid from "../components/Game/Grid";
import MovesPlaceholder from "../components/Shared/MovesPlaceholder";
import FinishModal from "../components/Game/FinishModal";
import { useResultsContext } from "../context/ResultsContext";
import { useSettings } from "../context/SettingsContext";

const GamePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const { settings, setSettings } = useSettings();
    const { saveForUser } = useResultsContext();

    const level = settings.level;
    const { cards, moves, openCard, reset, finished, busy, pairsCount } = useGame(level);
    const { seconds, reset: resetTimer } = useTimer(!finished && moves > 0);

    const [modalOpen, setModalOpen] = useState(false);
    const [lastResult, setLastResult] = useState<any>(null);

    useEffect(() => {
        if (finished) {
            const r = { moves, time: seconds, level, date: new Date().toISOString() };
            if (userId) saveForUser(userId, r);
            setLastResult(r);
            setTimeout(() => setModalOpen(true), 180);
        }
    }, [finished, moves, seconds, level, saveForUser, userId]);

    const handleRestart = () => {
        reset();
        resetTimer();
        setModalOpen(false);
    };

    const handleNextLevel = () => {
        const order: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];
        const idx = order.indexOf(level);
        const next = order[(idx + 1) % order.length];
        setSettings({ level: next });
        reset();
        resetTimer();
        setModalOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Гра — {userId ?? "anon"}</h2>
                    <div className="text-sm text-gray-500">Рівень: {level} • Пари: {pairsCount}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm">
                        {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
                    </div>
                    <MovesPlaceholder value={moves} />
                </div>
            </header>

            <Grid cards={cards} onCardClick={(id) => { if (!busy) openCard(id); }} cols={Math.round(Math.sqrt(pairsCount * 2))} />

            <div className="mt-4 flex gap-3">
                <button onClick={() => { reset(); resetTimer(); }} className="px-3 py-2 border rounded">Перезапустити</button>
                <button onClick={() => navigate(userId ? `/user/${userId}/results` : "/")} className="px-3 py-2 bg-gray-100 rounded">До результатів</button>
            </div>

            <FinishModal
                open={modalOpen}
                result={lastResult}
                onRestart={handleRestart}
                onNextLevel={handleNextLevel}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default GamePage;
