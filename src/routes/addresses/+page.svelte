<script lang="ts">
	import { Home, MapPin, Trash2 } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { addAddress, removeAddress, setDefaultAddress, store } from '#lib/store.svelte.ts';
	import type { SavedAddress } from '#lib/data.ts';

	let label = $state<SavedAddress['label']>('Home');
	let address = $state('');
	let error = $state('');

	function submit() {
		if (address.trim().length < 8) {
			error = 'Please enter a full address (at least 8 characters).';
			return;
		}
		error = '';
		addAddress(label, address);
		address = '';
	}
</script>

<svelte:head>
	<title>Saved Addresses — Zesty</title>
	<meta
		name="description"
		content="Manage your saved delivery addresses on Zesty: Home, Work and more, with a default address for faster checkout."
	/>
	<Seo
		title="Saved Addresses — Zesty"
		description="Manage your saved delivery addresses on Zesty: Home, Work and more, with a default address for faster checkout."
		path="/addresses"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">My Account</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Saved Addresses</h1>
		<p class="mt-2 max-w-xl text-muted">Pick a saved address at checkout instead of typing it every time. Demo addresses — edit or delete them freely.</p>
	</div>

	{#if store.addresses.length === 0}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm" use:reveal>
			<MapPin class="mx-auto h-12 w-12 text-stone-300" />
			<p class="mt-3 font-display text-xl font-bold">No saved addresses yet</p>
			<p class="mt-1 text-sm text-muted">Add your first address below — it will be saved on this device.</p>
		</div>
	{:else}
		<ul class="mt-8 space-y-4">
			{#each store.addresses as a (a.id)}
				<li class="flex flex-wrap items-center gap-3 rounded-3xl bg-white p-5 shadow-sm" use:reveal>
					<span class="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-brand">
						<Home class="h-5 w-5" />
					</span>
					<div class="min-w-0 flex-1">
						<p class="font-bold">
							{a.label}
							{#if a.isDefault}
								<span class="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">Default</span>
							{/if}
						</p>
						<p class="truncate text-sm text-muted">{a.address}</p>
					</div>
					{#if !a.isDefault}
						<button
							type="button"
							onclick={() => setDefaultAddress(a.id)}
							class="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm hover:text-brand"
						>
							Set default
						</button>
					{/if}
					<button
						type="button"
						aria-label="Delete {a.label} address"
						onclick={() => removeAddress(a.id)}
						class="flex h-10 w-10 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
					>
						<Trash2 class="h-5 w-5" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:reveal>
		<h2 class="font-display text-xl font-bold">Add a new address</h2>
		<div class="mt-4 space-y-3">
			<div>
				<label for="ad-label" class="text-sm font-semibold">Label</label>
				<select id="ad-label" bind:value={label} class="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand">
					<option>Home</option>
					<option>Work</option>
					<option>Other</option>
				</select>
			</div>
			<div>
				<label for="ad-address" class="text-sm font-semibold">Address</label>
				<input id="ad-address" type="text" bind:value={address} placeholder="Flat, street, area, city" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
			</div>
			{#if error}
				<p role="alert" class="text-sm font-semibold text-red-600">{error}</p>
			{/if}
			<button
				type="button"
				onclick={submit}
				class="w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Save Address
			</button>
			<p class="text-center text-xs text-muted">Saved on this device only — demo data, nothing is sent anywhere.</p>
		</div>
	</div>
</div>
