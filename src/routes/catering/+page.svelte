<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { CATERING_PACKAGES } from '#lib/data.ts';

	let name = $state('');
	let sent = $state(false);

	function enquire(e: SubmitEvent) {
		e.preventDefault();
		if (name.trim().length < 2) return;
		sent = true;
	}
</script>

<svelte:head>
	<title>Catering — Zesty</title>
	<meta
		name="description"
		content="Zesty catering for gatherings, office lunches and big celebrations. Platters from $89 — enquire here. Demo page, no real booking."
	/>
	<Seo
		title="Catering — Zesty"
		description="Zesty catering for gatherings, office lunches and big celebrations. Platters from $89 — enquire here. Demo page, no real booking."
		path="/catering"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Catering</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Feed The Whole Crowd</h1>
		<p class="mt-2 max-w-xl text-muted">
			Burger and pizza platters, noodle trays and desserts — delivered hot for your event. This
			is a demo page: enquiries are not sent anywhere.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each CATERING_PACKAGES as pkg, i (pkg.name)}
			<article class="rounded-3xl bg-white p-8 shadow-sm" use:motionReveal={{ delay: i * 100 }}>
				<h2 class="font-display text-2xl font-extrabold">{pkg.name}</h2>
				<p class="text-sm font-bold text-orange-700">{pkg.serves}</p>
				<p class="mt-2 font-display text-xl font-extrabold">{pkg.price}</p>
				<ul class="mt-4 space-y-2 text-sm text-muted">
					{#each pkg.items as item (item)}
						<li class="flex items-start gap-2"><span class="text-brand">✓</span> {item}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	{#if sent}
		<div class="mx-auto mt-8 max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm" use:motionReveal>
			<h2 class="font-display text-2xl font-extrabold">Enquiry noted (demo)!</h2>
			<p class="mt-2 text-muted">
				Thanks {name} — in the live product the catering team would call you back. Here, nothing
				was sent.
			</p>
			<button
				type="button"
				onclick={() => ((sent = false), (name = ''))}
				class="mt-5 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
			>
				New Enquiry
			</button>
		</div>
	{:else}
		<form
			class="mx-auto mt-8 max-w-xl rounded-3xl bg-white p-6 shadow-sm sm:p-8"
			onsubmit={enquire}
			use:motionReveal
		>
			<h2 class="font-display text-xl font-extrabold">Ask about catering</h2>
			<label class="mt-4 block text-sm font-bold" for="catering-name">Your name</label>
			<input
				id="catering-name"
				bind:value={name}
				required
				minlength="2"
				placeholder="e.g. Alex"
				class="mt-2 w-full rounded-full border border-orange-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
			/>
			<label class="mt-4 block text-sm font-bold" for="catering-notes">Event details</label>
			<textarea
				id="catering-notes"
				rows="3"
				placeholder="Date, guests, dishes you like…"
				class="mt-2 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
			></textarea>
			<button
				type="submit"
				class="mt-5 w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Send Enquiry (Demo)
			</button>
		</form>
	{/if}
</div>
