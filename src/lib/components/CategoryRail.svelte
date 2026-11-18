<script lang="ts">
	import {
		CupSoda,
		IceCreamCone,
		LayoutGrid,
		Pizza,
		Sandwich,
		Soup
	} from '@lucide/svelte';
	import { CATEGORIES } from '#lib/data.ts';

	interface Props {
		active: (typeof CATEGORIES)[number];
		onSelect: (cat: (typeof CATEGORIES)[number]) => void;
	}

	let { active, onSelect }: Props = $props();

	const ICONS = {
		All: LayoutGrid,
		Burgers: Sandwich,
		Pizza: Pizza,
		Asian: Soup,
		Desserts: IceCreamCone,
		Drinks: CupSoda
	};
</script>

<div
	class="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
	role="tablist"
	aria-label="Menu categories"
>
	{#each CATEGORIES as cat (cat)}
		{@const Icon = ICONS[cat]}
		<button
			type="button"
			role="tab"
			aria-selected={active === cat}
			onclick={() => onSelect(cat)}
			class="flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 lg:rounded-2xl lg:px-4 {active ===
			cat
				? 'bg-brand text-white shadow'
				: 'bg-white text-stone-700 shadow-sm hover:text-brand'}"
		>
			<Icon class="h-5 w-5" />
			{cat}
		</button>
	{/each}
</div>
