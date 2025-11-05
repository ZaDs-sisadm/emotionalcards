import React from "react";

const TimerPlaceholder: React.FC = () => {
    return (
        <div className="timer-placeholder" role="status" aria-label="timer placeholder">
            <div className="timer-label">Час</div>
            <div className="timer-value">00:00</div>
        </div>
    );
};

export default TimerPlaceholder;
