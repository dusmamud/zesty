<script lang="ts">
	import { Bike, ChefHat, Headphones, MapPin } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	const ROLES = [
		{
			icon: Bike,
			title: 'Delivery Rider',
			type: 'Full-time • On-site',
			text: 'Ride, deliver hot food, earn per order plus tips. Flexible shifts, fuel allowance, and a rider kit on joining.',
			perks: ['Flexible shifts', 'Per-order pay + tips', 'Fuel allowance']
		},
		{
			icon: ChefHat,
			title: 'Kitchen Chef',
			type: 'Full-time • On-site',
			text: 'Run a station in our kitchen — burgers, pizza or Asian. We care about consistency and speed, not fancy CVs.',
			perks: ['Free staff meals', 'Two days off a week', 'Growth to head chef']
		},
		{
			icon: Headphones,
			title: 'Customer Support Executive',
			type: 'Full-time • Remote friendly',
			text: 'Answer chats and calls, fix order issues, and keep customers happy. Patient people who like solving problems.',
			perks: ['Remote friendly', 'Day shifts available', 'Training provided']
		}
	];
</script>

<svelte:head>
	<title>Careers — Zesty</title>
	<meta
		name="description"
		content="Work at Zesty: delivery riders, kitchen chefs and customer support. See open roles and how to apply."
	/>
	<Seo
		title="Careers — Zesty"
		description="Work at Zesty: delivery riders, kitchen chefs and customer support. See open roles and how to apply."
		path="/careers"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Careers</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Come Work With Us</h1>
		<p class="mt-2 max-w-xl text-muted">
			We're a small team that takes food seriously and ourselves lightly. If you like feeding people,
			there's a seat for you here.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each ROLES as role, i (role.title)}
			{@const Icon = role.icon}
			<article class="flex flex-col rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-7 w-7" />
				</span>
				<h2 class="mt-4 font-display text-xl font-bold">{role.title}</h2>
				<p class="mt-1 flex items-center gap-1 text-sm text-muted">
					<MapPin class="h-4 w-4" /> {role.type}
				</p>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{role.text}</p>
				<ul class="mt-3 flex flex-wrap gap-2">
					{#each role.perks as perk (perk)}
						<li class="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{perk}</li>
					{/each}
				</ul>
				<a
					href="/contact"
					class="mt-5 rounded-full bg-brand px-5 py-3 text-center text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Apply for this role
				</a>
			</article>
		{/each}
	</div>

	<p class="mt-8 rounded-3xl bg-white p-6 text-center text-sm text-muted shadow-sm" use:reveal>
		Don't see your role? Write to us from the
		<a href="/contact" class="font-bold text-orange-700 hover:underline">Contact page</a>
		with what you do best — we always read every message.
	</p>
</div>
