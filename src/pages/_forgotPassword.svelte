<script lang="ts">
  import Form from "../components/Form/Form.svelte";
  import TextField from "../components/Form/TextField.svelte";
  import { recoverPassword } from "../services/auth";
</script>

<style lang="scss">
  :global(form) {
    @apply grid gap-y-4;

    button[type="submit"] {
      @apply w-full py-2 px-4;
      @apply bg-blue-500 text-white font-bold  rounded;

      &:hover {
        @apply bg-blue-700;
      }

      &:focus {
        @apply outline-none;
      }
    }
  }
</style>

<Form on:submit={({ detail }) => recoverPassword({ ...detail.values })}>
  <TextField label="Email" name="email" type="email" />
  <button type="submit">Recover</button>
</Form>
