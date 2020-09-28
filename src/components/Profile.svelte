<script lang="ts">
  import { goto } from "@sveltech/routify";
  import Close from "../icons/Close.svelte";
  import { signOut } from "../services/auth";
  import user from "../services/user";

  async function logOut() {
    await signOut();
    $goto("/");
  }
</script>

<style lang="scss">
  section {
    min-height: 2rem;
    @apply grid grid-rows-1 gap-2 items-center;
    grid-template-columns: 3rem 1fr 2rem;

    img {
      @apply rounded-full justify-self-center;
    }

    button {
      @apply w-full h-full;
      @apply grid place-items-center;
      @apply outline-none rounded;
      fill: theme("colors.gray.700");

      &:hover {
        @apply bg-gray-300;
      }
    }
  }
</style>

<section>
  <img src={$user.photoUrl} alt={$user.name} width="24" height="24" />
  <h1>{$user.name}</h1>
  <button type="button" on:click={logOut}>
    <Close />
  </button>
</section>
