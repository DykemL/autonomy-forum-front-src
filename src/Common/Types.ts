export type AnyObject = Record<string, any>;
export type Nullable<T> = T | undefined;
export type State<T> = [state: T, setState: (state: T) => void];