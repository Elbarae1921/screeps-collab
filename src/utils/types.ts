export type Brand<T, V> = T & { __type: V };
export type Flavor<T, V> = T & { __type?: V };
