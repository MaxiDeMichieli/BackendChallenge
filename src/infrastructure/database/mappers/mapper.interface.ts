export interface IDBMapper<T, U> {
  toDomain: (entity: U) => T;

  toDatabase: (entity: T) => U;

  toDatabasePartial: (entity: Partial<T>) => Partial<U>;
}
