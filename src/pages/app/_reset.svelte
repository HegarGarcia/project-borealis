<script lang="ts">
  import { redirect } from "@sveltech/routify";

  import Nav from "../../components/Nav.svelte";
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
  <Nav />
  <main>
    <slot />
  </main>
</div>
