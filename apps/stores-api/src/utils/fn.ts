function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> {
    const copy = { ...obj };
    keys.forEach(key => delete copy[key]);
    return copy;
}
const shuffle = <T>(arr: T[]) =>
    arr.sort(() => Math.random() - 0.5);
export {
    omit,
    shuffle
}
