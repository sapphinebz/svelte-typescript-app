import { ajax } from "rxjs/ajax";
import { share } from "rxjs/operators";

export function svelteHttpGet(url: string) {
  return ajax.getJSON(url).pipe(share());
}
