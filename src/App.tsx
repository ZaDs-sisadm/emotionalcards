import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import { ResultsProvider } from "./context/ResultsContext";
import Container from "./components/Layout/Container";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import UserPage from "./pages/UserPage";

const App: React.FC = () => {
    return (
        <SettingsProvider>
            <ResultsProvider>
                <BrowserRouter>
                    <Container>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/user/:userId" element={<UserPage />} />
                            <Route path="/user/:userId/game" element={<GamePage />} />
                            <Route path="/user/:userId/results" element={<ResultsPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </ResultsProvider>
        </SettingsProvider>
    );
};

export default App;
