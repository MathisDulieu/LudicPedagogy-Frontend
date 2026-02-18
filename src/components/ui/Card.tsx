import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({
    children,
    className = "",
    hoverEffect = false,
}: CardProps) {
    return (
        <div
            className={`
                bg-slate-900 
                border border-slate-800 
                rounded-xl 
                p-6 
                shadow-xl 
                transition-all duration-300
                ${
                    hoverEffect
                        ? "hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:border-primary-500/50 hover:-translate-y-1"
                        : ""
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}
