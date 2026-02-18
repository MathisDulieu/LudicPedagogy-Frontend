export interface EditorProps<T> {
    game: T;
    update: (partial: Partial<T>) => void;
    advOpen?: boolean;
    setAdv?: React.Dispatch<React.SetStateAction<boolean>>;
}
