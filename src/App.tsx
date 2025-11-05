import React, { useState } from "react";
import { SettingsProvider } from "./context/SettingsContext";
import Container from "./components/Layout/Container";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
    const [page, setPage] = useState<"start"|"game"|"results">("start");
    return (
        <SettingsProvider>
            <Container>
                {page === "start" && <StartPage onStart={() => setPage("game")} />}
                {page === "game" && <GamePage onFinish={() => setPage("results")} />}
                {page === "results" && <ResultsPage onPlayAgain={() => setPage("start")} />}
            </Container>
        </SettingsProvider>
    );
}


export default App;
