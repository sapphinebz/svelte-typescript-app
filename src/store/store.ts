import { writable } from "svelte/store";

interface PokemonsState {
  limit: number;
  offset: number;
}

export const store = writable<PokemonsState>({
  limit: 10,
  offset: 0,
});

// Action
export const nextPage = () => {
  store.update((state: PokemonsState) => {
    state.offset += state.limit;
    return state;
  });
};

export const prevPage = () => {
  store.update((state: PokemonsState) => {
    if (state.offset - state.limit >= 0) {
      state.offset -= state.limit;
    }
    return state;
  });
};
