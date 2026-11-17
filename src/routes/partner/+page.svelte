<script lang="ts">
	import { CheckCircle2, ChefHat, Store, TrendingUp, Users } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	let name = $state('');
	let restaurant = $state('');
	let phone = $state('');
	let submitted = $state(false);
	let error = $state('');

	function submit() {
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (restaurant.trim().length < 2) {
			error = 'Please enter your restaurant name.';
			return;
		}
		if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
			error = 'Please enter a valid 10-digit phone number.';
			return;
		}
		error = '';
		submitted = true;
	}
</script>

<svelte:head>
	<title>Partner With Us — Zesty</title>
	<meta
		name="description"
		content="Own a restaurant? Partner with Zesty to reach 10,000+ hungry customers, with fast payouts and simple order management."
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">For Restaurants</p>
		<h1 class="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
			Partner With Us — Grow Your Restaurant
		</h1>
		<p class="mt-2 max-w-xl text-muted">
			Join Zesty and put your food in front of 10,000+ hungry customers in your city. No setup fees,
			no complicated tech — we handle delivery, you handle the cooking.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: Users, title: 'Reach 10K+ customers', text: 'Your dishes shown to thousands of people ordering every week.' }, { icon: TrendingUp, title: 'Grow orders 2×', text: 'Partner restaurants typically double their delivery orders in the first month.' }, { icon: Store, title: 'Simple order management', text: 'One dashboard for orders, menu updates and payouts. No extra hardware.' }] as b, i (b.title)}
			{@const Icon = b.icon}
			<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-7 w-7" />
				</span>
				<h2 class="mt-4 font-display text-lg font-bold">{b.title}</h2>
				<p class="mt-1 text-sm text-muted">{b.text}</p>
			</div>
		{/each}
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-2">
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<ChefHat class="h-5 w-5 text-brand" /> How partnering works
			</h2>
			<ol class="mt-4 space-y-3 text-sm">
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">1</span><span><strong>Apply</strong> — fill in the form. We call you within 24 hours.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">2</span><span><strong>Set up your menu</strong> — we help you photograph dishes and price them.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">3</span><span><strong>Go live</strong> — start receiving orders the same week. Payouts every Friday.</span></li>
			</ol>
			<p class="mt-4 text-sm text-muted">
				Questions? <a href="/contact" class="font-bold text-brand hover:underline">Contact us</a> — we reply within a day.
			</p>
		</div>

		<div class="rounded-3xl bg-white p-7 shadow-sm">
			{#if submitted}
				<div class="flex h-full flex-col items-center justify-center py-8 text-center">
					<CheckCircle2 class="h-14 w-14 text-green-600" />
					<h2 class="mt-3 font-display text-2xl font-extrabold">Thanks, {name.trim()}!</h2>
					<p class="mt-1 max-w-sm text-sm text-muted">
						Your partner request for <strong class="text-ink">{restaurant.trim()}</strong> is in.
						Our team will call you at {phone.trim()} within 24 hours.
					</p>
					<p class="mt-3 text-xs text-muted">Demo form — no details are sent anywhere.</p>
				</div>
			{:else}
				<h2 class="font-display text-xl font-bold">Apply to partner</h2>
				<p class="mt-1 text-sm text-muted">Takes less than a minute.</p>
				<div class="mt-5 space-y-3">
					<div>
						<label for="pt-name" class="text-sm font-semibold">Your name</label>
						<input id="pt-name" type="text" bind:value={name} placeholder="e.g. Priya Sharma" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="pt-restaurant" class="text-sm font-semibold">Restaurant name</label>
						<input id="pt-restaurant" type="text" bind:value={restaurant} placeholder="e.g. Spice Corner" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="pt-phone" class="text-sm font-semibold">Phone number</label>
						<input id="pt-phone" type="tel" inputmode="numeric" bind:value={phone} placeholder="10-digit mobile number" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					{#if error}
						<p role="alert" class="text-sm font-semibold text-red-600">{error}</p>
					{/if}
					<button
						type="button"
						onclick={submit}
						class="w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
					>
						Submit Application
					</button>
					<p class="text-center text-xs text-muted">Demo form — no details are sent anywhere.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
