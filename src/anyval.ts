export type Val = string | number

export default abstract class AnyVal {

  static combine = (a: Val, b: Val): Val => {
    return (a as string) + '' + (b as string);
  };

  static reduce = (aas: Array<Val>, initial: Val): Val => {
    return aas.reduce((a, b) => AnyVal.combine(a, b), initial);
  };
  
  readonly key: Val

  constructor(key: Val) {
    this.key = key;
  }
  
  equals(_: AnyVal): boolean {
    return this.key === _.key;
  }
}
