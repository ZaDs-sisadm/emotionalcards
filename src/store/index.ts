import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import resultsReducer from "./resultsSlice";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        results: resultsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
