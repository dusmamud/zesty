import {
	DELIVERY_FEE,
	DISHES,
	FREEDEL_CODE,
	FREE_DELIVERY_OVER,
	PROMOS,
	type Dish
} from '#lib/data.ts';

export interface OrderItem {
	dishId: string;
	qty: number;
	price: number;
}

export interface Order {
	id: string;
	items: OrderItem[];
	total: number;
	payment: string;
	name: string;
	address: string;
	placedAt: number;
}

export interface User {
	name: string;
	email: string;
	phone: string;
	address: string;
}

/** Shared app state (Svelte 5 runes). One object so every page sees the same state. */
export const store = $state({
	cart: {} as Record<string, CartEntry>,
	favourites: new Set<string>(),
	orders: [] as Order[],
	user: null as User | null,
	newsletterSubscribed: false,
	cartOpen: false,
	checkoutOpen: false,
	orderPlaced: null as { id: string; payment: string } | null,
	promoCode: '',
	promoApplied: null as string | null
});

/** One cart line: qty plus the per-unit price at add time (dish price + add-ons). */
export interface CartEntry {
	qty: number;
	unitPrice: number;
}

const LS = {
	cart: 'zesty-cart',
	favourites: 'zesty-favourites',
	orders: 'zesty-orders',
	user: 'zesty-user',
	newsletter: 'zesty-newsletter'
};

function load<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function persist() {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(LS.cart, JSON.stringify(store.cart));
		localStorage.setItem(LS.favourites, JSON.stringify([...store.favourites]));
		localStorage.setItem(LS.orders, JSON.stringify(store.orders));
		localStorage.setItem(LS.user, JSON.stringify(store.user));
		localStorage.setItem(LS.newsletter, JSON.stringify(store.newsletterSubscribed));
	} catch {
		// Storage unavailable (private mode, quota) — app still works in memory.
	}
}

// Browser-only: prerender runs server-side, so never touch localStorage at build time.
if (typeof window !== 'undefined') {
	// Migrate old carts stored as plain qty numbers ({id: qty}) to entries.
	const rawCart = load<Record<string, CartEntry | number>>(LS.cart, {});
	const migrated: Record<string, CartEntry> = {};
	for (const [id, entry] of Object.entries(rawCart)) {
		const dish = DISHES.find((d) => d.id === id);
		if (!dish) continue;
		if (typeof entry === 'number') migrated[id] = { qty: entry, unitPrice: dish.price };
		else if (entry && typeof entry.qty === 'number') {
			migrated[id] = { qty: entry.qty, unitPrice: entry.unitPrice ?? dish.price };
		}
	}
	store.cart = migrated;
	store.favourites = new Set(load<string[]>(LS.favourites, []));
	store.orders = load<Order[]>(LS.orders, []);
	store.user = load<User | null>(LS.user, null);
	store.newsletterSubscribed = load<boolean>(LS.newsletter, false);
}

export interface CartLine {
	dish: Dish;
	qty: number;
	unitPrice: number;
}

export function cartLines(): CartLine[] {
	return Object.entries(store.cart)
		.map(([id, entry]) => ({
			dish: DISHES.find((d) => d.id === id)!,
			qty: entry.qty,
			unitPrice: entry.unitPrice
		}))
		.filter((l) => l.dish && l.qty > 0);
}

export function cartCount(): number {
	return cartLines().reduce((n, l) => n + l.qty, 0);
}

export interface Totals {
	lines: CartLine[];
	subtotal: number;
	discount: number;
	delivery: number;
	total: number;
}

export function totals(): Totals {
	const lines = cartLines();
	const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
	const discount = subtotal * (store.promoApplied ? (PROMOS[store.promoApplied] ?? 0) : 0);
	const freeDelivery =
		store.promoApplied === FREEDEL_CODE || subtotal - discount >= FREE_DELIVERY_OVER;
	const delivery = subtotal === 0 || freeDelivery ? 0 : DELIVERY_FEE;
	return { lines, subtotal, discount, delivery, total: Math.max(0, subtotal - discount + delivery) };
}

export function addToCart(dish: Dish, qty = 1, unitPrice: number = dish.price) {
	const existing = store.cart[dish.id];
	// Same dish merges; the latest customisation's unit price wins for the line.
	store.cart = {
		...store.cart,
		[dish.id]: { qty: (existing?.qty ?? 0) + qty, unitPrice }
	};
	persist();
	store.cartOpen = true;
}

export function changeQty(dishId: string, delta: number) {
	const entry = store.cart[dishId];
	if (!entry) return;
	const qty = entry.qty + delta;
	const next = { ...store.cart };
	if (qty <= 0) delete next[dishId];
	else next[dishId] = { ...entry, qty };
	store.cart = next;
	persist();
}

export function removeFromCart(dishId: string) {
	const next = { ...store.cart };
	delete next[dishId];
	store.cart = next;
	persist();
}

export function toggleFavourite(id: string) {
	const next = new Set(store.favourites);
	if (next.has(id)) next.delete(id);
	else next.add(id);
	store.favourites = next;
	persist();
}

export function isValidPromo(code: string): boolean {
	return code in PROMOS || code === FREEDEL_CODE;
}

/** Returns an error message, or null when the code was applied. */
export function applyPromo(code: string): string | null {
	const c = code.trim().toUpperCase();
	if (isValidPromo(c)) {
		store.promoApplied = c;
		store.promoCode = c;
		return null;
	}
	store.promoApplied = null;
	return 'That code is not valid. Try FIRST50 (50% off), ZESTY20 (20% off) or FREEDEL (free delivery).';
}

export function placeOrder(details: { name: string; phone: string; address: string; payment: string }) {
	const t = totals();
	const order: Order = {
		id: `ZST${Math.floor(100000 + Math.random() * 900000)}`,
		items: t.lines.map((l) => ({ dishId: l.dish.id, qty: l.qty, price: l.unitPrice })),
		total: t.total,
		payment: details.payment,
		name: details.name,
		address: details.address,
		placedAt: Date.now()
	};
	store.orders = [order, ...store.orders];
	store.cart = {};
	store.promoApplied = null;
	store.promoCode = '';
	store.orderPlaced = { id: order.id, payment: order.payment };
	store.checkoutOpen = false;
	store.cartOpen = false;
	persist();
}

export function reorder(order: Order) {
	const next = { ...store.cart };
	for (const item of order.items) {
		const dish = DISHES.find((d) => d.id === item.dishId);
		if (dish) {
			const existing = next[item.dishId];
			next[item.dishId] = {
				qty: (existing?.qty ?? 0) + item.qty,
				unitPrice: item.price
			};
		}
	}
	store.cart = next;
	persist();
	store.cartOpen = true;
}

export function signIn(user: User) {
	store.user = user;
	persist();
}

export function signOut() {
	store.user = null;
	persist();
}

export function subscribeNewsletter() {
	store.newsletterSubscribed = true;
	persist();
}

/** Tracking step index from placedAt: 0 Placed, 1 Preparing (2 min), 2 Out for delivery (10 min), 3 Delivered (25 min). */
export function orderStatus(placedAt: number, now: number): number {
	const mins = (now - placedAt) / 60000;
	if (mins >= 25) return 3;
	if (mins >= 10) return 2;
	if (mins >= 2) return 1;
	return 0;
}

export function orderEtaMinutes(placedAt: number, now: number): number {
	return Math.max(0, Math.ceil(25 - (now - placedAt) / 60000));
}

export const TRACK_STEPS = ['Placed', 'Preparing', 'Out for delivery', 'Delivered'];
