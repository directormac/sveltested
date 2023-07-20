<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email: string = '';
	let password: string = '';

	// Email regex to validate email
	$: isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

	// Password length validation
	$: isPasswordValid = password.length >= 8;

	const handleSubmit = () => {
		if (isEmailValid && isPasswordValid) {
			dispatch('submit', { email, password });
		}
	};
</script>

<div>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="email">Email</label>
		<input
			type="email"
			name="email"
			aria-label="Email Input"
			placeholder="email@email.com"
			required
			bind:value={email}
		/>
		<label for="password">Password</label>
		<input
			type="password"
			name="passwor"
			aria-label="Password Input"
			placeholder="secretpassword"
			required
			bind:value={password}
		/>
		<button type="submit" aria-label="Login Button" disabled={!isEmailValid || !isPasswordValid}
			>Login</button
		>
	</form>
	<h4 style="color: red;">This does not log you in, refer to next form with real actions</h4>
</div>

<style>
	div {
		border: 1px solid;
		color: #1a1a1a;
		padding: 10px;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	form > * {
		margin: 0.5rem;
	}
	label {
		font-weight: bold;
		color: gray;
	}
</style>
