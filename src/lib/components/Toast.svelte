<script lang="ts">
	import { fly } from 'svelte/transition';
	import { CheckCircle2, ShoppingCart } from '@lucide/svelte';
	import { dismissToast, store } from '#lib/store.svelte.ts';
</script>

{#if store.toast}
	<div
		transition:fly={{ y: 20, duration: 200 }}
		class="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 lg:bottom-6"
		role="status"
	>
		<div class="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-2xl">
			<CheckCircle2 class="h-5 w-5 shrink-0 text-green-400" />
			<p class="min-w-0 flex-1">{store.toast.message}</p>
			{#if store.toast.actionLabel === 'View Cart'}
				<button
					type="button"
					onclick={() => {
						dismissToast();
						store.cartOpen = true;
					}}
					class="flex shrink-0 items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-dark"
				>
					<ShoppingCart class="h-3.5 w-3.5" /> View Cart
				</button>
			{/if}
			<button
				type="button"
				aria-label="Dismiss"
				onclick={dismissToast}
				class="shrink-0 rounded-full px-1.5 py-1 text-stone-400 hover:text-white"
			>
				✕
			</button>
		</div>
	</div>
{/if}
