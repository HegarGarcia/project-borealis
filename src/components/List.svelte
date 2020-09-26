<script lang="ts">
  import { url } from "@sveltech/routify";
  export let title: string;
  export let items: any[] = [];
  export let baseUrl: string = "";
</script>

<style lang="scss">
  section {
    h2 {
      @apply my-2;
      @apply text-gray-800 text-sm uppercase;
    }

    ul li {
      @apply p-2 rounded;
      @apply text-base select-none;

      &:hover {
        @apply bg-gray-300;
      }

      a {
        @apply block w-full h-full;
      }
    }
  }
</style>

<section>
  {#if title}
    <h2>{title}</h2>
  {/if}

  <ul>
    {#each items as item (item.id)}
      <li>
        {#if baseUrl}
          <a href={$url(`${baseUrl}/:id`, { id: item.id })}>{item.name}</a>
        {:else}{item.name}{/if}
      </li>
    {:else}
      <li>No {title}</li>
    {/each}
  </ul>
</section>
