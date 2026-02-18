import React from "react";
import { T, FD } from "../constants";
import "../animations.css";

function FlowerAnim({ result }: { result?: string | null }) {
    if (!result) return null;
    const ok = result === "correct";
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
        >
            <div
                style={{
                    fontSize: 80,
                    animation: `${ok ? "flowerBloom" : "flowerWilt"} .8s cubic-bezier(.175,.885,.32,1.275) both`,
                }}
            >
                {ok ? "🌸" : "🥀"}
            </div>
        </div>
    );
}

function BoxingAnim({ result }: { result?: string | null }) {
    if (!result) return null;
    const ok = result === "correct";
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                zIndex: 50,
            }}
        >
            <div
                style={{ fontSize: 48, animation: "punchRight .6s ease both" }}
            >
                {ok ? "🥊" : "😵"}
            </div>
            <div
                style={{
                    fontSize: 28,
                    fontFamily: FD,
                    fontWeight: 900,
                    color: ok ? T.green : T.red,
                    textShadow: `0 0 20px ${ok ? T.green : T.red}`,
                }}
            >
                {ok ? "KO !" : "RATÉ !"}
            </div>
            <div
                style={{
                    fontSize: 48,
                    animation: "punchLeft .6s ease both",
                    transform: "scaleX(-1)",
                }}
            >
                {ok ? "😵" : "🥊"}
            </div>
        </div>
    );
}

function StarAnim({ result }: { result?: string | null }) {
    if (!result) return null;
    const ok = result === "correct";
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
        >
            {ok ? (
                <div style={{ position: "relative" }}>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                fontSize: 24,
                                top: "50%",
                                left: "50%",
                                marginLeft: -12,
                                marginTop: -12,
                                animation: `starBurst .8s ease ${i * 0.1}s both`,
                                transform: `rotate(${i * 60}deg) translateY(-40px)`,
                            }}
                        >
                            ⭐
                        </div>
                    ))}
                    <div
                        style={{
                            fontSize: 56,
                            animation: "bounceIn .5s ease both",
                        }}
                    >
                        ⭐
                    </div>
                </div>
            ) : (
                <div style={{ fontSize: 64, animation: "shake .4s ease" }}>
                    💫
                </div>
            )}
        </div>
    );
}

function DuelAnim({ result }: { result?: string | null }) {
    if (!result) return null;
    const ok = result === "correct";
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                zIndex: 50,
            }}
        >
            <div
                style={{
                    fontSize: 48,
                    animation: `${ok ? "bounceIn" : "shake"} .5s ease both`,
                }}
            >
                {ok ? "🚀" : "💥"}
            </div>
            <div
                style={{
                    fontFamily: FD,
                    fontWeight: 900,
                    fontSize: 22,
                    color: ok ? T.green : T.red,
                }}
            >
                {ok ? "TOUCHÉ !" : "ESQUIVÉ !"}
            </div>
        </div>
    );
}

const ANIM_COMPONENTS: Record<
    string,
    React.ComponentType<{ result?: string | null }>
> = {
    flower: FlowerAnim,
    boxing: BoxingAnim,
    star: StarAnim,
    duel: DuelAnim,
};

export function SkinWrapper({
    skin,
    result,
    children,
}: {
    skin?: string;
    result?: string | null;
    children: React.ReactNode;
}) {
    const Anim = skin ? ANIM_COMPONENTS[skin] : null;
    return (
        <div style={{ position: "relative", minHeight: 200 }}>
            {children}
            {Anim && <Anim result={result} />}
        </div>
    );
}
