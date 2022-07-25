import { map, OperatorFunction, pipe } from "rxjs";

export function json<T>(): OperatorFunction<T, string> {
  return pipe(map((object) => JSON.stringify(object)));
}
