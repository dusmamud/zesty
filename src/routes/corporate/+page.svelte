<script lang="ts">
	import { Building2, CheckCircle2, Clock, Receipt, Users } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	let company = $state('');
	let email = $state('');
	let teamSize = $state('11–50 people');
	let submitted = $state(false);
	let error = $state('');

	function submit() {
		if (company.trim().length < 2) {
			error = 'Please enter your company name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid work email.';
			return;
		}
		error = '';
		submitted = true;
	}
</script>

<svelte:head>
	<title>Corporate Orders — Zesty</title>
	<meta
		name="description"
		content="Zesty for offices: team lunches, recurring meal plans and monthly invoicing for companies."
	/>
	<Seo
		title="Corporate Orders — Zesty"
		description="Zesty for offices: team lunches, recurring meal plans and monthly invoicing for companies."
		path="/corporate"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">For Offices &amp; Teams</p>
		<h1 class="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">Food For The Whole Office, Sorted</h1>
		<p class="mt-2 max-w-xl text-muted">
			Team lunches, recurring meal plans and one monthly invoice — no more collecting orders in a spreadsheet.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: Users, title: 'Team lunches', text: 'One link, everyone orders their own meal, one delivery slot.' }, { icon: Clock, title: 'Recurring plans', text: 'Set a weekly lunch plan — same time, same place, zero chasing.' }, { icon: Receipt, title: 'Monthly invoicing', text: 'One invoice for the whole month, with GST-ready billing.' }] as b, i (b.title)}
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

	<div class="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-2">
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<Building2 class="h-5 w-5 text-brand" /> How corporate ordering works
			</h2>
			<ol class="mt-4 space-y-3 text-sm">
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">1</span><span><strong>Tell us about your team</strong> — size, location, lunch days.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">2</span><span><strong>We set up your plan</strong> — menu rotation, budgets per person, delivery slots.</span></li>
				<li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">3</span><span><strong>Lunch just arrives</strong> — hot, on time, with one monthly invoice.</span></li>
			</ol>
			<p class="mt-4 text-sm text-muted">
				Need food for a one-off event instead? <a href="/catering" class="font-bold text-orange-700 hover:underline">See catering →</a>
			</p>
		</div>

		<div class="rounded-3xl bg-white p-7 shadow-sm">
			{#if submitted}
				<div class="flex h-full flex-col items-center justify-center py-8 text-center">
					<CheckCircle2 class="h-14 w-14 text-green-600" />
					<h2 class="mt-3 font-display text-2xl font-extrabold">Thanks, {company.trim()}!</h2>
					<p class="mt-1 max-w-sm text-sm text-muted">
						Your corporate enquiry is in. Our team will write to {email.trim()} within one working day.
					</p>
					<p class="mt-3 text-xs text-muted">Demo form — no details are sent anywhere.</p>
				</div>
			{:else}
				<h2 class="font-display text-xl font-bold">Request a corporate plan</h2>
				<p class="mt-1 text-sm text-muted">We reply within one working day.</p>
				<div class="mt-5 space-y-3">
					<div>
						<label for="cp-company" class="text-sm font-semibold">Company name</label>
						<input id="cp-company" type="text" bind:value={company} placeholder="e.g. Acme Corp" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="cp-email" class="text-sm font-semibold">Work email</label>
						<input id="cp-email" type="email" bind:value={email} placeholder="you@company.com" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="cp-team" class="text-sm font-semibold">Team size</label>
						<select id="cp-team" bind:value={teamSize} class="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand">
							<option>1–10 people</option>
							<option>11–50 people</option>
							<option>51–200 people</option>
							<option>200+ people</option>
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
						Request Plan
					</button>
					<p class="text-center text-xs text-muted">Demo form — no details are sent anywhere.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
