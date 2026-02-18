import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        globals: true, // Active les globals (describe, it, expect, vi)
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        include: ["tests/**/*.{test,spec}.{ts,tsx}"],
        exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html", "lcov"],
            reportsDirectory: "./tests/coverage",
            include: ["src/**/*.{ts,tsx}"],
            exclude: [
                "src/**/*.d.ts",
                "src/**/*.config.{ts,tsx}",
                "src/main.tsx",
                "src/vite-env.d.ts",
                "**/*.test.{ts,tsx}",
                "**/*.spec.{ts,tsx}",
            ],
            thresholds: {
                lines: 50,
                functions: 50,
                branches: 50,
                statements: 50,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@tests": path.resolve(__dirname, "./tests"),
        },
    },
});
