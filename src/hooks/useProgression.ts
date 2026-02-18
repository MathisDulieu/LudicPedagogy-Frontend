export function computeLevel(xp: number): number {
    // Simple XP to level formula: level = floor(sqrt(xp / 100)) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXpForLevel(level: number): number {
    // Inverse of computeLevel
    return (level - 1) * (level - 1) * 100;
}

export function getXpProgress(xp: number): {
    currentLevel: number;
    xpInLevel: number;
    xpNeededForNext: number;
    progress: number;
} {
    const currentLevel = computeLevel(xp);
    const xpForCurrentLevel = getXpForLevel(currentLevel);
    const xpForNextLevel = getXpForLevel(currentLevel + 1);
    const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
    const xpInLevel = xp - xpForCurrentLevel;
    const progress = (xpInLevel / xpNeededForNext) * 100;

    return {
        currentLevel,
        xpInLevel,
        xpNeededForNext,
        progress,
    };
}
