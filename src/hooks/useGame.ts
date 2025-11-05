import { useCallback, useMemo, useState } from "react";

export type Card = {
    id: number;
    emoji: string;
    revealed: boolean;
    matched: boolean;
    pairId: number;
};

const DEFAULT_EMOJIS = ["😀","😅","😂","😊","😍","😎","😇","🤩","🤔","😴","🤖","🙃"];

const shuffle = <T,>(arr: T[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const useGame = (level: "easy" | "medium" | "hard") => {
    const pairsCount = useMemo(() => {
        if (level === "easy") return 4;
        if (level === "medium") return 8;
        return 12;
    }, [level]);

    const [cards, setCards] = useState<Card[]>(() => {
        const em = DEFAULT_EMOJIS.slice(0, pairsCount);
        const pairCards: Card[] = em.flatMap((emoji, idx) => {
            const pairId = idx;
            return [
                { id: pairId * 2, emoji, revealed: false, matched: false, pairId },
                { id: pairId * 2 + 1, emoji, revealed: false, matched: false, pairId },
            ];
        });
        return shuffle(pairCards);
    });

    const [moves, setMoves] = useState<number>(0);
    const [busy, setBusy] = useState<boolean>(false);

    const openCard = useCallback((id: number) => {
        if (busy) return;
        setCards((prev) => {
            const target = prev.find((c) => c.id === id);
            if (!target || target.revealed || target.matched) return prev;
            // Reveal clicked
            const revealed = prev.map((c) => (c.id === id ? { ...c, revealed: true } : c));
            // Check how many revealed (not matched)
            const currentlyRevealed = revealed.filter((c) => c.revealed && !c.matched);
            if (currentlyRevealed.length === 2) {
                setBusy(true);
                setMoves((m) => m + 1);
                const [a, b] = currentlyRevealed;
                if (a.pairId === b.pairId) {
                    // match them
                    setTimeout(() => {
                        setCards((cur) =>
                            cur.map((x) =>
                                x.pairId === a.pairId ? { ...x, matched: true, revealed: true } : x
                            )
                        );
                        setBusy(false);
                    }, 250);
                } else {
                    // hide after delay
                    setTimeout(() => {
                        setCards((cur) => cur.map((x) => (x.matched ? x : { ...x, revealed: false })));
                        setBusy(false);
                    }, 700);
                }
            }
            return revealed;
        });
    }, [busy]);

    const reset = useCallback(() => {
        const em = DEFAULT_EMOJIS.slice(0, pairsCount);
        const pairCards: Card[] = em.flatMap((emoji, idx) => {
            const pairId = idx;
            return [
                { id: pairId * 2, emoji, revealed: false, matched: false, pairId },
                { id: pairId * 2 + 1, emoji, revealed: false, matched: false, pairId },
            ];
        });
        setCards(shuffle(pairCards));
        setMoves(0);
        setBusy(false);
    }, [pairsCount]);

    const finished = useMemo(() => cards.every((c) => c.matched), [cards]);

    return {
        cards,
        moves,
        openCard,
        reset,
        finished,
        busy,
        pairsCount,
    };
};
