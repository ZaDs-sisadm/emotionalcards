import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveResult } from "../store/resultsSlice";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import Grid from "../components/Game/Grid";
import MovesPlaceholder from "../components/Shared/MovesPlaceholder";
import FinishModal from "../components/Game/FinishModal";

const GamePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const settings = useAppSelector((s) => s.settings);

    const { cards, moves, openCard, reset, finished, busy, pairsCount } = useGame(settings.level);
    const { seconds, reset: resetTimer } = useTimer(!finished && moves > 0);

    const [modalOpen, setModalOpen] = useState(false);
    const [lastResult, setLastResult] = useState<any>(null);

    useEffect(() => {
        if (finished && userId) {
            const result = {
                moves,
                time: seconds,
                level: settings.level,
                date: new Date().toISOString(),
            };
            dispatch(saveResult({ userId, result }));
            setLastResult(result);
            setTimeout(() => setModalOpen(true), 200);
        }
    }, [finished]);

    const handleRestart = () => {
        reset();
        resetTimer();
        setModalOpen(false);
    };

    const handleNextLevel = () => {
        const order: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];
        const idx = order.indexOf(settings.level);
        const next = order[(idx + 1) % order.length];
        dispatch(setSettings({ level: next }));
        reset();
        resetTimer();
        setModalOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Гра для {userId}</h2>
                    <p className="text-sm text-gray-500">Рівень: {settings.level} • Пари: {pairsCount}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="text-sm">
                        {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
                    </div>
                    <MovesPlaceholder value={moves} />
                </div>
            </header>

            <Grid cards={cards} onCardClick={(id) => !busy && openCard(id)} cols={Math.round(Math.sqrt(pairsCount * 2))} />

            <div className="mt-4 flex gap-3">
                <button onClick={handleRestart} className="px-3 py-2 border rounded">Перезапустити</button>
                <button onClick={() => navigate(`/user/${userId}/results`)} className="px-3 py-2 bg-gray-100 rounded">До результатів</button>
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
