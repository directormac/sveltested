<script lang="ts">
	let count: number = 0;
	const increment = () => {
		count += 1;
	};
	const decrement = () => {
		count -= 1;
	};
	const reset = () => {
		count = 0;
	};
</script>

<div>
	<p aria-label="Count">{count}</p>
	<section>
		<button aria-label="Increment Button" on:click={increment}> Increment </button>
		<button aria-label="Decrement Button" on:click={decrement}> Decrement </button>
		<button aria-label="Reset Button" on:click={reset}> Reset </button>
	</section>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-items: center;
		place-items: center;
	}
	p {
		font-size: 3rem;
	}
</style>
