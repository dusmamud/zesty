<script lang="ts">
	import { Apple, Bell, Play, Star, Truck } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';

	const FEATURES = [
		{ icon: Truck, title: 'Live tracking', text: 'Watch your order from kitchen to door, minute by minute.' },
		{ icon: Bell, title: 'Order alerts', text: 'Know the moment your food is ready and out for delivery.' },
		{ icon: Star, title: 'Rewards on the go', text: 'Earn 1 pt per $1 and unlock Silver and Gold perks in the app.' }
	];
</script>

<svelte:head>
	<title>Get the App — Zesty</title>
	<meta
		name="description"
		content="Get the Zesty app: live tracking, order alerts and rewards on the go. Order right here on the web too — no install needed."
	/>
	<Seo
		title="Get the App — Zesty"
		description="Get the Zesty app: live tracking, order alerts and rewards on the go. Order right here on the web too — no install needed."
		path="/app"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div use:motionReveal>
			<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Download Our App</p>
			<h1 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
				Get Exclusive Offers<br />On The Zesty App!
			</h1>
			<p class="mt-3 max-w-md text-muted">
				Download now and enjoy special discounts, fast delivery and easy tracking — or keep
				ordering right here on the web, no install needed.
			</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<span class="flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-white">
					<Play class="h-6 w-6 fill-current" />
					<span class="leading-tight">
						<span class="block text-[10px] tracking-wide text-stone-300 uppercase">Get it on</span>
						<span class="block text-base font-bold">Google Play</span>
					</span>
				</span>
				<span class="flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-white">
					<Apple class="h-6 w-6" />
					<span class="leading-tight">
						<span class="block text-[10px] tracking-wide text-stone-300 uppercase">Download on the</span>
						<span class="block text-base font-bold">App Store</span>
					</span>
				</span>
			</div>
			<p class="mt-3 text-xs text-muted">
				App badges are illustrative — the app is not published yet.
			</p>
			<div class="mt-6">
				<a
					href="/menu"
					class="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Order on the Web Instead
				</a>
			</div>
		</div>

		<div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
			{#each FEATURES as feature, i (feature.title)}
				{@const Icon = feature.icon}
				<div class="rounded-3xl bg-white p-6 shadow-sm" use:motionReveal={{ delay: i * 100 }}>
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-brand">
						<Icon class="h-6 w-6" />
					</span>
					<h2 class="mt-3 font-display text-lg font-bold">{feature.title}</h2>
					<p class="mt-1 text-sm text-muted">{feature.text}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
