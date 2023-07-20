<script lang="ts">
	import Counter from '$lib/components/Counter.svelte';
	import HybridForm from '$lib/components/HybridForm.svelte';
	import LoginForm from '$lib/components/LoginForm.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Welcome to testing with SvelteKit</h1>
<Counter />
<br />
<LoginForm />
<br />
<HybridForm />

<div><p>Made with 💓, by <a href="https://github.com/directormac">directormac</a></p></div>
