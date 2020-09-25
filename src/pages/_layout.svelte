<script lang="ts">
  import { redirect } from "@sveltech/routify";
  import { user } from "../services/auth";
</script>

<style>
  :global(body) {
    @apply grid;
  }
</style>

{#if !$user.uid}
  <main>
    <slot />
  </main>
{:else}{$redirect('/app')}{/if}
