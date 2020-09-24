<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Context } from "./Form.svelte";
  import { FORM } from "./Form.svelte";

  type InputType = "text" | "email";

  export let type: InputType = "text";
  export let name: string;
  export let label: string;
  export let autocomplete = "off";

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
  label {
    @apply mb-2 block;
    @apply text-gray-700 text-sm font-bold;
  }

  input {
    @apply w-full py-2 px-3 appearance-none;
    @apply text-gray-700 border rounded shadow leading-tight;

    &:focus {
      @apply outline-none shadow-outline;
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

  {#if hasError(name)}
    <div>{getError(name)}</div>
  {/if}
</div>
