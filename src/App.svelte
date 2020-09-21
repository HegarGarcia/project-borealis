<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
</script>

<style global>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>

<Router {routes} />
