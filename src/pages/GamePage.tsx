import React, { useEffect, useMemo, useState } from "react";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import { useResults, Result } from "../hooks/useResults";
import Grid from "../components/Game/Grid";
import MovesPlaceholder from "../components/Shared/MovesPlaceholder";
import FinishModal from "../components/Game/FinishModal";
import { useSettings } from "../context/SettingsContext";

interface Props { onFinish?: () => void; }

const GamePage: React.FC<Props> = ({ onFinish }) => {
    const { settings } = useSettings();
    const { cards, moves, openCard, reset, finished, busy, pairsCount } = useGame(settings.level);
    const { seconds, reset: resetTimer } = useTimer(!finished && moves > 0);
    const { save, best } = useResults();
    const [modalOpen, setModalOpen] = useState(false);
    const [lastResult, setLastResult] = useState<Result | null>(null);

    useEffect(() => {
        if (finished) {
            const r: Result = {
                moves,
                time: seconds,
                level: settings.level,
                date: new Date().toISOString()
            };
            save(r);
            setLastResult(r);
            setTimeout(() => setModalOpen(true), 150); // невелика пауза для UX
        }
    }, [finished, moves, seconds, settings.level, save]);

    const handleRestart = () => {
        reset();
        resetTimer();
        setModalOpen(false);
    };

    const handleNextLevel = () => {

        const order = ["easy","medium","hard"] as const;
        const idx = order.indexOf(settings.level);
        const next = order[(idx + 1) % order.length];

        (useSettings() as any).setSettings({ level: next });

    };


    return (
        <div className="page game-page">
            <div className="game-top">
                <div>
                    <div>Час</div>
                    <div>{String(Math.floor(seconds / 60)).padStart(2,"0")}:{String(seconds % 60).padStart(2,"0")}</div>
                </div>
                <MovesPlaceholder value={moves} />
                <div>Пари: {pairsCount}</div>
            </div>

            <Grid cards={cards} onCardClick={(id) => { if (!busy) openCard(id); }} cols={Math.sqrt(pairsCount*2) | 0} />

            <div style={{marginTop:12}}>
                <button onClick={() => { reset(); resetTimer(); }} className="btn-secondary">Перезапустити</button>
            </div>

            <FinishModal
                open={modalOpen}
                result={lastResult}
                onRestart={handleRestart}
                onNextLevel={() => {
                    const { setSettings } = useSettings();
                    const order = ["easy","medium","hard"] as const;
                    const idx = order.indexOf(settings.level);
                    const next = order[(idx + 1) % order.length];
                    setSettings({ level: next });
                    setModalOpen(false);
                    // reset та перезапуск
                    reset();
                    resetTimer();
                }}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default GamePage;
