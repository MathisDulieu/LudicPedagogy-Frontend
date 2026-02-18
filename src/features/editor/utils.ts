export const uid = () => Math.random().toString(36).slice(2, 8);

export const clamp = (n: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, n));

export const shuffle = <T>(a: T[]): T[] =>
    [...a].sort(() => Math.random() - 0.5);
