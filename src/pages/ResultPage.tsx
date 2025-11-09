import React from "react";
import { useParams, Link } from "react-router-dom";
import { useResultsContext } from "../context/ResultsContext";

const ResultsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { getForUser, clearForUser } = useResultsContext();
    const results = userId ? getForUser(userId) : [];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Результати {userId ? `— ${userId}` : ""}</h2>
                <div className="flex gap-2">
                    <Link to={userId ? `/user/${userId}/game` : "/"} className="px-3 py-2 bg-green-600 text-white rounded">Грати</Link>
                    {userId && <button onClick={() => clearForUser(userId)} className="px-3 py-2 border rounded">Очистити</button>}
                </div>
            </header>

            {results.length === 0 ? (
                <p className="text-sm text-gray-500">Результатів поки немає.</p>
            ) : (
                <ul className="space-y-3">
                    {results.map((r, i) => (
                        <li key={i} className="p-3 bg-white rounded shadow-sm">
                            <div className="text-sm text-gray-600">Рівень: {r.level}</div>
                            <div className="font-medium">Ходи: {r.moves} • Час: {r.time}s</div>
                            <div className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResultsPage;
