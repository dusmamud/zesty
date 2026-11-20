<script lang="ts">
	import { Check, ShoppingCart, Users } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { addToCart, showToast } from '#lib/store.svelte.ts';
	import { COMBOS, comboPrice, DISHES, formatPrice } from '#lib/data.ts';

	function dishName(id: string) {
		return DISHES.find((d) => d.id === id)?.name ?? 'Dish';
	}

	function dishImage(id: string) {
		return DISHES.find((d) => d.id === id)?.image ?? '/images/salad-bowl.webp';
	}

	function addCombo(id: string) {
		const combo = COMBOS.find((c) => c.id === id);
		if (!combo) return;
		for (const item of combo.items) {
			const dish = DISHES.find((d) => d.id === item.dishId);
			if (dish) addToCart(dish, item.qty, dish.price);
		}
		showToast(`${combo.name} added to cart — 10% bundle saving applied at checkout`);
	}
</script>

<svelte:head>
	<title>Meal Combos — Zesty</title>
	<meta
		name="description"
		content="Zesty meal combos and family packs: bundled dishes for 2 or 4 people, with 10% off the summed price."
	/>
	<Seo
		title="Meal Combos — Zesty"
		description="Zesty meal combos and family packs: bundled dishes for 2 or 4 people, with 10% off the summed price."
		path="/combos"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Bundles &amp; Family Packs</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Meal Combos</h1>
		<p class="mt-2 max-w-xl text-muted">
			Bundled dishes for 2 or 4 people — 10% off the summed price. One tap adds the whole combo to your cart.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each COMBOS as combo, i (combo.id)}
			{@const pricing = comboPrice(combo)}
			<article class="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm" use:reveal={{ delay: i * 100 }}>
				<div class="relative">
					<img
						src={dishImage(combo.items[0].dishId)}
						alt={combo.name}
						width="900"
						height="600"
						loading="lazy"
						class="aspect-[16/9] w-full object-cover"
					/>
					<span class="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{combo.tag}</span>
					<span class="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold shadow">
						<Users class="h-3.5 w-3.5 text-brand" /> {combo.serves}
					</span>
				</div>
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-xl font-extrabold">{combo.name}</h2>
					<p class="mt-1 text-sm text-muted">{combo.desc}</p>
					<ul class="mt-4 space-y-2 text-sm">
						{#each combo.items as item (item.dishId)}
							<li class="flex items-center gap-2">
								<Check class="h-4 w-4 shrink-0 text-green-600" />
								<span><span class="font-semibold">{item.qty} × {dishName(item.dishId)}</span></span>
							</li>
						{/each}
					</ul>
					<div class="mt-5 flex items-baseline gap-2">
						<p class="font-display text-2xl font-extrabold">{formatPrice(pricing.price)}</p>
						<p class="text-sm font-semibold text-muted line-through">{formatPrice(pricing.oldPrice)}</p>
						<p class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
							Save {formatPrice(pricing.oldPrice - pricing.price)}
						</p>
					</div>
					<button
						type="button"
						onclick={() => addCombo(combo.id)}
						class="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
					>
						<ShoppingCart class="h-4 w-4" /> Add Combo
					</button>
				</div>
			</article>
		{/each}
	</div>

	<p class="mt-6 text-center text-sm text-muted">
		Combos are demo bundles — items are added to your cart individually, so spice, add-ons and notes still work per dish.
		<a href="/menu" class="font-bold text-orange-700 hover:underline">Browse the full menu →</a>
	</p>
</div>
