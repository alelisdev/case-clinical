
import { Primitive } from "./Primitive";

export interface IComparable<T> {
  compareTo(other: T): number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type Comparable = Primitive | IComparable<any>;

export default IComparable;
