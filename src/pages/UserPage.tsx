import React from "react";
import { useParams, Link } from "react-router-dom";
import { useResultsContext } from "../context/ResultsContext";

const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { getForUser } = useResultsContext();
    const results = userId ? getForUser(userId) : [];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Користувач: {userId}</h2>
            <div className="mb-4">
                <Link to={`/user/${userId}/game`} className="px-3 py-2 bg-green-600 text-white rounded mr-2">
                    Розпочати гру
                </Link>
                <Link to={`/user/${userId}/results`} className="px-3 py-2 border rounded">
                    Результати
                </Link>
            </div>

            <section>
                <h3 className="font-medium mb-2">Останні результати</h3>
                {results.length === 0 ? (
                    <p className="text-sm text-gray-500">Результатів ще немає</p>
                ) : (
                    <ul className="space-y-2">
                        {results.slice(0, 10).map((r, i) => (
                            <li key={i} className="p-3 bg-white rounded shadow-sm">
                                <div className="text-sm text-gray-600">Рівень: {r.level}</div>
                                <div className="font-medium">Ходи: {r.moves} • Час: {r.time}s</div>
                                <div className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default UserPage;
