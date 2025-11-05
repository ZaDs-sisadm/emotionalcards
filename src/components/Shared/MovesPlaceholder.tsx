import React from "react";

const MovesPlaceholder: React.FC = () => {
    return (
        <div className="moves-placeholder" role="status" aria-label="moves placeholder">
            <div className="moves-label">Ходи</div>
            <div className="moves-value">0</div>
        </div>
    );
};

export default MovesPlaceholder;
