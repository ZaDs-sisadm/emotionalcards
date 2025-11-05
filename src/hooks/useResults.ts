import { useState } from "react";

export type Result = {
    moves: number;
    time: number;
    level: "easy" | "medium" | "hard";
    date: string;
};

export const useResults = () => {
    const [best, setBest] = useState<Result | null>(null);
    const save = (res: Result) => {
        setBest((prev) => {
            // просте збереження: замінюємо на новий результат; тут можна додати localStorage
            return res;
        });
    };

    return { best, save };
};
