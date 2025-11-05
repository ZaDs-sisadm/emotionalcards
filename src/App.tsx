import React, { useState } from "react";
import Container from "./components/Layout/Container";
import Header from "./components/Layout/Header";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

type Page = "start" | "game" | "results";

const App: React.FC = () => {
    const [page, setPage] = useState<Page>("start");

    return (
        <Container>
            <Header onGoHome={() => setPage("start")} />
            {page === "start" && <StartPage onStart={() => setPage("game")} />}
            {page === "game" && <GamePage onFinish={() => setPage("results")} />}
            {page === "results" && <ResultsPage onPlayAgain={() => setPage("start")} />}
        </Container>
    );
};

export default App;
