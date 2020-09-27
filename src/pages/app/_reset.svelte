<script lang="ts">
  import { redirect } from "@sveltech/routify";
  import Drawer from "../../components/Drawer.svelte";
  import { user } from "../../services/auth";

  $: if (!$user.uid) {
    $redirect("/");
  }
</script>

<style lang="scss">
  div {
    @apply w-screen h-screen;
    @apply grid grid-cols-app;
  }
</style>

<div>
  <Drawer />
  <main>
    <slot />
  </main>
</div>
