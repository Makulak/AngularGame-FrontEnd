export interface IConvertable<T> {
  convertFrom(input: T): this;
}
