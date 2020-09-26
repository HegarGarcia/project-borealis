<script lang="ts">
  import { redirect } from "@sveltech/routify";
  import { user } from "../services/auth";
</script>

<style lang="scss">
  div {
    @apply w-screen h-screen;
    @apply grid grid-rows-1 grid-cols-1;
  }
</style>

{#if !$user.uid}
  <div>
    <main>
      <slot />
    </main>
  </div>
{:else}{$redirect('/app')}{/if}
