import React from "react";
import GameRenderer from "../../games/GameRenderer";
import {
    PreviewTrueFalse,
    PreviewFillBlank,
    PreviewConnect,
    PreviewTimeline,
    PreviewEnigma,
} from "./LegacyPreviews";
import type { GameData } from "../../../types/game";

const LEGACY_PREVIEWS: Record<string, React.ComponentType<{ game: any }>> = {
    truefalse: PreviewTrueFalse,
    fillblank: PreviewFillBlank,
    connect: PreviewConnect,
    timeline: PreviewTimeline,
    enigma: PreviewEnigma,
};

export function LivePreviewWrapper({ game }: { game: GameData }) {
    // New standardized games
    if (["qcm", "wario", "memory", "sort"].includes(game.type)) {
        return (
            <div
                className="game-renderer-wrapper"
                style={{ background: "#0f172a", borderRadius: 16, padding: 2 }}
            >
                <GameRenderer
                    game={game}
                    onScore={(s) => console.log("Preview Score:", s)}
                />
            </div>
        );
    }
    // Legacy games
    const LegacyComp = LEGACY_PREVIEWS[game.type];
    if (LegacyComp) return <LegacyComp game={game} />;

    return (
        <div style={{ color: "white" }}>
            Aperçu non disponible pour {game.type}
        </div>
    );
}

// Proxy to allow dynamic access if needed (like in original GameEditor)
export const PREVIEWS = new Proxy(
    {},
    {
        get: () => LivePreviewWrapper,
    },
);
