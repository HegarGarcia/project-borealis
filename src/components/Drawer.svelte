<script lang="ts">
  import List from "./List.svelte";
  import Profile from "./Profile.svelte";
  import { projects } from "../services/projects";
  import { recipes } from "../services/recipes";
</script>

<style lang="scss">
  aside {
    @apply grid grid-cols-1 grid-rows-drawer gap-2 p-2;
  }
</style>

<aside>
  <Profile />
  <List title="Projects" items={$projects} queryKey="project" />
  <List title="Recipes" items={$recipes} queryKey="recipe" />
</aside>
