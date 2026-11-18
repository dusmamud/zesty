<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { Banknote, CheckCircle2, CreditCard, Smartphone, X } from '@lucide/svelte';
	import { placeOrder, store, totals } from '#lib/store.svelte.ts';
	import { formatPrice } from '#lib/data.ts';

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
		class="relative w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
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
				<textarea id="co-address" rows="2" bind:value={address} placeholder="Flat, street, area, city" class="mt-1 w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand"></textarea>
			</div>

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
							{payment === 'COD' ? 'Cash on Delivery' : opt.id}
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
