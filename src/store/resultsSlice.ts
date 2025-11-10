import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Result = {
    moves: number;
    time: number;
    level: "easy" | "medium" | "hard";
    date: string;
};

type ResultsState = {
    byUser: Record<string, Result[]>;
};

const LS_KEY = "emotionalcards:resultsMap";

const load = (): ResultsState => {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return { byUser: {} };
};

const save = (s: ResultsState) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
};

const slice = createSlice({
    name: "results",
    initialState: load(),
    reducers: {
        saveResult(state, action: PayloadAction<{ userId: string; result: Result }>) {
            const { userId, result } = action.payload;
            const arr = state.byUser[userId] ?? [];
            state.byUser[userId] = [result, ...arr].slice(0, 100);
            save(state);
        },
        clearUserResults(state, action: PayloadAction<{ userId: string }>) {
            const { userId } = action.payload;
            delete state.byUser[userId];
            save(state);
        },
        importState(state, action: PayloadAction<ResultsState>) {
            state.byUser = action.payload.byUser;
            save(state);
        },
    },
});

export const { saveResult, clearUserResults, importState } = slice.actions;
export default slice.reducer;
