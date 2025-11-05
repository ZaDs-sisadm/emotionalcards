import { useEffect, useRef, useState } from "react";

export const useTimer = (running: boolean) => {
    const [seconds, setSeconds] = useState<number>(0);
    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        if (!running) {
            if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
            startRef.current = null;
            return;
        }

        if (startRef.current === null) startRef.current = performance.now() - seconds * 1000;

        const tick = (ts: number) => {
            const elapsed = Math.floor((ts - (startRef.current ?? ts)) / 1000);
            setSeconds(elapsed);
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [running]);

    const reset = () => {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        startRef.current = null;
        setSeconds(0);
    };

    return { seconds, reset };
};
