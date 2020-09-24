<script context="module" lang="ts">
  import cloneDeep from "lodash/cloneDeep";
  import get from "lodash/get";
  import set from "lodash/set";
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  import type { ObjectSchema } from "yup";
  import { ValidationError } from "yup";
  import createProxy from "../../utils/proxy";

  export const FORM = Symbol("form");
  export interface Context {
    values: Writable<{}>;
    setValue(path: string, value: unknown): void;
    setTouched(path: string): void;
    register(name: string): void;
    onInput({ target }: any): void;
    hasError(name: string): boolean;
    getError(name: string): string;
  }
</script>

<script lang="ts">
  interface SubmitEvent {
    values: any;
    done(): void;
  }

  interface ComponentEvents {
    submit: CustomEvent<SubmitEvent>;
  }

  export let schema: ObjectSchema | null = null;

  const dispatch = createEventDispatcher();
  const values = writable(createProxy());
  const validatedValues = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);
  const fields = writable<string[]>([]);

  function setValue(path: string, value: unknown) {
    $values = set($values, path, value);
    setTouched(path);
  }

  function setTouched(path: string) {
    $touched = set($touched, path, true);
  }

  function register(name: string) {
    $fields = [...$fields, name];
  }

  function onInput({ target }) {
    setValue(target.name, target.value);
  }

  function hasError(name: string) {
    return get($touched, name) || get($errors, name);
  }

  function getError(name: string) {
    return get($errors, name);
  }

  function reset() {
    $values = createProxy();
  }

  async function validate() {
    if (!schema) {
      return true;
    }

    let isValid = false;
    $errors = {};

    try {
      $validatedValues = await schema.validate(cloneDeep($values), {
        abortEarly: false,
        stripUnknown: true,
      });
      isValid = true;
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        error.inner.forEach(({ path, message }) => {
          $errors = set($errors, path, message);
        });
      }
    }

    return isValid;
  }

  async function submit() {
    const isValid = await validate();

    if (!schema || isValid) {
      $isSubmitting = true;
      dispatch("submit", {
        values: schema ? { ...$validatedValues } : { ...$values },
        done(clearForm: boolean = true) {
          $isSubmitting = false;

          if (clearForm) {
            reset();
          }
        },
      });
    }
  }

  setContext<Context>(FORM, {
    setValue,
    values,
    setTouched,
    register,
    hasError,
    onInput,
    getError,
  });

  onMount(() => {
    reset();
  });
</script>

<form on:submit|preventDefault={submit}>
  <slot isSubmitting={$isSubmitting} />
</form>
