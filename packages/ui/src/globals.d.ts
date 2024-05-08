declare type Suggestion<Options> = Options | (string & {});

declare type CouldBePromise<T> = T | Promise<T>;
