<script lang="ts">
  import Button from "../components/Button.svelte";
  import Form from "../components/Form/Form.svelte";
  import PasswordField from "../components/Form/PasswordField.svelte";
  import TextField from "../components/Form/TextField.svelte";
  import { signInEmailAndPassword, signInWithGoogle } from "../services/auth";
</script>

<style lang="scss">
  :global(form) {
    @apply grid gap-y-4;
  }

  :global(.button) {
    @apply text-white;
  }

  :global(.button)[type="submit"] {
    @apply bg-blue-500;

    &:hover {
      @apply bg-blue-700;
    }
  }

  :global(.button)[type="button"] {
    @apply bg-red-500;

    &:hover {
      @apply bg-red-600;
    }
  }
</style>

<Form on:submit={({ detail }) => signInEmailAndPassword({ ...detail.values })}>
  <TextField label="Email" name="email" type="email" />
  <PasswordField label="Password" name="password" />
  <Button type="submit">Log In</Button>
</Form>

<Button type="button" on:click={signInWithGoogle}>Sign In With Google</Button>
