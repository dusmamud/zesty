<script lang="ts">
	import { Heart, LogOut, Package, User } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { signOut, store } from '#lib/store.svelte.ts';
</script>

<svelte:head>
	<title>My Account — Zesty</title>
	<meta
		name="description"
		content="Your Zesty account: profile, orders and favourites. Demo sign-in — details stay in your browser."
	/>
	<Seo
		title="My Account — Zesty"
		description="Your Zesty account: profile, orders and favourites. Demo sign-in — details stay in your browser."
		path="/account"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">My Account</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
			{store.user ? `Hi, ${store.user.name.split(' ')[0]}` : 'Your Account'}
		</h1>
	</div>

	{#if store.user}
		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			<section class="rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:motionReveal>
				<h2 class="flex items-center gap-2 font-display text-xl font-extrabold">
					<User class="h-5 w-5 text-brand" /> Profile
				</h2>
				<dl class="mt-4 space-y-3 text-sm">
					<div><dt class="font-bold">Name</dt><dd class="text-muted">{store.user.name}</dd></div>
					<div><dt class="font-bold">Email</dt><dd class="text-muted">{store.user.email}</dd></div>
					<div><dt class="font-bold">Phone</dt><dd class="text-muted">{store.user.phone}</dd></div>
					<div><dt class="font-bold">Address</dt><dd class="text-muted">{store.user.address}</dd></div>
				</dl>
				<p class="mt-4 text-xs text-muted">
					Demo sign-in — your details are stored only in this browser.
				</p>
				<button
					type="button"
					onclick={signOut}
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
				>
					<LogOut class="h-4 w-4" /> Sign Out
				</button>
			</section>

			<section class="rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:motionReveal={{ delay: 100 }}>
				<h2 class="flex items-center gap-2 font-display text-xl font-extrabold">
					<Package class="h-5 w-5 text-brand" /> Your Activity
				</h2>
				<div class="mt-4 space-y-3">
					<a href="/orders" class="flex items-center justify-between rounded-2xl bg-cream-dark px-4 py-3 font-bold hover:text-brand">
						<span>{store.orders.length} order{store.orders.length === 1 ? '' : 's'}</span><span>→</span>
					</a>
					<a href="/favourites" class="flex items-center justify-between rounded-2xl bg-cream-dark px-4 py-3 font-bold hover:text-brand">
						<span class="flex items-center gap-2"><Heart class="h-4 w-4 text-red-500" /> {store.favourites.size} favourite{store.favourites.size === 1 ? '' : 's'}</span><span>→</span>
					</a>
					<a href="/rewards" class="flex items-center justify-between rounded-2xl bg-cream-dark px-4 py-3 font-bold hover:text-brand">
						<span>Zesty Rewards</span><span>→</span>
					</a>
				</div>
			</section>
		</div>
	{:else}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm" use:motionReveal>
			<User class="mx-auto h-14 w-14 text-stone-300" />
			<p class="mt-3 font-display text-xl font-bold">You're not signed in</p>
			<p class="mt-1 text-sm text-muted">
				Sign in to see your profile, orders and favourites. Guest checkout still works without
				an account.
			</p>
			<a
				href="/signin"
				class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Sign In
			</a>
		</div>
	{/if}
</div>
