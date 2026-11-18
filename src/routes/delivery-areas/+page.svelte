<script lang="ts">
	import { MapPin } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { DELIVERY_AREAS, DELIVERY_FEE, formatPrice, FREE_DELIVERY_OVER } from '#lib/data.ts';
</script>

<svelte:head>
	<title>Delivery Areas — Zesty</title>
	<meta
		name="description"
		content="Where Zesty delivers, how long it takes and what delivery costs. Free delivery over $20 in every area we serve."
	/>
	<Seo
		title="Delivery Areas — Zesty"
		description="Where Zesty delivers, how long it takes and what delivery costs. Free delivery over $20 in every area we serve."
		path="/delivery-areas"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Delivery Areas</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Where We Deliver</h1>
		<p class="mt-2 max-w-xl text-muted">
			Hot food in 20–30 minutes across these neighbourhoods. Delivery is
			{formatPrice(DELIVERY_FEE)} — free on orders over {formatPrice(FREE_DELIVERY_OVER)}.
		</p>
	</div>

	<div class="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm" use:motionReveal>
		<table class="w-full text-left text-sm">
			<thead>
				<tr class="border-b border-orange-100 text-xs tracking-widest text-muted uppercase">
					<th class="px-6 py-4 font-bold">Area</th>
					<th class="px-6 py-4 text-right font-bold">Typical time</th>
				</tr>
			</thead>
			<tbody>
				{#each DELIVERY_AREAS as a (a.area)}
					<tr class="border-b border-orange-50 last:border-0">
						<td class="flex items-center gap-2 px-6 py-4 font-bold">
							<MapPin class="h-4 w-4 text-brand" /> {a.area}
						</td>
						<td class="px-6 py-4 text-right text-muted">{a.eta}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-6 rounded-3xl bg-cream-dark p-6 sm:p-8" use:motionReveal={{ delay: 100 }}>
		<h2 class="font-display text-xl font-extrabold">Outside these areas?</h2>
		<p class="mt-2 text-muted">
			We are adding new neighbourhoods every month. Check back soon — new areas open
			regularly.
		</p>
		<a
			href="/menu"
			class="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
		>
			Browse the Menu
		</a>
	</div>
</div>
