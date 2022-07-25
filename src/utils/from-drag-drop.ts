import { fromEvent } from "rxjs";
import { switchMap, tap, takeUntil } from "rxjs/operators";

export function fromDragDrop(node: HTMLElement) {
  let cx = 0;
  let cy = 0;
  return fromEvent<MouseEvent>(node, "mousedown").pipe(
    switchMap((downEvent) => {
      downEvent.preventDefault();

      let dx = 0;
      let dy = 0;

      return fromEvent<MouseEvent>(document, "mousemove").pipe(
        tap((moveEvent) => {
          dx = moveEvent.x - downEvent.x;
          dy = moveEvent.y - downEvent.y;
          //   console.log(dx, dy);
          node.style.transform = `translate(${cx + dx}px,${cy + dy}px)`;
        }),
        takeUntil(
          fromEvent(document, "mouseup").pipe(
            tap(() => {
              cx = cx + dx;
              cy = cy + dy;
            })
          )
        )
      );
    })
  );
}
