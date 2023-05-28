export type Maybe<T> = T | undefined | null

export function setTimeoutPromise(timeout: number): Promise<void> {
    return new Promise(res => setTimeout(res, timeout));
}