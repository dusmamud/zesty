<script lang="ts">
	import { Banknote, Bike, CheckCircle2, Clock, ShieldCheck } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	let name = $state('');
	let phone = $state('');
	let vehicle = $state('Scooter');
	let submitted = $state(false);
	let error = $state('');

	function submit() {
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
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
	<title>Become a Rider — Zesty</title>
	<meta
		name="description"
		content="Deliver with Zesty: flexible hours, weekly payouts and rider support. Apply to become a delivery partner."
	/>
	<Seo
		title="Become a Rider — Zesty"
		description="Deliver with Zesty: flexible hours, weekly payouts and rider support. Apply to become a delivery partner."
		path="/rider"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">For Delivery Partners</p>
		<h1 class="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">Ride With Zesty — Earn On Your Schedule</h1>
		<p class="mt-2 max-w-xl text-muted">
			Deliver food in your neighbourhood, pick your own hours, and get paid every week. No joining fee.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: Banknote, title: 'Earn up to $25/hour', text: 'Base pay + tips + peak-hour bonuses. Example earnings — actual pay varies by city and hours.' }, { icon: Clock, title: 'Your hours, your call', text: 'Log in when you want, log out when you want. No fixed shifts.' }, { icon: ShieldCheck, title: 'Rider support, 24/7', text: 'Live help on every delivery, plus accident cover while you ride.' }] as b, i (b.title)}
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
				<Bike class="h-5 w-5 text-brand" /> How it works
			</h2>
			<ol class="mt-4 space-y-3 text-sm">
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">1</span><span><strong>Apply</strong> — fill in the form. We verify your documents within 48 hours.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">2</span><span><strong>Get your kit</strong> — insulated bag, rain cover and rider app access.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">3</span><span><strong>Start earning</strong> — go online and take your first delivery. Payouts every Friday.</span></li>
			</ol>
			<p class="mt-4 text-sm text-muted">
				You need: a two-wheeler, a valid driving licence, a smartphone and a bank account for payouts.
			</p>
			<p class="mt-2 text-sm text-muted">
				Own a restaurant instead? <a href="/partner" class="font-bold text-orange-700 hover:underline">Partner with us →</a>
			</p>
		</div>

		<div class="rounded-3xl bg-white p-7 shadow-sm">
			{#if submitted}
				<div class="flex h-full flex-col items-center justify-center py-8 text-center">
					<CheckCircle2 class="h-14 w-14 text-green-600" />
					<h2 class="mt-3 font-display text-2xl font-extrabold">Thanks, {name.trim()}!</h2>
					<p class="mt-1 max-w-sm text-sm text-muted">
						Your rider application is in. Our team will call you at {phone.trim()} within 48 hours.
					</p>
					<p class="mt-3 text-xs text-muted">Demo form — no details are sent anywhere.</p>
				</div>
			{:else}
				<h2 class="font-display text-xl font-bold">Apply to ride</h2>
				<p class="mt-1 text-sm text-muted">Takes less than a minute.</p>
				<div class="mt-5 space-y-3">
					<div>
						<label for="rd-name" class="text-sm font-semibold">Your name</label>
						<input id="rd-name" type="text" bind:value={name} placeholder="e.g. Rahul Kumar" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="rd-phone" class="text-sm font-semibold">Phone number</label>
						<input id="rd-phone" type="tel" inputmode="numeric" bind:value={phone} placeholder="10-digit mobile number" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="rd-vehicle" class="text-sm font-semibold">Your vehicle</label>
						<select id="rd-vehicle" bind:value={vehicle} class="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand">
							<option>Scooter</option>
							<option>Motorcycle</option>
							<option>Bicycle</option>
						</select>
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
