<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { Banknote, CheckCircle2, Clock, CreditCard, Smartphone, X } from '@lucide/svelte';
	import { placeOrder, store, totals } from '#lib/store.svelte.ts';
	import { DELIVERY_SLOTS, formatPrice, TIP_OPTIONS } from '#lib/data.ts';

	let t = $derived(totals());

	let name = $state(store.user?.name ?? '');
	let phone = $state(store.user?.phone ?? '');
	let address = $state(store.user?.address ?? '');
	let payment = $state('UPI');
	let error = $state('');

	function submit() {
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
			error = 'Please enter a valid 10-digit phone number.';
			return;
		}
		if (address.trim().length < 8) {
			error = 'Please enter your full delivery address.';
			return;
		}
		error = '';
		placeOrder({ name: name.trim(), phone: phone.trim(), address: address.trim(), payment });
	}
</script>

<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-label="Checkout">
	<button
		type="button"
		aria-label="Close checkout"
		onclick={() => (store.checkoutOpen = false)}
		transition:fade={{ duration: 200 }}
		class="absolute inset-0 bg-black/40"
	></button>
	<div
		transition:scale={{ start: 0.96, duration: 200 }}
		class="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
		style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom))"
	>
		<div class="flex items-center justify-between">
			<h2 class="font-display text-xl font-bold">Guest Checkout</h2>
			<button type="button" aria-label="Close checkout" onclick={() => (store.checkoutOpen = false)} class="rounded-full p-2 hover:bg-stone-100">
				<X class="h-5 w-5" />
			</button>
		</div>
		<p class="mt-1 text-sm text-muted">No account needed — order as a guest.</p>

		<div class="mt-5 space-y-3">
			<div>
				<label for="co-name" class="text-sm font-semibold">Your name</label>
				<input id="co-name" type="text" bind:value={name} placeholder="e.g. Aarav Patel" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
			</div>
			<div>
				<label for="co-phone" class="text-sm font-semibold">Phone number</label>
				<input id="co-phone" type="tel" inputmode="numeric" bind:value={phone} placeholder="10-digit mobile number" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
			</div>
			<div>
				<label for="co-address" class="text-sm font-semibold">Delivery address</label>
				<textarea id="co-address" rows="2" bind:value={address} placeholder="Flat, street, area, city" class="mt-1 w-full resize-none rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"></textarea>
				{#if store.addresses.length > 0}
					<div class="mt-2 flex flex-wrap gap-2">
						{#each store.addresses as saved (saved.id)}
							<button
								type="button"
								onclick={() => (address = saved.address)}
								class="rounded-full border px-3 py-1.5 text-xs font-bold {address === saved.address
									? 'border-brand bg-orange-50 text-orange-700'
									: 'border-stone-200 hover:border-stone-300'}"
							>
								{saved.label}: {saved.address}
							</button>
						{/each}
						<a href="/addresses" class="rounded-full px-3 py-1.5 text-xs font-bold text-orange-700 hover:underline">
							Manage addresses →
						</a>
					</div>
				{/if}
			</div>

			<fieldset>
				<legend class="flex items-center gap-1.5 text-sm font-semibold"><Clock class="h-4 w-4 text-brand" /> Delivery time</legend>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each DELIVERY_SLOTS as slot (slot)}
						<button
							type="button"
							aria-pressed={store.slot === slot}
							onclick={() => (store.slot = slot)}
							class="rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-150 active:scale-95 {store.slot === slot
								? 'bg-brand text-white shadow'
								: 'bg-white text-stone-700 shadow-sm hover:text-brand'}"
						>
							{slot}
						</button>
					{/each}
				</div>
				<p class="mt-1.5 text-xs text-muted">Schedule ahead — pre-book lunch or dinner. Demo slots, no real booking.</p>
			</fieldset>

			<fieldset>
				<legend class="text-sm font-semibold">Tip your rider</legend>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each TIP_OPTIONS as opt (opt.label)}
						<button
							type="button"
							aria-pressed={store.tipRate === opt.rate}
							onclick={() => (store.tipRate = opt.rate)}
							class="rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 active:scale-95 {store.tipRate === opt.rate
								? 'bg-brand text-white shadow'
								: 'bg-white text-stone-700 shadow-sm hover:text-brand'}"
						>
							{opt.label}
						</button>
					{/each}
				</div>
				{#if store.tipRate > 0}
					<p class="mt-1.5 text-xs text-muted">Tip: {formatPrice(t.tip)} — 100% goes to your rider.</p>
				{/if}
			</fieldset>

			<fieldset>
				<legend class="text-sm font-semibold">Payment method</legend>
				<div class="mt-2 grid grid-cols-3 gap-2">
					{#each [{ id: 'UPI', icon: Smartphone }, { id: 'Card', icon: CreditCard }, { id: 'COD', icon: Banknote }] as opt (opt.id)}
						{@const Icon = opt.icon}
						<button
							type="button"
							aria-pressed={payment === opt.id}
							onclick={() => (payment = opt.id)}
							class="flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm font-semibold {payment === opt.id
								? 'border-brand bg-orange-50 text-orange-700'
								: 'border-stone-200 hover:border-stone-300'}"
						>
							<Icon class="h-5 w-5" />
							{opt.id}
						</button>
					{/each}
				</div>
			</fieldset>

			{#if error}
				<p role="alert" class="text-sm font-semibold text-red-600">{error}</p>
			{/if}

			<div class="rounded-2xl bg-cream p-4">
				<p class="text-sm font-bold">Your order</p>
				<ul class="mt-2 space-y-2">
					{#each t.lines as line (line.dish.id)}
						<li class="text-sm">
							<span class="font-semibold">{line.qty} × {line.dish.name}</span>
							<span class="text-muted"> — {formatPrice(line.unitPrice * line.qty)}</span>
							{#if line.spice || line.instructions}
								<span class="block text-xs text-muted">
									{#if line.spice}Spice: {line.spice}{/if}{#if line.spice && line.instructions}
										•
									{/if}{#if line.instructions}Note: {line.instructions}{/if}
								</span>
							{/if}
						</li>
					{/each}
				</ul>
				<!-- Full fee breakdown — no hidden charges at the last step -->
				<dl class="mt-3 space-y-1 border-t border-orange-200 pt-3 text-sm">
					<div class="flex justify-between"><dt class="text-muted">Subtotal</dt><dd class="font-semibold">{formatPrice(t.subtotal)}</dd></div>
					{#if t.discount > 0}
						<div class="flex justify-between"><dt class="text-green-700">Discount ({store.promoApplied})</dt><dd class="font-semibold text-green-700">−{formatPrice(t.discount)}</dd></div>
					{/if}
					<div class="flex justify-between"><dt class="text-muted">Delivery fee</dt><dd class="font-semibold">{t.delivery === 0 ? 'FREE' : formatPrice(t.delivery)}</dd></div>
					{#if t.tip > 0}
						<div class="flex justify-between"><dt class="text-muted">Rider tip</dt><dd class="font-semibold">{formatPrice(t.tip)}</dd></div>
					{/if}
					<div class="flex justify-between border-t border-orange-200 pt-2 text-base font-extrabold"><dt>Total</dt><dd>{formatPrice(t.total)}</dd></div>
				</dl>
				<p class="mt-2 text-xs text-muted">{store.slot === DELIVERY_SLOTS[0] ? 'Arriving in 20–30 min' : `Scheduled: ${store.slot}`} • No hidden fees.</p>
			</div>

			<button
				type="button"
				onclick={submit}
				class="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				<CheckCircle2 class="h-5 w-5" />
				Place Order • {formatPrice(t.total)}
			</button>
			<p class="text-center text-xs text-muted">Demo checkout — no real payment is taken.</p>
		</div>
	</div>
</div>
