import React from "react";
import Portal from "../UI/Portal";
import { Result } from "../../hooks/useResults";

type Props = {
    open: boolean;
    result: Result | null;
    onRestart: () => void;
    onNextLevel: () => void;
    onClose?: () => void;
};

const FinishModal: React.FC<Props> = ({ open, result, onRestart, onNextLevel, onClose }) => {
    if (!open) return null;

    return (
        <Portal>
            <div className="modal-backdrop" style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 1000
            }}>
                <div className="modal" role="dialog" aria-modal="true" style={{
                    background: "#fff", padding: 20, borderRadius: 10, minWidth: 320, boxShadow: "0 10px 40px rgba(2,6,23,0.3)"
                }}>
                    <h3>Гра завершена</h3>
                    {result ? (
                        <div>
                            <p><strong>Рівень:</strong> {result.level}</p>
                            <p><strong>Ходи:</strong> {result.moves}</p>
                            <p><strong>Час:</strong> {result.time}s</p>
                            <p><strong>Дата:</strong> {new Date(result.date).toLocaleString()}</p>
                        </div>
                    ) : <p>Результат відсутній</p>}
                    <div style={{display:"flex", gap:8, marginTop:12, justifyContent:"flex-end"}}>
                        <button className="btn-secondary" onClick={onRestart}>Повторити</button>
                        <button className="btn-primary" onClick={onNextLevel}>Наступний тур</button>
                        <button className="btn-ghost" onClick={onClose}>Закрити</button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default FinishModal;
