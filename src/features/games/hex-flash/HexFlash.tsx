import { useState, useEffect } from "react";
import type { HexFlashData, GameProps } from "../../../types/game";

interface Color {
    hex: string;
    name: string;
}

const COLORS: Color[] = [
    { hex: "#00FFFF", name: "cyan" },
    { hex: "#FF00FF", name: "magenta" },
    { hex: "#FFFF00", name: "yellow" },
    { hex: "#39FF14", name: "green" },
];

export default function HexFlash({ onScore }: GameProps<HexFlashData>) {
    const [target, setTarget] = useState<Color | null>(null);

    function nextRound() {
        const random = COLORS[Math.floor(Math.random() * COLORS.length)];
        setTarget(random);
    }

    useEffect(() => {
        nextRound();
    }, []);

    function handleClick(color: Color) {
        if (target && color.hex === target.hex) {
            onScore(10);
        }
        nextRound();
    }

    return (
        <div className="bg-slate-900 border-2 border-primary-500/50 rounded-xl p-6 shadow-[0_0_20px_rgba(14,165,233,0.3)] text-center max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                HEX FLASH
            </h2>

            {target && (
                <div className="space-y-6">
                    <div>
                        <p className="text-slate-400 mb-2">
                            Associe ce code couleur :
                        </p>
                        <div className="font-mono text-3xl font-bold text-accent-400 tracking-wider">
                            {target.hex}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {COLORS.map((color) => (
                            <button
                                key={color.hex}
                                className="h-20 rounded-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-white/20 active:scale-95 cursor-pointer"
                                style={{ backgroundColor: color.hex }}
                                onClick={() => handleClick(color)}
                                aria-label={`Choose ${color.name}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
