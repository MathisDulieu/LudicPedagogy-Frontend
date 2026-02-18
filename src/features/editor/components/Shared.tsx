import React, { useState, useRef } from "react";
import { T, FB, FD, SKINS } from "../constants";

// ── SHARED UI ───────────────────────────────────────────────────────────────

export function Label({
    children,
    required,
}: {
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label
            style={{
                display: "block",
                fontFamily: FB,
                fontWeight: 600,
                fontSize: 11,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: ".07em",
                marginBottom: 5,
            }}
        >
            {children}
            {required && <span style={{ color: T.accent }}> *</span>}
        </label>
    );
}

export function SectionTitle({
    emoji,
    title,
}: {
    emoji: string;
    title: string;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
            }}
        >
            <span style={{ fontSize: 18 }}>{emoji}</span>
            <span
                style={{
                    fontFamily: FD,
                    fontWeight: 700,
                    fontSize: 13,
                    color: T.text,
                }}
            >
                {title}
            </span>
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    textarea?: boolean;
    rows?: number;
}

export function Input({
    value,
    onChange,
    placeholder,
    style = {},
    type = "text",
    label,
    textarea,
    rows = 3,
    ...rest
}: InputProps) {
    const [f, setF] = useState(false);
    const baseStyle: React.CSSProperties = {
        width: "100%",
        padding: "9px 12px",
        borderRadius: 9,
        border: `1.5px solid ${f ? T.borderHi : T.border}`,
        background: T.bg3,
        fontFamily: FB,
        fontSize: 13,
        color: T.text,
        outline: "none",
        boxShadow: f ? `0 0 0 3px ${T.accentLo}` : "none",
        transition: "border-color .15s,box-shadow .15s",
        resize: textarea ? "vertical" : undefined,
        ...style,
    };

    const content = textarea ? (
        <textarea
            value={value}
            onChange={onChange as any}
            placeholder={placeholder}
            rows={rows}
            onFocus={() => setF(true)}
            onBlur={() => setF(false)}
            style={baseStyle}
            {...(rest as any)}
        />
    ) : (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            onFocus={() => setF(true)}
            onBlur={() => setF(false)}
            style={baseStyle}
            {...rest}
        />
    );

    if (label) {
        return (
            <div style={{ marginBottom: style.marginBottom ?? 12 }}>
                <Label>{label}</Label>
                {content}
            </div>
        );
    }
    return content;
}

export function Textarea(props: InputProps) {
    return <Input {...props} textarea={true} />;
}

export function Toggle({
    value,
    onChange,
    label,
}: {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
            }}
            onClick={() => onChange(!value)}
        >
            <div
                style={{
                    width: 38,
                    height: 21,
                    borderRadius: 99,
                    background: value ? T.accent : T.dim,
                    position: "relative",
                    transition: "background .2s",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 3,
                        left: value ? 19 : 3,
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left .2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,.3)",
                    }}
                />
            </div>
            <span style={{ fontFamily: FB, fontSize: 13, color: T.text }}>
                {label}
            </span>
        </div>
    );
}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
    small?: boolean;
}

export function Btn({
    children,
    onClick,
    variant = "primary",
    small = false,
    style = {},
    disabled = false,
    ...rest
}: BtnProps) {
    const [h, setH] = useState(false);
    const base: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        borderRadius: 9,
        fontFamily: FD,
        fontWeight: 700,
        fontSize: small ? 11 : 13,
        padding: small ? "5px 11px" : "10px 18px",
        transition: "all .15s",
        opacity: disabled ? 0.5 : 1,
        ...style,
    };

    const vs = {
        primary: {
            background: h ? "#6d28d9" : T.accent,
            color: "#fff",
            boxShadow: h ? T.shadowLg : T.shadow,
        },
        secondary: {
            background: h ? T.bg3 : T.bg2,
            color: T.text,
            border: `1px solid ${T.border}`,
        },
        ghost: { background: h ? T.bg3 : "transparent", color: T.muted },
        danger: { background: h ? "#7f1d1d" : T.redLo, color: T.red },
        success: { background: h ? "#14532d" : T.greenLo, color: T.green },
    };

    return (
        <button
            onClick={disabled ? undefined : onClick}
            style={{ ...base, ...(vs[variant] as any) }}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
}

export function Card({
    children,
    style = {},
    className,
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}) {
    return (
        <div
            className={className}
            style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: 18,
                boxShadow: T.shadow,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

// ── IMAGE UPLOADER ────────────────────────────────────────────────────────────
export function ImageUploader({
    value,
    onChange,
    label = "Image (optionnel)",
}: {
    value?: string | null;
    onChange: (v: string | null) => void;
    label?: string;
}) {
    const ref = useRef<HTMLInputElement>(null);
    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => onChange(ev.target?.result as string);
        reader.readAsDataURL(file);
    };
    return (
        <div>
            <Label>{label}</Label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {value ? (
                    <div style={{ position: "relative" }}>
                        <img
                            src={value}
                            alt=""
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 10,
                                objectFit: "cover",
                                border: `2px solid ${T.border}`,
                            }}
                        />
                        <button
                            onClick={() => onChange(null)}
                            style={{
                                position: "absolute",
                                top: -6,
                                right: -6,
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                background: T.red,
                                border: "none",
                                color: "#fff",
                                fontSize: 11,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => ref.current?.click()}
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 10,
                            border: `2px dashed ${T.border}`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            gap: 4,
                            transition: "border-color .15s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = T.accent)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = T.border)
                        }
                    >
                        <span style={{ fontSize: 22 }}>📷</span>
                        <span
                            style={{
                                fontSize: 10,
                                color: T.muted,
                                fontFamily: FB,
                            }}
                        >
                            Upload
                        </span>
                    </div>
                )}
                <input
                    ref={ref}
                    type="file"
                    accept="image/*"
                    onChange={handle}
                    style={{ display: "none" }}
                />
                <div
                    style={{
                        fontSize: 12,
                        color: T.muted,
                        fontFamily: FB,
                        lineHeight: 1.5,
                    }}
                >
                    PNG, JPG, GIF…
                    <br />
                    Affiché dans l'aperçu du jeu
                </div>
            </div>
        </div>
    );
}

// ── SKIN PICKER ───────────────────────────────────────────────────────────────
export function SkinPicker({
    value,
    onChange,
}: {
    value?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <Label>Animation narrative</Label>
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginTop: 4,
                }}
            >
                {SKINS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => onChange(s.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "7px 12px",
                            borderRadius: 9,
                            cursor: "pointer",
                            fontFamily: FB,
                            fontSize: 12,
                            fontWeight: 600,
                            border: `1.5px solid ${value === s.id ? T.accent : T.border}`,
                            background: value === s.id ? T.accentLo : T.bg3,
                            color: value === s.id ? T.text : T.muted,
                            transition: "all .15s",
                        }}
                    >
                        <span style={{ fontSize: 16 }}>{s.emoji}</span>
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── ADVANCED GATE ─────────────────────────────────────────────────────────────
export function AdvancedGate({
    open,
    onToggle,
    children,
}: {
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div style={{ marginTop: 8 }}>
            <button
                onClick={onToggle}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: `1.5px dashed ${open ? T.accent : T.border}`,
                    borderRadius: 9,
                    padding: "8px 14px",
                    cursor: "pointer",
                    width: "100%",
                    fontFamily: FB,
                    fontSize: 12,
                    color: open ? T.accent : T.muted,
                    transition: "all .2s",
                }}
            >
                <span>{open ? "🔓" : "🔒"}</span>
                <span style={{ fontWeight: 600 }}>Paramètres avancés</span>
                <span style={{ marginLeft: "auto", opacity: 0.6 }}>
                    {open ? "▲" : "▼"}
                </span>
            </button>
            {open && (
                <div
                    className="fade-up"
                    style={{
                        marginTop: 10,
                        padding: 16,
                        background: T.accentLo,
                        border: `1.5px solid ${T.accentLo}`,
                        borderRadius: 11,
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

// ── ANSWER RADIO BUTTON ───────────────────────────────────────────────────────
export function AnswerBtn({
    active,
    onClick,
}: {
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            title="Bonne réponse"
            style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                flexShrink: 0,
                cursor: "pointer",
                border: `2px solid ${active ? T.green : T.border}`,
                background: active ? T.greenLo : T.bg3,
                color: active ? T.green : T.muted,
                fontSize: 14,
                transition: "all .15s",
            }}
        >
            ✓
        </button>
    );
}
