import React, { createContext, useContext, useEffect, useState } from "react";

export type Result = {
    moves: number;
    time: number;
    level: "easy" | "medium" | "hard";
    date: string;
};

type ResultsMap = Record<string, Result[]>;

const LS_KEY = "emotionalcards:resultsMap";

type ContextType = {
    saveForUser: (userId: string, r: Result) => void;
    getForUser: (userId: string) => Result[];
    clearForUser: (userId: string) => void;
};

const ResultsContext = createContext<ContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [map, setMap] = useState<ResultsMap>(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(map));
        } catch {}
    }, [map]);

    const saveForUser = (userId: string, r: Result) =>
        setMap((prev) => {
            const cur = prev[userId] ?? [];
            const next = [r, ...cur].slice(0, 50);
            return { ...prev, [userId]: next };
        });

    const getForUser = (userId: string) => map[userId] ?? [];

    const clearForUser = (userId: string) =>
        setMap((prev) => {
            const copy = { ...prev };
            delete copy[userId];
            return copy;
        });

    return (
        <ResultsContext.Provider value={{ saveForUser, getForUser, clearForUser }}>
            {children}
        </ResultsContext.Provider>
    );
};

export const useResultsContext = () => {
    const ctx = useContext(ResultsContext);
    if (!ctx) throw new Error("useResultsContext must be used within ResultsProvider");
    return ctx;
};
