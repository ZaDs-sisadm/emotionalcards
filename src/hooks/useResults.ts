import { useCallback, useEffect, useState } from "react";

export type Result = {
    moves: number;
    time: number;
    level: "easy" | "medium" | "hard";
    date: string;
};

const LS_KEY = "emotionalcards:results";

export const useResults = () => {
    const [history, setHistory] = useState<Result[]>(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (!raw) return [];
            return JSON.parse(raw) as Result[];
        } catch { return []; }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(history));
        } catch {}
    }, [history]);

    const save = useCallback((res: Result) => {
        setHistory((prev) => {
            const next = [res, ...prev].slice(0, 20);
            return next;
        });
    }, []);

    const best = history[0] ?? null;

    return { history, save, best };
};
