import React, { createContext, useContext, useEffect, useState } from "react";

export type Settings = {
    level: "easy" | "medium" | "hard";
    speed: "slow" | "normal" | "fast";
    sound: boolean;
};

const LS_KEY = "emotionalcards:settings";

const defaultSettings: Settings = {
    level: "easy",
    speed: "normal",
    sound: true,
};

type SettingsContextValue = {
    settings: Settings;
    setSettings: (s: Partial<Settings>) => void;
    resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettingsState] = useState<Settings>(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (raw) return JSON.parse(raw) as Settings;
        } catch {}
        return defaultSettings;
    });

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(settings));
        } catch {}
    }, [settings]);

    const setSettings = (s: Partial<Settings>) => setSettingsState((prev) => ({ ...prev, ...s }));
    const resetSettings = () => setSettingsState(defaultSettings);

    return (
        <SettingsContext.Provider value={{ settings, setSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
    return ctx;
};
