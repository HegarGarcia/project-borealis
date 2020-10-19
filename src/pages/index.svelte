<script lang="ts">
  import { always, cond, equals, or } from "ramda";
  import ForgotPassword from "./_forgotPassword.svelte";
  import SignIn from "./_signin.svelte";
  import SignUp from "./_signup.svelte";

  interface Page {
    title: string;
    component: unknown;
  }

  enum PageTypes {
    login,
    signup,
    forgot,
  }

  let pageName = PageTypes.login;

  const isLogin = equals(PageTypes.login);
  const isForgot = equals(PageTypes.forgot);
  const isRegister = equals(PageTypes.signup);

  const getPage = cond<PageTypes, Page>([
    [isLogin, always({ title: "Log In", component: SignIn })],
    [isForgot, always({ title: "Forgot Password", component: ForgotPassword })],
    [isRegister, always({ title: "Register", component: SignUp })],
  ]);

  let page: Page;
  $: page = getPage(pageName);
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
    <h1>{page.title}</h1>
  </header>

  <svelte:component this={page.component} />

  <div>
    {#if isLogin(pageName)}
      <button on:click={() => (pageName = PageTypes.forgot)}>Forgot Password?</button>
      <hr />
      <button on:click={() => (pageName = PageTypes.signup)}>Register</button>
    {:else if or(isRegister(pageName), isForgot(pageName))}
      <button on:click={() => (pageName = PageTypes.login)}>Log In</button>
    {/if}
  </div>
</section>
