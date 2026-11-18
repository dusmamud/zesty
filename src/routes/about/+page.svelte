<script lang="ts">
	import { Bike, Heart, Leaf, Star, Users } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import CountUp from '#lib/components/CountUp.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
</script>

<svelte:head>
	<title>About Us — Zesty</title>
	<meta
		name="description"
		content="Zesty is a small food-delivery team with one job: hot, fresh food at your door in 20–30 minutes. Read our story and values."
	/>
	<Seo
		title="About Us — Zesty"
		description="Zesty is a small food-delivery team with one job: hot, fresh food at your door in 20–30 minutes. Read our story and values."
		path="/about"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">About Us</p>
		<h1 class="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
			Good Food. Fast Delivery. Every Time You Order.
		</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-muted">
			Zesty started with a simple frustration: food that arrived late, cold, or nothing like the photo.
			So we built a small delivery kitchen around one promise — your favourite meals, cooked fresh when
			you order, and at your door hot in 20–30 minutes. No dark patterns, no hidden fees, no
			account required to order.
		</p>
	</div>

	<div class="mt-10 grid gap-4 text-center sm:grid-cols-4">
		{#each [{ value: 10, decimals: 0, suffix: 'K+', label: 'Happy customers' }, { value: 4.8, decimals: 1, suffix: '', label: 'Average rating' }, { value: 20, decimals: 0, suffix: '–30', label: 'Minutes delivery' }, { value: 50, decimals: 0, suffix: '+', label: 'Dishes on the menu' }] as s, i (s.label)}
			<div class="rounded-3xl bg-white p-6 shadow-sm" use:reveal={{ delay: i * 100 }}>
				<p class="font-display text-3xl font-extrabold text-brand">
					<CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
				</p>
				<p class="mt-1 text-sm text-muted">{s.label}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-12 font-display text-2xl font-extrabold" use:reveal>What we stand for</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: Bike, title: 'Fast', text: 'Riders on the road in minutes, not hours. If we are late, we tell you — we do not hide it.' }, { icon: Leaf, title: 'Fresh', text: 'Cooked to order with fresh ingredients, every single time. Nothing sits under a heat lamp.' }, { icon: Heart, title: 'Quality', text: 'Every dish is tasted by our own team before it makes the menu. If we would not eat it, we do not serve it.' }] as v, i (v.title)}
			{@const Icon = v.icon}
			<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-7 w-7" />
				</span>
				<h3 class="mt-4 font-display text-lg font-bold">{v.title}</h3>
				<p class="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
			</div>
		{/each}
	</div>

	<div class="mt-12 grid gap-6 lg:grid-cols-2">
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<Users class="h-5 w-5 text-brand" /> The team behind the food
			</h2>
			<p class="mt-3 text-sm leading-relaxed text-muted">
				We're a small crew: cooks who run the kitchen, riders who know every shortcut in town,
				and a support team that actually answers the phone. No giant call centres, no scripts —
				just people who care whether your dinner arrives hot.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-muted">
				We're a delivery-only kitchen — every order goes straight from our kitchen to your door, hot and fresh.
			</p>
		</div>
		<div class="rounded-3xl bg-ink p-7 text-white shadow-sm" use:reveal={{ delay: 100 }}>
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<Star class="h-5 w-5 text-amber-400" /> Rated 4.8 by 10,000+ customers
			</h2>
			<p class="mt-3 text-sm leading-relaxed text-stone-300">
				“Zesty is now my default order.” — Alex Morgan, regular customer. Read more from our
				customers on the home page, or try us yourself: your first order is 50% off with FIRST50.
			</p>
			<a
				href="/menu"
				class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Order Now →
			</a>
		</div>
	</div>
</div>
