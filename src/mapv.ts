import AnyVal, { Val } from './anyval';

export default class MapV<K extends AnyVal, V> {

  static make = <K extends AnyVal, V>(kvs: Array<[K, V]>): MapV<K, V> => {
    return new MapV(new Map(kvs.map(([k, v]) => [k.key, v])));
  }
  
  data: Map<Val, V>

  get copy(): MapV<K, V> {
    return new MapV(new Map([...this.data.entries()]));
  }

  constructor(data: Map<Val, V>) {
    this.data = data;
  }


  values() {
    return this.data.values();
  }

  get(k: K) {
    return this.data.get(k.key);
  }

  set(k: K, v: V) {
    return this.data.set(k.key, v);
  }

  delete(k: K) {
    return this.data.delete(k.key);
  }
}
