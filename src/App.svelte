<script lang="ts">
  import {
    BehaviorSubject,
    Subject,
    switchMap,
    from,
    mergeMap,
    toArray,
    share,
  } from "rxjs";
  import { swordFishImageSrc } from "../images/swordfish";
  import { useDragDrop } from "./use/use-drag-drop";
  import * as Store from "./store/store";
  import type { StoreContract } from "../models/store-contract";
  import { ajax } from "rxjs/ajax";

  function fetchPokemon(limit: number, offset: number) {
    return ajax.getJSON<{ results: any[]; count: number }>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  const subject = new Subject<{ limit: number; offset: number }>();
  let count = 0;

  const pokemons = subject.pipe(
    switchMap(({ limit, offset }) => {
      return fetchPokemon(limit, offset);
    }),
    switchMap((res) => {
      count = res.count;
      return from(res.results).pipe(
        mergeMap((result) => ajax.getJSON<any>(result.url)),
        toArray()
      );
    }),
    share()
  );

  const store = Store.store;

  $: limit = $store.limit;
  $: offset = $store.offset;
  $: totalPage = Math.ceil(count / limit);
  $: page = (offset + limit) / limit;
  $: {
    subject.next({ limit, offset });
  }
</script>

<main>
  <button
    on:click={(event) => {
      Store.prevPage();
    }}>prev</button
  >
  {page} / {totalPage}
  <button
    on:click={(event) => {
      Store.nextPage();
    }}>next</button
  >

  {#if $pokemons}
    <div class="model-container">
      {#each $pokemons as result}
        <div class="model-pokemon">
          <div>
            <img use:useDragDrop src={result.sprites.front_default} alt="" />
          </div>
          <div>{result.name}</div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .model-container {
    display: flex;
    flex-wrap: wrap;
  }
  .model-pokemon {
    display: flex;
    flex-direction: column;
  }
</style>
