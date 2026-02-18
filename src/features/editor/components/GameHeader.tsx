import type { GameData } from "../../../types/game";
import { T, FD } from "../constants";

const DARK = {
    bg: "#0d0c15",
    card: "#171525",
    text: "#f0eeff",
    muted: "#7a7890",
    border: "#2a2840",
};

export function GameHeader({ game }: { game: GameData }) {
    return (
        <div style={{ marginBottom: 16 }}>
            {game.image && (
                <img
                    src={game.image}
                    alt=""
                    style={{
                        width: "100%",
                        height: 110,
                        objectFit: "cover",
                        borderRadius: 12,
                        marginBottom: 12,
                        display: "block",
                    }}
                />
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                    style={{
                        fontFamily: FD,
                        fontWeight: 700,
                        fontSize: 13,
                        color: DARK.text,
                    }}
                >
                    {game.title}
                </span>
                <span
                    style={{
                        background: T.accentLo,
                        color: T.accent,
                        borderRadius: 99,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: FD,
                    }}
                >
                    +{game.xpCorrect} XP
                </span>
            </div>
        </div>
    );
}
