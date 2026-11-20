<script lang="ts">
	import { Check, Crown, Zap } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { showToast } from '#lib/store.svelte.ts';
	import { PLUS_PLANS } from '#lib/data.ts';

	let joined = $state<string | null>(null);

	function join(plan: string) {
		joined = plan;
		showToast(`${plan} selected — demo only, no real subscription is taken`);
	}
</script>

<svelte:head>
	<title>Zesty Plus — Zesty</title>
	<meta
		name="description"
		content="Zesty Plus membership: free delivery on every order, priority support and exclusive deals. Monthly or annual plans."
	/>
	<Seo
		title="Zesty Plus — Zesty"
		description="Zesty Plus membership: free delivery on every order, priority support and exclusive deals. Monthly or annual plans."
		path="/subscription"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div class="text-center" use:reveal>
		<p class="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
			<Crown class="h-3.5 w-3.5" /> Zesty Plus
		</p>
		<h1 class="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Free Delivery, Every Single Order</h1>
		<p class="mx-auto mt-2 max-w-xl text-muted">
			One membership for people who order often. No delivery fees, priority support and member-only deals.
		</p>
	</div>

	<div class="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
		{#each PLUS_PLANS as plan, i (plan.id)}
			<article class="relative flex flex-col rounded-3xl bg-white p-8 shadow-sm {i === 1 ? 'ring-2 ring-brand' : ''}" use:reveal={{ delay: i * 100 }}>
				{#if plan.save}
					<span class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold whitespace-nowrap text-white">{plan.save}</span>
				{/if}
				<h2 class="font-display text-xl font-bold">{plan.name}</h2>
				<p class="mt-2"><span class="font-display text-4xl font-extrabold">{plan.price}</span> <span class="text-muted">{plan.period}</span></p>
				<ul class="mt-5 flex-1 space-y-3 text-sm">
					{#each plan.perks as perk (perk)}
						<li class="flex items-start gap-2">
							<Check class="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
							<span>{perk}</span>
						</li>
					{/each}
				</ul>
				<button
					type="button"
					onclick={() => join(plan.name)}
					class="mt-6 flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white transition-transform duration-150 active:scale-95 {joined === plan.name
						? 'bg-green-600'
						: 'bg-brand hover:bg-brand-dark'}"
				>
					{#if joined === plan.name}<Check class="h-5 w-5" /> Selected (demo){:else}<Zap class="h-5 w-5" /> Join {plan.name}{/if}
				</button>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-8 shadow-sm" use:reveal>
		<h2 class="font-display text-xl font-bold">Free vs Plus</h2>
		<div class="mt-4">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-orange-100 text-muted">
						<th class="py-2 pr-4 font-semibold">Feature</th>
						<th class="py-2 pr-4 font-semibold">Free</th>
						<th class="py-2 font-semibold text-brand">Plus</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-orange-100">
					<tr><td class="py-3 pr-4">Delivery fee</td><td class="py-3 pr-4">$1.99<br /><span class="text-xs text-muted">free over $20</span></td><td class="py-3 font-bold">Always free</td></tr>
					<tr><td class="py-3 pr-4">Support</td><td class="py-3 pr-4">Help centre &amp; FAQ</td><td class="py-3 font-bold">Priority support</td></tr>
					<tr><td class="py-3 pr-4">Member deals</td><td class="py-3 pr-4">Public offers</td><td class="py-3 font-bold">Exclusive deals</td></tr>
					<tr><td class="py-3 pr-4">New dishes</td><td class="py-3 pr-4">When they launch</td><td class="py-3 font-bold">Early access</td></tr>
				</tbody>
			</table>
		</div>
		<p class="mt-4 text-xs text-muted">Demo membership — no real payment is taken and no subscription is created.</p>
	</div>
</div>
