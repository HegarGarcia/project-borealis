<script lang="ts">
  import ForgotPassword from "./_forgotPassword.svelte";
  import SignIn from "./_signin.svelte";
  import SignUp from "./_signup.svelte";

  type Page = "login" | "signup" | "forgot";
  let page: Page = "login";
  let title: string;
  let form: any;

  $: switch (page) {
    case "login":
      title = "Log In";
      form = SignIn;
      break;
    case "forgot":
      title = "Forgot Password";
      form = ForgotPassword;
      break;
    case "signup":
      title = "Register";
      form = SignUp;
      break;
  }
</script>

<style lang="scss">
  :global(main) {
    @apply grid place-content-center;
    @apply bg-gray-300;
  }

  section {
    @apply w-full max-w-xs px-8 pt-6 pb-8 mb-4;
    @apply grid gap-y-4;
    @apply bg-white shadow-md rounded;

    header h1 {
      @apply text-gray-900 font-bold text-xl text-center;
    }

    div {
      @apply grid gap-2;
      @apply text-center;

      button {
        @apply inline-block align-baseline font-bold text-sm text-blue-500;

        &:hover {
          @apply text-blue-800;
        }
      }
    }
  }
</style>

<section>
  <header>
    <h1>{title}</h1>
  </header>

  <svelte:component this={form} />

  <div>
    {#if page === 'login'}
      <button on:click={() => (page = 'forgot')}>Forgot Password?</button>
      <hr />
      <button on:click={() => (page = 'signup')}>Register</button>
    {:else if page === 'signup'}
      <button on:click={() => (page = 'login')}>Log In</button>
    {:else if page === 'forgot'}
      <button on:click={() => (page = 'login')}>Log In</button>
    {/if}
  </div>
</section>
