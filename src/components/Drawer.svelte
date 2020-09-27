<script lang="ts">
  import LinkList from "./LinkList.svelte";
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
  <LinkList title="Projects" items={$projects} queryKey="project" />
  <LinkList title="Recipes" items={$recipes} queryKey="recipe" />
</aside>
