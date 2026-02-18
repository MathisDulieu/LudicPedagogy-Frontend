import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface GameShellProps {
    children: (props: { addScore: (points: number) => void }) => ReactNode;
    duration?: number;
    onGameEnd?: (score: number) => void;
}

export default function GameShell({
    children,
    duration = 30,
    onGameEnd,
}: GameShellProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [score, setScore] = useState(0);
    const [isOver, setIsOver] = useState(false);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    endGame();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    function addScore(points: number) {
        setScore((s) => s + points);
    }

    function endGame() {
        setIsOver(true);
        onGameEnd?.(score);
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* HUD */}
            <header className="hud sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                        ⏱{" "}
                        <span
                            className={
                                timeLeft <= 5 ? "text-danger animate-pulse" : ""
                            }
                        >
                            {timeLeft}s
                        </span>
                    </span>
                </div>
                <div>
                    <span className="text-lg font-semibold">
                        ⭐ Score :{" "}
                        <span className="text-primary-300">{score}</span>
                    </span>
                </div>
            </header>

            {/* Game Content */}
            <main className="flex-1 flex items-center justify-center p-8">
                {!isOver ? children({ addScore }) : <GameOver score={score} />}
            </main>
        </div>
    );
}

function GameOver({ score }: { score: number }) {
    return (
        <div className="terminal-box text-center max-w-lg">
            <div className="text-6xl mb-6 animate-bounce-slow">🎮</div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Partie terminée !
            </h1>
            <div className="my-8">
                <p className="text-slate-400 text-lg mb-2">Score final</p>
                <p className="text-6xl font-bold text-primary-300">{score}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                    onClick={() => window.location.reload()}
                    className="neon-button"
                >
                    Rejouer
                </button>
                <Link
                    to="/hub"
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-primary-500/50 hover:border-primary-400 hover:bg-slate-800/50 transition-all duration-300"
                >
                    Retour au Hub
                </Link>
            </div>
        </div>
    );
}
