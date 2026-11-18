<script lang="ts">
	import { Gift, Star, Truck } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { REWARD_TIERS } from '#lib/data.ts';
</script>

<svelte:head>
	<title>Zesty Rewards — Zesty</title>
	<meta
		name="description"
		content="Zesty Rewards: earn 1 point per $1, unlock Silver and Gold perks like free delivery and double-points Tuesdays. Demo loyalty programme."
	/>
	<Seo
		title="Zesty Rewards — Zesty"
		description="Zesty Rewards: earn 1 point per $1, unlock Silver and Gold perks like free delivery and double-points Tuesdays. Demo loyalty programme."
		path="/rewards"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Zesty Rewards</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Order More, Earn More</h1>
		<p class="mt-2 max-w-xl text-muted">
			Earn 1 point for every $1 you spend. Points unlock tiers and perks — this is a demo
			programme, so points shown here are illustrative.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each REWARD_TIERS as tier, i (tier.name)}
			<article
				class="rounded-3xl bg-white p-8 shadow-sm {i === 2 ? 'ring-2 ring-brand' : ''}"
				use:motionReveal={{ delay: i * 100 }}
			>
				<span
					class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-brand"
				>
					{#if i === 0}<Star class="h-6 w-6" />{:else if i === 1}<Truck class="h-6 w-6" />{:else}<Gift class="h-6 w-6" />{/if}
				</span>
				<h2 class="mt-4 font-display text-2xl font-extrabold">{tier.name}</h2>
				<p class="text-sm font-bold text-orange-700">{tier.points}</p>
				<ul class="mt-4 space-y-2 text-sm text-muted">
					{#each tier.perks as perk (perk)}
						<li class="flex items-start gap-2"><span class="text-brand">✓</span> {perk}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-cream-dark p-8 text-center" use:motionReveal>
		<h2 class="font-display text-2xl font-extrabold">How it works</h2>
		<p class="mx-auto mt-2 max-w-lg text-muted">
			1. Order from the menu &nbsp;•&nbsp; 2. Earn 1 pt per $1 &nbsp;•&nbsp; 3. Unlock a tier and
			enjoy the perks on your next order.
		</p>
		<a
			href="/menu"
			class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
		>
			Start Earning — Order Now
		</a>
	</div>
</div>
