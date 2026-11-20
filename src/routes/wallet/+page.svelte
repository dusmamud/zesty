<script lang="ts">
	import { Plus, Wallet } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { showToast, store } from '#lib/store.svelte.ts';
	import { formatPrice, WALLET_BALANCE, WALLET_TXS } from '#lib/data.ts';

	let balance = $state(WALLET_BALANCE);
	let added = $state(0);

	function addMoney(amount: number) {
		balance += amount;
		added += amount;
		showToast(`Added ${formatPrice(amount)} to your wallet (demo)`);
	}

	// Real orders placed in this session also show up as wallet spending.
	let orderTxs = $derived(
		store.orders.map((o) => ({ id: o.id, label: `Order ${o.id}`, date: new Date(o.placedAt).toLocaleDateString(), amount: -o.total }))
	);
</script>

<svelte:head>
	<title>Wallet — Zesty</title>
	<meta
		name="description"
		content="Your Zesty wallet: balance, add money, referral credit and transaction history."
	/>
	<Seo
		title="Wallet — Zesty"
		description="Your Zesty wallet: balance, add money, referral credit and transaction history."
		path="/wallet"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">My Wallet</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Zesty Wallet</h1>
		<p class="mt-2 max-w-xl text-muted">Referral credit, refunds and top-ups live here — and pay for orders in one tap at checkout.</p>
	</div>

	<div class="mt-8 rounded-3xl bg-ink p-8 text-white shadow-sm" use:reveal>
		<p class="flex items-center gap-2 text-sm font-bold text-stone-300"><Wallet class="h-4 w-4" /> Available balance</p>
		<p class="mt-2 font-display text-4xl font-extrabold">{formatPrice(balance)}</p>
		{#if added > 0}
			<p class="mt-1 text-sm text-green-400">+{formatPrice(added)} added in this session (demo)</p>
		{/if}
		<div class="mt-5 flex flex-wrap gap-2">
			{#each [10, 25, 50] as amount (amount)}
				<button
					type="button"
					onclick={() => addMoney(amount)}
					class="flex items-center gap-1 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink transition-transform duration-150 hover:bg-stone-100 active:scale-95"
				>
					<Plus class="h-4 w-4" /> Add {formatPrice(amount)}
				</button>
			{/each}
		</div>
		<p class="mt-4 text-xs text-stone-400">Demo wallet — no real money moves. Referral credit from friends lands here too.</p>
	</div>

	<div class="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:reveal>
		<h2 class="font-display text-xl font-bold">Transactions</h2>
		<ul class="mt-4 divide-y divide-orange-100">
			{#each orderTxs as tx (tx.id)}
				<li class="flex items-center justify-between gap-3 py-3">
					<div>
						<p class="font-bold">{tx.label}</p>
						<p class="text-xs text-muted">{tx.date}</p>
					</div>
					<span class="font-extrabold text-red-600">{formatPrice(tx.amount)}</span>
				</li>
			{/each}
			{#each WALLET_TXS as tx (tx.id)}
				<li class="flex items-center justify-between gap-3 py-3">
					<div>
						<p class="font-bold">{tx.label}</p>
						<p class="text-xs text-muted">{tx.date}</p>
					</div>
					<span class="font-extrabold {tx.amount >= 0 ? 'text-green-700' : 'text-red-600'}">
						{tx.amount >= 0 ? '+' : ''}{formatPrice(tx.amount)}
					</span>
				</li>
			{/each}
		</ul>
		<p class="mt-2 text-xs text-muted">Sample history shown for demo purposes.</p>
		<div class="mt-5 flex flex-wrap gap-3">
			<a href="/refer" class="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">Earn $5 per referral →</a>
			<a href="/rewards" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">Zesty Rewards →</a>
		</div>
	</div>
</div>
