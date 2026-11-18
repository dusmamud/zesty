<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Minus, Plus, ShoppingBag, Trash2, X } from '@lucide/svelte';
	import { applyPromo, changeQty, removeFromCart, store, totals } from '#lib/store.svelte.ts';
	import { FREEDEL_CODE, FREE_DELIVERY_OVER, formatPrice, promoRate } from '#lib/data.ts';

	let t = $derived(totals());
	let promoError = $state<string | null>(null);
	let progress = $derived(Math.min(100, ((t.subtotal - t.discount) / FREE_DELIVERY_OVER) * 100));

	function onApplyPromo() {
		promoError = applyPromo(store.promoCode);
	}
</script>

<div class="fixed inset-0 z-50 flex justify-end" role="dialog" aria-label="Your cart">
	<button
		type="button"
		aria-label="Close cart"
		onclick={() => (store.cartOpen = false)}
		transition:fade={{ duration: 200 }}
		class="absolute inset-0 bg-black/40"
	></button>
	<aside
		transition:fly={{ x: 320, duration: 250 }}
		class="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
	>
		<div class="flex items-center justify-between border-b px-5 py-4">
			<h2 class="font-display text-xl font-bold">Your Cart</h2>
			<button type="button" aria-label="Close cart" onclick={() => (store.cartOpen = false)} class="rounded-full p-2 hover:bg-stone-100">
				<X class="h-5 w-5" />
			</button>
		</div>

		{#if t.lines.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
				<ShoppingBag class="h-12 w-12 text-stone-300" />
				<p class="font-display text-lg font-bold">Your cart is empty</p>
				<p class="text-sm text-muted">Add something tasty from the menu to get started.</p>
				<a
					href="/menu"
					onclick={() => (store.cartOpen = false)}
					class="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
				>
					Browse Menu
				</a>
			</div>
		{:else}
			<div class="flex-1 overflow-y-auto px-5 py-4">
				<div class="mb-4 rounded-xl bg-cream-dark p-3">
					{#if t.delivery === 0}
						<p class="text-sm font-semibold text-green-700">🎉 You've unlocked FREE delivery!</p>
					{:else}
						<p class="text-sm font-semibold">
							Add {formatPrice(FREE_DELIVERY_OVER - (t.subtotal - t.discount))} more for free delivery
						</p>
						<div class="mt-2 h-2 overflow-hidden rounded-full bg-orange-100">
							<div class="h-full rounded-full bg-brand" style="width: {progress}%"></div>
						</div>
					{/if}
				</div>

				<ul class="space-y-4">
					{#each t.lines as line (line.dish.id)}
						<li class="flex gap-3">
							<a href="/dish/{line.dish.id}" onclick={() => (store.cartOpen = false)}>
								<img
									src={line.dish.image}
									alt={line.dish.name}
									width={line.dish.width}
									height={line.dish.height}
									class="h-20 w-20 rounded-xl object-cover"
									loading="lazy"
								/>
							</a>
							<div class="min-w-0 flex-1">
								<a href="/dish/{line.dish.id}" onclick={() => (store.cartOpen = false)} class="truncate font-semibold hover:text-brand">
									{line.dish.name}
								</a>
								<p class="text-sm text-muted">{formatPrice(line.unitPrice)} each</p>
								{#if line.spice || line.instructions}
									<p class="mt-0.5 text-xs text-muted">
										{#if line.spice}Spice: {line.spice}{/if}{#if line.spice && line.instructions}
											•
										{/if}{#if line.instructions}Note: {line.instructions}{/if}
									</p>
								{/if}
								<div class="mt-2 flex items-center gap-2">
									<button
										type="button"
										aria-label="Decrease quantity"
										onclick={() => changeQty(line.dish.id, -1)}
										class="flex h-7 w-7 items-center justify-center rounded-full border hover:bg-stone-100"
									>
										<Minus class="h-3.5 w-3.5" />
									</button>
									<span class="w-6 text-center text-sm font-bold">{line.qty}</span>
									<button
										type="button"
										aria-label="Increase quantity"
										onclick={() => changeQty(line.dish.id, 1)}
										class="flex h-7 w-7 items-center justify-center rounded-full border hover:bg-stone-100"
									>
										<Plus class="h-3.5 w-3.5" />
									</button>
									<button
										type="button"
										aria-label="Remove {line.dish.name}"
										onclick={() => removeFromCart(line.dish.id)}
										class="ml-auto rounded-full p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>
							</div>
							<p class="font-bold">{formatPrice(line.unitPrice * line.qty)}</p>
						</li>
					{/each}
				</ul>

				<div class="mt-6">
					<label for="promo" class="text-sm font-semibold">Promo code</label>
					<div class="mt-1 flex gap-2">
						<input
							id="promo"
							type="text"
							value={store.promoCode}
							placeholder="Try FIRST50"
							oninput={(e) => (store.promoCode = e.currentTarget.value.toUpperCase())}
							class="min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm uppercase outline-none focus:border-brand"
						/>
						<button
							type="button"
							onclick={onApplyPromo}
							class="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-stone-800"
						>
							Apply
						</button>
					</div>
					{#if store.promoApplied}
						<p class="mt-1 text-sm font-semibold text-green-700">
							{#if store.promoApplied === FREEDEL_CODE}
								FREEDEL applied — delivery is free!
							{:else}
								{store.promoApplied} applied — {Math.round(promoRate(store.promoApplied) * 100)}% off!
							{/if}
						</p>
					{:else if promoError}
						<p class="mt-1 text-sm text-red-600">{promoError}</p>
					{/if}
					<p class="mt-1 text-xs text-muted">Try FIRST50, ZESTY20 or FREEDEL.</p>
				</div>
			</div>

			<div class="border-t px-5 py-4">
				<dl class="space-y-1 text-sm">
					<div class="flex justify-between"><dt class="text-muted">Subtotal</dt><dd>{formatPrice(t.subtotal)}</dd></div>
					{#if t.discount > 0}
						<div class="flex justify-between text-green-700">
							<dt>Discount ({store.promoApplied})</dt><dd>−{formatPrice(t.discount)}</dd>
						</div>
					{/if}
					<div class="flex justify-between">
						<dt class="text-muted">Delivery</dt><dd>{t.delivery === 0 ? 'FREE' : formatPrice(t.delivery)}</dd>
					</div>
					<div class="flex justify-between border-t pt-2 text-base font-bold">
						<dt>Total</dt><dd>{formatPrice(t.total)}</dd>
					</div>
				</dl>
				<button
					type="button"
					onclick={() => {
						store.cartOpen = false;
						store.checkoutOpen = true;
					}}
					class="mt-4 w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Checkout • {formatPrice(t.total)}
				</button>
			</div>
		{/if}
	</aside>
</div>
