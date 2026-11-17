<script lang="ts">
	import { Search, ShoppingCart, UtensilsCrossed } from '@lucide/svelte';

	interface Props {
		cartCount: number;
		searchQuery: string;
		onCartOpen: () => void;
		onSearch: (value: string) => void;
	}

	let { cartCount, searchQuery, onCartOpen, onSearch }: Props = $props();
	let showSearch = $state(false);
</script>

<header class="sticky top-0 z-40 border-b border-orange-100 bg-cream/90 backdrop-blur">
	<div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
		<a href="#top" class="flex items-center gap-2">
			<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
				<UtensilsCrossed class="h-5 w-5" />
			</span>
			<span class="font-display text-2xl font-extrabold tracking-tight">Zesty</span>
		</a>

		<nav class="ml-6 hidden items-center gap-6 text-sm font-semibold text-stone-700 lg:flex">
			<a href="#top" class="text-brand">Home</a>
			<a href="#menu" class="hover:text-brand">Menu</a>
			<a href="#how-it-works" class="hover:text-brand">How It Works</a>
			<a href="#offers" class="hover:text-brand">Offers</a>
			<a href="#about" class="hover:text-brand">About Us</a>
		</nav>

		<div class="ml-auto flex items-center gap-2 sm:gap-3">
			{#if showSearch}
				<input
					type="search"
					value={searchQuery}
					placeholder="Search dishes…"
					aria-label="Search dishes"
					oninput={(e) => onSearch(e.currentTarget.value)}
					class="w-40 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand sm:w-56"
				/>
			{/if}
			<button
				type="button"
				aria-label="Search"
				onclick={() => (showSearch = !showSearch)}
				class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm hover:text-brand"
			>
				<Search class="h-5 w-5" />
			</button>

			<button
				type="button"
				aria-label="Open cart"
				onclick={onCartOpen}
				class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm hover:text-brand"
			>
				<ShoppingCart class="h-5 w-5" />
				{#if cartCount > 0}
					<span
						class="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white"
					>
						{cartCount}
					</span>
				{/if}
			</button>

			<button
				type="button"
				class="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-dark sm:block"
			>
				Sign In
			</button>
		</div>
	</div>
</header>
