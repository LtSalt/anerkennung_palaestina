export function toBoolean(s) {
    return s === "TRUE" ? true : s === "FALSE" ? false : null
}

export function toNumber(s) {
    const c = Number(s);
    const n = isNaN(c) ? null : c;

    return n
}

export function toYear(s) {
    const c = Number(s);
    const n = isNaN(c) ? 2025 : c;

    return n
}