<script lang="ts">
	import { Bell, Gift, Package, Star } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { NOTIFICATIONS } from '#lib/data.ts';

	let dismissed = $state(new Set<string>());
	let allRead = $state(false);

	let visible = $derived(NOTIFICATIONS.filter((n) => !dismissed.has(n.id)));

	function markAllRead() {
		allRead = true;
	}

	function iconFor(kind: string) {
		if (kind === 'order') return Package;
		if (kind === 'reward') return Star;
		return Gift;
	}
</script>

<svelte:head>
	<title>Notifications — Zesty</title>
	<meta
		name="description"
		content="Your Zesty notifications: order updates, offers and rewards — all in one place."
	/>
	<Seo
		title="Notifications — Zesty"
		description="Your Zesty notifications: order updates, offers and rewards — all in one place."
		path="/notifications"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div class="flex flex-wrap items-end justify-between gap-4" use:reveal>
		<div>
			<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Inbox</p>
			<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Notifications</h1>
			<p class="mt-2 max-w-xl text-muted">Order updates, offers and rewards — all in one place.</p>
		</div>
		<button
			type="button"
			onclick={markAllRead}
			class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
		>
			Mark all read
		</button>
	</div>

	{#if visible.length === 0}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm" use:reveal>
			<Bell class="mx-auto h-12 w-12 text-stone-300" />
			<p class="mt-3 font-display text-xl font-bold">All caught up</p>
			<p class="mt-1 text-sm text-muted">No notifications left. New order updates and offers will show up here.</p>
		</div>
	{:else}
		<ul class="mt-8 space-y-3">
			{#each visible as n, i (n.id)}
				{@const Icon = iconFor(n.kind)}
				<li class="flex items-start gap-3 rounded-3xl bg-white p-5 shadow-sm" use:reveal={{ delay: i * 60 }}>
					<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-brand">
						<Icon class="h-5 w-5" />
					</span>
					<div class="min-w-0 flex-1">
						<p class="font-bold">
							{n.title}
							{#if n.unread && !allRead}
								<span class="ml-2 inline-block h-2 w-2 rounded-full bg-brand align-middle" aria-label="Unread"></span>
							{/if}
						</p>
						<p class="mt-0.5 text-sm text-muted">{n.text}</p>
						<p class="mt-1 text-xs text-muted">{n.time}</p>
					</div>
					<button
						type="button"
						aria-label="Dismiss notification"
						onclick={() => dismissed.add(n.id)}
						class="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-muted hover:bg-stone-100 hover:text-ink"
					>
						Dismiss
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<p class="mt-6 text-center text-xs text-muted">
		Demo inbox — sample notifications. Notification settings live in your browser and the app.
	</p>
</div>
