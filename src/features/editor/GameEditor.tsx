import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { GameData } from "../../types/game";
import { useGames } from "../../contexts/useGameContext";
import { GameHub } from "./components/GameHub";
import { EditorScreen } from "./components/EditorScreen";
import { ExportModal } from "./components/ExportModal";
import { T } from "./constants";
import "./animations.css";

// Inject fonts dynamically
const fl = document.createElement("link");
fl.rel = "stylesheet";
fl.href =
    "https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
document.head.appendChild(fl);

export default function GameEditor() {
    const navigate = useNavigate();
    const { games, addGame, updateGame, deleteGame } = useGames();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [showExport, setShowExport] = useState(false);

    // Prevent body scroll when editor is open
    useEffect(() => {
        if (editingId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [editingId]);

    const handleCreate = (newGame: GameData) => {
        addGame(newGame);
        setEditingId(newGame.id);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Supprimer ce jeu ?")) return;
        deleteGame(id);
        if (editingId === id) setEditingId(null);
    };

    const handleUpdate = (updatedGame: GameData) => {
        updateGame(updatedGame);
    };

    const handleBack = () => {
        setEditingId(null);
    };

    const activeGame = editingId
        ? games.find((g: GameData) => g.id === editingId)
        : null;

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
