export interface Convertable<T> {
  convertFrom(obj: T): this;
}
