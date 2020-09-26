<script lang="ts">
  import List from "./List.svelte";
  import Profile from "./Profile.svelte";
</script>

<style lang="scss">
  aside {
    @apply grid grid-cols-1 gap-2 p-2;
    grid-template-rows: auto 1fr 1fr;
  }
</style>

<aside>
  <Profile />
  <List title="Projects" baseUrl="/app/project" />
  <List title="Recipes" />
</aside>
