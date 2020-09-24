<script lang="ts" context="module">
  import { getContext, onMount } from "svelte";
  import type { Context } from "./Form.svelte";
  import { FORM } from "./Form.svelte";
  import Visibility from "../../icons/Visibility.svelte";
  import VisibilityOff from "../../icons/VisibilityOff.svelte";
</script>

<script lang="ts">
  export let name: string;
  export let label = "";
  export let autocomplete = "off";

  let hasVisibility = false;
  $: type = hasVisibility ? "text" : "password";

  const {
    onInput,
    values,
    setTouched,
    register,
    getError,
    hasError,
  } = getContext<Context>(FORM);

  onMount(() => {
    register(name);
  });
</script>

<style lang="scss">
  div {
    @apply grid gap-y-1 gap-x-2 items-center;
    grid-template-columns: 1fr auto;

    label {
      @apply block col-span-2;
      @apply text-gray-700 text-sm font-bold;
    }

    input {
      @apply w-full py-2 px-3;
      @apply shadow appearance-none border rounded;
      @apply text-gray-700 leading-tight;

      &:focus {
        @apply outline-none shadow-outline;
      }
    }

    button {
      @apply outline-none p-2 bg-white;
      fill: theme("colors.gray.700");
    }
  }
</style>

<div>
  {#if label}<label for={label}>{label}</label>{/if}

  <input
    {name}
    {type}
    {autocomplete}
    id={name}
    value={$values[name]}
    on:input={onInput}
    on:blur={() => setTouched(name)} />

  <button on:click={() => (hasVisibility = !hasVisibility)} type="button">
    {#if hasVisibility}
      <Visibility />
    {:else}
      <VisibilityOff />
    {/if}
  </button>

  {#if hasError(name)}
    <div>{getError(name)}</div>
  {/if}
</div>
