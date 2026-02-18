import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "ghost" | "neon";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20",
        secondary:
            "bg-secondary-600 hover:bg-secondary-500 text-white shadow-lg shadow-secondary-500/20",
        accent: "bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-accent-500/20",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white",
        neon: "bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
