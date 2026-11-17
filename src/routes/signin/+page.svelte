<script lang="ts">
	import { CheckCircle2, LogOut, ShieldCheck, User } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { signIn, signOut, store } from '#lib/store.svelte.ts';
	import { reveal } from '#lib/actions/reveal.ts';

	let step = $state<'details' | 'code'>('details');
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let code = $state('');
	let savedAddress = $state(store.user?.address ?? '');
	let addressSaved = $state(false);
	let error = $state('');

	function submitDetails() {
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
			error = 'Please enter a valid 10-digit phone number.';
			return;
		}
		error = '';
		step = 'code';
	}

	function submitCode() {
		if (!/^[0-9]{6}$/.test(code.trim())) {
			error = 'Enter the 6-digit code. (Demo: any 6 digits work.)';
			return;
		}
		error = '';
		signIn({ name: name.trim(), email: email.trim(), phone: phone.trim(), address: savedAddress });
		goto('/orders');
	}

	function saveAddress() {
		if (!store.user) return;
		store.user = { ...store.user, address: savedAddress.trim() };
		addressSaved = true;
		setTimeout(() => (addressSaved = false), 2500);
	}
</script>

<svelte:head>
	<title>Sign In — Zesty</title>
	<meta
		name="description"
		content="Sign in to Zesty to save your address and keep your order history. Demo sign-in — any 6-digit code works, no real SMS."
	/>
</svelte:head>

<div class="mx-auto max-w-lg px-4 py-12 sm:px-6">
	{#if store.user}
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<div class="flex items-center gap-3">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-brand">
					<User class="h-7 w-7" />
				</span>
				<div>
					<h1 class="font-display text-2xl font-extrabold">Hi, {store.user.name}</h1>
					<p class="text-sm text-muted">You're signed in.</p>
				</div>
			</div>
			<dl class="mt-5 space-y-2 text-sm">
				<div class="flex justify-between"><dt class="text-muted">Email</dt><dd class="font-semibold">{store.user.email}</dd></div>
				<div class="flex justify-between"><dt class="text-muted">Phone</dt><dd class="font-semibold">{store.user.phone}</dd></div>
				<div class="flex justify-between"><dt class="text-muted">Orders placed</dt><dd class="font-semibold">{store.orders.length}</dd></div>
			</dl>

			<div class="mt-6">
				<label for="saved-address" class="text-sm font-semibold">Saved delivery address</label>
				<textarea
					id="saved-address"
					rows="2"
					bind:value={savedAddress}
					placeholder="Flat, street, area, city"
					class="mt-1 w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand"
				></textarea>
				<button
					type="button"
					onclick={saveAddress}
					class="mt-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-stone-800"
				>
					{addressSaved ? 'Saved ✓' : 'Save Address'}
				</button>
			</div>

			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/orders" class="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark">
					My Orders
				</a>
				<a href="/favourites" class="rounded-full bg-white px-6 py-3 text-sm font-bold shadow-sm hover:text-brand">
					My Favourites
				</a>
				<button
					type="button"
					onclick={signOut}
					class="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-red-600 shadow-sm hover:bg-red-50"
				>
					<LogOut class="h-4 w-4" /> Sign Out
				</button>
			</div>
		</div>
	{:else if step === 'details'}
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h1 class="font-display text-2xl font-extrabold">Welcome back</h1>
			<p class="mt-1 text-sm text-muted">Sign in to save your address and keep your order history.</p>
			<div class="mt-5 space-y-3">
				<div>
					<label for="si-name" class="text-sm font-semibold">Your name</label>
					<input id="si-name" type="text" bind:value={name} placeholder="e.g. Aarav Patel" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
				</div>
				<div>
					<label for="si-email" class="text-sm font-semibold">Email</label>
					<input id="si-email" type="email" bind:value={email} placeholder="you@example.com" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
				</div>
				<div>
					<label for="si-phone" class="text-sm font-semibold">Phone number</label>
					<input id="si-phone" type="tel" inputmode="numeric" bind:value={phone} placeholder="10-digit mobile number" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
				</div>
				{#if error}
					<p role="alert" class="text-sm font-semibold text-red-600">{error}</p>
				{/if}
				<button
					type="button"
					onclick={submitDetails}
					class="w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Continue
				</button>
				<p class="text-center text-xs text-muted">We'll send a 6-digit code to verify it's you.</p>
			</div>
		</div>
	{:else}
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h1 class="font-display text-2xl font-extrabold">Enter the code</h1>
			<p class="mt-1 text-sm text-muted">
				We sent a 6-digit code to <span class="font-bold text-ink">{phone}</span>.
			</p>
			<div class="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
				<ShieldCheck class="mr-1 inline h-4 w-4" />
				Demo — any 6-digit code works, no real SMS is sent.
			</div>
			<div class="mt-5">
				<label for="si-code" class="text-sm font-semibold">6-digit code</label>
				<input
					id="si-code"
					type="text"
					inputmode="numeric"
					maxlength="6"
					bind:value={code}
					placeholder="••••••"
					class="mt-1 w-full rounded-xl border px-3 py-2.5 text-center text-2xl font-extrabold tracking-[0.5em] outline-none focus:border-brand"
				/>
			</div>
			{#if error}
				<p role="alert" class="mt-2 text-sm font-semibold text-red-600">{error}</p>
			{/if}
			<button
				type="button"
				onclick={submitCode}
				class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				<CheckCircle2 class="h-5 w-5" /> Verify &amp; Sign In
			</button>
			<button type="button" onclick={() => (step = 'details')} class="mt-2 w-full rounded-full py-2.5 text-sm font-bold text-stone-600 hover:bg-stone-100">
				← Change details
			</button>
		</div>
	{/if}
</div>
