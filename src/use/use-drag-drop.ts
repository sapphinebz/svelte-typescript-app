import { fromDragDrop } from "../utils/from-drag-drop";

export function useDragDrop(node: HTMLElement) {
  const subscription = fromDragDrop(node).subscribe();
  return {
    destroy: () => {
      subscription.unsubscribe();
    },
  };
}
