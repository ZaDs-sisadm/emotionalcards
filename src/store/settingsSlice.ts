import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Level = "easy" | "medium" | "hard";
type Speed = "slow" | "normal" | "fast";

export type SettingsState = {
    level: Level;
    speed: Speed;
    sound: boolean;
};

const LS_KEY = "emotionalcards:settings";

const defaultState: SettingsState = {
    level: "easy",
    speed: "normal",
    sound: true,
};

const load = (): SettingsState => {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return defaultState;
};

const save = (s: SettingsState) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
};

const slice = createSlice({
    name: "settings",
    initialState: load(),
    reducers: {
        setSettings(state, action: PayloadAction<Partial<SettingsState>>) {
            const next = { ...state, ...action.payload };
            save(next);
            return next;
        },
        resetSettings() {
            save(defaultState);
            return defaultState;
        },
    },
});

export const { setSettings, resetSettings } = slice.actions;
export default slice.reducer;
