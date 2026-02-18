import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { GameData } from "../../types/game";
import { GameHub } from "./components/GameHub";
import { EditorScreen } from "./components/EditorScreen";
import { ExportModal } from "./components/ExportModal";
import { T } from "./constants";
import "./animations.css";

// Inject fonts dynamically as in original file, or rely on index.html?
// Original file injected it. Let's do it here just in case, but usually better in index.html.
const fl = document.createElement("link");
fl.rel = "stylesheet";
fl.href =
    "https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
document.head.appendChild(fl);

export default function GameEditor() {
    const navigate = useNavigate();
    // Initial state from localStorage or empty array?
    // Original file used hardcoded defaults inside sub-components or empty state?
    // Original file had `const [games,setGames]=useState([])`

    // We can try to load from localStorage for persistence during dev
    const [games, setGames] = useState<GameData[]>(() => {
        try {
            const saved = localStorage.getItem("ludic-games");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [showExport, setShowExport] = useState(false);

    // Persistence
    useEffect(() => {
        localStorage.setItem("ludic-games", JSON.stringify(games));
    }, [games]);

    const handleCreate = (newGame: GameData) => {
        setGames((prev) => [...prev, newGame]);
        setEditingId(newGame.id);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Supprimer ce jeu ?")) return;
        setGames((prev) => prev.filter((g) => g.id !== id));
        if (editingId === id) setEditingId(null);
    };

    const handleUpdate = (updatedGame: GameData) => {
        setGames((prev) =>
            prev.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
        );
    };

    const handleBack = () => {
        setEditingId(null);
    };

    const activeGame = editingId ? games.find((g) => g.id === editingId) : null;

    if (activeGame) {
        return (
            <EditorScreen
                game={activeGame}
                onUpdate={handleUpdate}
                onBack={handleBack}
            />
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
            <GameHub
                games={games}
                onCreate={handleCreate}
                onEdit={setEditingId}
                onDelete={handleDelete}
                onExport={() => setShowExport(true)}
                onExit={() => navigate(-1)}
            />
            {showExport && (
                <ExportModal
                    games={games}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div>
    );
}
