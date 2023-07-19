<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let email = "";
  export let password = "";

  const dispatch = createEventDispatcher();

  // Email regex to validate email
  $: isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  // Password length validation
  $: isPasswordValid = password.length >= 8;

  // Function to handle form submission
  function handleSubmit() {
    if (isEmailValid && isPasswordValid) {
      dispatch("submit", { email, password });
    }
  }
</script>

<div>
  <form data-testid="login-form" on:submit|preventDefault={handleSubmit}>
    <label for="email">Email</label>
    <input
      data-testid="email-input"
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      required
      bind:value={email}
    />
    <label for="password">Password</label>
    <input
      data-testid="password-input"
      type="password"
      id="password"
      name="password"
      placeholder="Password"
      required
      bind:value={password}
    />
    <button
      type="submit"
      data-testid="login-button"
      disabled={!isEmailValid || !isPasswordValid}
    >
      Login
    </button>
  </form>
</div>

<style>
  div {
    width: 50vw;
    /* height: 30vh; */
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  button {
    margin-top: 1rem;
    font-size: 1rem;
  }
</style>
