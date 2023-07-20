<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RegisterUser, LoginUser, Gender } from '$lib/types';
	import { currentUser } from '../stores';

	let registerUser: RegisterUser = {
		email: '',
		password: '',
		confirmPassword: '',
		gender: 'OTHER',
		firstName: '',
		lastName: '',
		dateOfBirth: new Date(),
		avatar: ''
	};

	let loginUser: LoginUser = {
		email: '',
		password: ''
	};

	$: isLoggedIn = $currentUser !== null;

	// Email regex to validate email
	$: isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
		isLoggedIn ? registerUser.email : loginUser.email
	);

	// Password length validation
	$: isPasswordValid = isLoggedIn
		? registerUser.password.length >= 8
		: loginUser.password.length >= 8;

	$: emailValue = isLoggedIn ? registerUser.email : loginUser.email;
	$: passwordValue = isLoggedIn ? registerUser.password : loginUser.password;

	$: confirmPasswordValid = registerUser.password === registerUser.confirmPassword;

	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		if (isLoggedIn) {
			dispatch('submit', loginUser);
		} else {
			dispatch('submit', registerUser);
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
			bind:value={emailValue}
		/>
		<label for="password">Password</label>
		<input
			type="password"
			name="passwor"
			aria-label="Password Input"
			placeholder="secretpassword"
			required
			bind:value={passwordValue}
		/>
		{#if !isLoggedIn}
			<label for="confirmPassword">Password</label>
			<input
				type="password"
				name="confirmPassword"
				aria-label="ConfirmPassword Input"
				placeholder="secretpassword"
				required
				bind:value={registerUser.confirmPassword}
			/>
			<label for="gender">Select Gender</label>
			<select name="gender">
				{#each ['OTHER', 'MALE', 'FEMALE'] as option}
					<option value={option}> {option.toLowerCase()} </option>
				{/each}
			</select>
			<label for="firstName">First Name</label>
			<input
				type="text"
				name="firstName"
				aria-label="FirstName Input"
				placeholder="Jose"
				bind:value={registerUser.firstName}
			/>
			<label for="lastName">Last Name</label>
			<input
				type="text"
				name="lastName"
				aria-label="LastName Input"
				placeholder="Rizal"
				bind:value={registerUser.lastName}
			/>
		{/if}
		<button type="submit" aria-label="Login Button" disabled={!isEmailValid || !isPasswordValid}
			>{isLoggedIn ? 'Login' : 'Register'}</button
		>
	</form>
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
