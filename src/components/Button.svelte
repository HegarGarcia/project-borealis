<script lang="ts">
  type ButtonType = "button" | "submit";
  export let type: ButtonType = "button";
</script>

<style lang="scss">
  button {
    @apply w-full py-2 px-4;
    @apply font-bold  rounded;

    &:focus {
      @apply outline-none;
    }
  }
</style>

<button on:click class="button" {type}>
  <slot />
</button>
