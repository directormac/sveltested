<script lang="ts">
  import { writable } from "svelte/store";
  export let answer = "a mystery";

  const storedAnswer = writable<string>("");
</script>

<p>The answer is {answer}</p>

<input data-testid="inputStoredAnswer" type="text" bind:value={$storedAnswer} />

<p>The answer is {$storedAnswer}</p>
