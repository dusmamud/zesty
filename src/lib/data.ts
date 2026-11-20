export type Category = 'Burgers' | 'Pizza' | 'Asian' | 'Desserts' | 'Drinks';

export interface Dish {
	id: string;
	name: string;
	desc: string;
	price: number;
	oldPrice?: number;
	discount?: string;
	rating: number;
	reviews: number;
	category: Category;
	image: string;
	/** Intrinsic pixel size of the dish photo (for width/height attributes). */
	width: number;
	height: number;
	veg: boolean;
	ingredients: string[];
}

/** Intrinsic pixel size of non-dish images (avatars, hero, etc.). */
export const IMAGE_DIMS: Record<string, { width: number; height: number }> = {
	'/images/hero-woman.webp': { width: 900, height: 900 },
	'/images/salad-bowl.webp': { width: 800, height: 533 },
	'/images/testimonial-woman.webp': { width: 800, height: 800 },
	'/images/avatars/alex-morgan.webp': { width: 200, height: 200 },
	'/images/avatars/avatar-man.webp': { width: 200, height: 200 },
	'/images/avatars/avatar-woman-1.webp': { width: 200, height: 133 },
	'/images/avatars/avatar-woman-2.webp': { width: 200, height: 134 }
};

export const CATEGORIES: Array<'All' | Category> = [
	'All',
	'Burgers',
	'Pizza',
	'Asian',
	'Desserts',
	'Drinks'
];

export const DISHES: Dish[] = [
	{
		id: 'zesty-chicken-burger',
		name: 'Zesty Chicken Burger',
		desc: 'Crispy fried chicken, fresh lettuce, tomato and our signature zesty sauce.',
		price: 5.49,
		oldPrice: 6.49,
		discount: '-15%',
		rating: 4.9,
		reviews: 410,
		category: 'Burgers',
		image: '/images/burger-chicken.webp',
		width: 719,
		height: 719,
		veg: false,
		ingredients: ['Crispy fried chicken', 'Lettuce', 'Tomato', 'Zesty sauce', 'Sesame bun']
	},
	{
		id: 'double-cheese-burger',
		name: 'Double Cheese Burger',
		desc: 'Two juicy patties, melted cheddar, pickles, onion and house sauce.',
		price: 6.99,
		rating: 4.8,
		reviews: 285,
		category: 'Burgers',
		image: '/images/burger-cheese.webp',
		width: 800,
		height: 533,
		veg: false,
		ingredients: ['Two beef patties', 'Cheddar cheese', 'Pickles', 'Onion', 'House sauce']
	},
	{
		id: 'veggie-supreme-pizza',
		name: 'Veggie Supreme Pizza',
		desc: 'Bell peppers, mushrooms, red onion and sweet corn on a wood-fired base.',
		price: 7.49,
		oldPrice: 9.49,
		discount: '-20%',
		rating: 4.8,
		reviews: 320,
		category: 'Pizza',
		image: '/images/pizza-veggie.webp',
		width: 900,
		height: 675,
		veg: true,
		ingredients: ['Bell peppers', 'Mushrooms', 'Red onion', 'Sweet corn', 'Mozzarella']
	},
	{
		id: 'margherita-pizza',
		name: 'Margherita Pizza',
		desc: 'Classic tomato, fresh mozzarella and basil. Simple, and done right.',
		price: 8.49,
		rating: 4.7,
		reviews: 198,
		category: 'Pizza',
		image: '/images/pizza-margherita.webp',
		width: 900,
		height: 601,
		veg: true,
		ingredients: ['Tomato sauce', 'Fresh mozzarella', 'Basil', 'Olive oil']
	},
	{
		id: 'thai-basil-noodles',
		name: 'Thai Basil Noodles',
		desc: 'Stir-fried noodles tossed with Thai basil, peppers and crunchy peanuts.',
		price: 6.59,
		rating: 4.7,
		reviews: 210,
		category: 'Asian',
		image: '/images/noodles-thai.webp',
		width: 900,
		height: 755,
		veg: true,
		ingredients: ['Rice noodles', 'Thai basil', 'Bell peppers', 'Peanuts', 'Soy glaze']
	},
	{
		id: 'schezwan-fried-rice',
		name: 'Schezwan Fried Rice',
		desc: 'Wok-tossed rice with schezwan spice, egg, spring onion and chicken.',
		price: 7.49,
		rating: 4.6,
		reviews: 176,
		category: 'Asian',
		image: '/images/fried-rice.webp',
		width: 900,
		height: 720,
		veg: false,
		ingredients: ['Basmati rice', 'Schezwan sauce', 'Egg', 'Spring onion', 'Chicken']
	},
	{
		id: 'chocolate-lava-cake',
		name: 'Chocolate Lava Cake',
		desc: 'Warm chocolate cake with a molten centre, served with vanilla crumbs.',
		price: 4.99,
		rating: 4.9,
		reviews: 342,
		category: 'Desserts',
		image: '/images/lava-cake.webp',
		width: 900,
		height: 600,
		veg: true,
		ingredients: ['Dark chocolate', 'Butter', 'Vanilla crumbs', 'Cocoa']
	},
	{
		id: 'mango-smoothie',
		name: 'Mango Smoothie',
		desc: 'Thick mango smoothie blended with yoghurt and a hint of honey.',
		price: 3.49,
		rating: 4.8,
		reviews: 154,
		category: 'Drinks',
		image: '/images/smoothie.webp',
		width: 600,
		height: 800,
		veg: true,
		ingredients: ['Mango', 'Yoghurt', 'Honey', 'Ice']
	},
	{
		id: 'veg-biryani',
		name: 'Veg Biryani',
		desc: 'Fragrant basmati rice layered with spiced vegetables and saffron, served with cool raita.',
		price: 8.99,
		rating: 4.8,
		reviews: 265,
		category: 'Asian',
		image: '/images/biryani-veg.webp',
		width: 800,
		height: 1200,
		veg: true,
		ingredients: ['Basmati rice', 'Mixed vegetables', 'Saffron', 'Fried onions', 'Raita']
	},
	{
		id: 'grilled-chicken-wings',
		name: 'Grilled Chicken Wings',
		desc: 'Smoky grilled wings tossed in BBQ glaze, served with a cool garlic dip.',
		price: 6.49,
		rating: 4.7,
		reviews: 198,
		category: 'Burgers',
		image: '/images/chicken-wings.webp',
		width: 900,
		height: 1352,
		veg: false,
		ingredients: ['Chicken wings', 'Smoky BBQ glaze', 'Garlic dip', 'Spring onion']
	},
	{
		id: 'garlic-bread',
		name: 'Garlic Bread',
		desc: 'Crusty bread baked with garlic butter, herbs and a dusting of parmesan.',
		price: 3.99,
		rating: 4.6,
		reviews: 142,
		category: 'Pizza',
		image: '/images/garlic-bread.webp',
		width: 900,
		height: 1350,
		veg: true,
		ingredients: ['French bread', 'Garlic butter', 'Mixed herbs', 'Parmesan']
	},
	{
		id: 'cold-coffee',
		name: 'Cold Coffee',
		desc: 'Chilled espresso shaken with cold milk and vanilla, served over ice.',
		price: 3.99,
		rating: 4.8,
		reviews: 187,
		category: 'Drinks',
		image: '/images/cold-coffee.webp',
		width: 900,
		height: 1350,
		veg: true,
		ingredients: ['Espresso', 'Cold milk', 'Ice', 'Vanilla syrup']
	}
];

export interface Testimonial {
	name: string;
	rating: number;
	text: string;
	role: string;
}

export const TESTIMONIALS: Testimonial[] = [
	{
		name: 'Alex Morgan',
		rating: 4.9,
		text: 'The chicken burger arrived hot in 25 minutes and still tasted like it just left the kitchen. Zesty is now my default order.',
		role: 'Regular customer'
	},
	{
		name: 'Priya Sharma',
		rating: 5.0,
		text: 'I order the Thai noodles almost every week. The food is fresh, the packaging is neat, and the delivery partner is always polite.',
		role: 'Foodie, orders weekly'
	},
	{
		name: 'James Carter',
		rating: 4.8,
		text: 'First order with FIRST50 and the pizza was genuinely great — proper cheese pull, not soggy at all. Impressed.',
		role: 'New customer'
	}
];

/** Short customer reviews shown on dish pages (rotated per dish). */
export const DISH_REVIEWS: Array<{ name: string; rating: number; text: string }> = [
	{
		name: 'Riya K.',
		rating: 5,
		text: 'Arrived hot and fresh — easily the best version of this dish I have had delivered.'
	},
	{
		name: 'Arjun M.',
		rating: 5,
		text: 'Portion is generous and the flavours are spot on. Reordered twice this week.'
	},
	{
		name: 'Sana P.',
		rating: 4,
		text: 'Really good. A little less salt would make it perfect, but I will order it again.'
	},
	{
		name: 'Vikram T.',
		rating: 5,
		text: 'Packaging was neat, food was still warm after 25 minutes. Great value for money.'
	},
	{
		name: 'Meera D.',
		rating: 4,
		text: 'Tasty and fresh. The kids loved it — that is saying something.'
	}
];

export const FREE_DELIVERY_OVER = 20;
export const DELIVERY_FEE = 1.99;

export const PROMOS: Record<string, number> = {
	FIRST50: 0.5,
	ZESTY20: 0.2
};

/** FREEDEL is not a percentage discount — it waives the delivery fee (see store). */
export const FREEDEL_CODE = 'FREEDEL';

/** Shared offer cards — one system used on home and /offers (accent is the only difference). */
export type OfferAccent = 'orange' | 'green' | 'amber';

export interface Offer {
	code: string;
	title: string;
	text: string;
	terms: string;
	accent: OfferAccent;
	tag: string;
}

export const OFFERS: Offer[] = [
	{
		code: 'FIRST50',
		title: '50% off your first order',
		text: 'Half price on your very first Zesty order. No minimum spend.',
		terms: 'First order only • One use per customer • Valid till 31 Dec 2026',
		accent: 'orange',
		tag: 'Most popular'
	},
	{
		code: 'ZESTY20',
		title: '20% off orders over $15',
		text: 'A flat 20% off whenever your order crosses $15.',
		terms: 'Minimum order $15 • Can be used on every order • Valid till 31 Dec 2026',
		accent: 'green',
		tag: 'Best value'
	},
	{
		code: 'FREEDEL',
		title: 'Free delivery on any order',
		text: 'Delivery fee waived completely — even on a single coffee.',
		terms: 'No minimum spend • One use per order • Valid till 31 Dec 2026',
		accent: 'amber',
		tag: 'No minimum'
	}
];

export function promoRate(code: string | null): number {
	return code ? (PROMOS[code] ?? 0) : 0;
}

export function formatPrice(n: number): string {
	return `$${n.toFixed(2)}`;
}

/**
 * Build a srcset string for a photo that has `-<width>.webp` variants
 * (e.g. `/images/pizza-veggie-480.webp`). The original file is the largest
 * candidate, at its intrinsic width. Variants wider than the source are
 * skipped (never upscale). Keep a plain `src` alongside — it is the fallback.
 */
export function responsiveSrcset(src: string, fullWidth: number, variants: number[] = [480, 720]): string {
	const stem = src.replace(/\.webp$/, '');
	const cands = variants
		.filter((w) => w < fullWidth)
		.map((w) => `${stem}-${w}.webp ${w}w`);
	cands.push(`${src} ${fullWidth}w`);
	return cands.join(', ');
}

/** Neighbourhoods we deliver to, with typical delivery times. */
export const DELIVERY_AREAS: Array<{ area: string; eta: string }> = [
	{ area: 'Downtown', eta: '20–25 min' },
	{ area: 'Riverside', eta: '20–30 min' },
	{ area: 'Old Town', eta: '25–30 min' },
	{ area: 'University District', eta: '20–25 min' },
	{ area: 'Green Park', eta: '25–30 min' },
	{ area: 'Harbour View', eta: '25–30 min' }
];

/** Mock customer reviews (reviews page). Ratings and text are demo content. */
export interface Review {
	name: string;
	dish: string;
	rating: number;
	date: string;
	text: string;
}

export const REVIEWS: Review[] = [
	{ name: 'Alex Morgan', dish: 'Zesty Chicken Burger', rating: 5, date: '14 Nov 2026', text: 'The chicken burger arrived hot in 25 minutes and still tasted like it just left the kitchen. Zesty is now my default order.' },
	{ name: 'Priya Sharma', dish: 'Thai Basil Noodles', rating: 5, date: '11 Nov 2026', text: 'I order the Thai noodles almost every week. The food is fresh, the packaging is neat, and the delivery partner is always polite.' },
	{ name: 'James Carter', dish: 'Veggie Supreme Pizza', rating: 5, date: '8 Nov 2026', text: 'First order with FIRST50 and the pizza was genuinely great — proper cheese pull, not soggy at all. Impressed.' },
	{ name: 'Riya K.', dish: 'Chocolate Lava Cake', rating: 5, date: '6 Nov 2026', text: 'Arrived hot and fresh — easily the best version of this dish I have had delivered.' },
	{ name: 'Arjun M.', dish: 'Double Cheese Burger', rating: 5, date: '2 Nov 2026', text: 'Portion is generous and the flavours are spot on. Reordered twice this week.' },
	{ name: 'Sana P.', dish: 'Veg Biryani', rating: 4, date: '30 Oct 2026', text: 'Really good. A little less salt would make it perfect, but I will order it again.' },
	{ name: 'Vikram T.', dish: 'Schezwan Fried Rice', rating: 5, date: '28 Oct 2026', text: 'Packaging was neat, food was still warm after 25 minutes. Great value for money.' },
	{ name: 'Meera D.', dish: 'Mango Smoothie', rating: 4, date: '25 Oct 2026', text: 'Tasty and fresh. The kids loved it — that is saying something.' },
	{ name: 'Noah W.', dish: 'Grilled Chicken Wings', rating: 5, date: '21 Oct 2026', text: 'Smoky, juicy, and the garlic dip is dangerously good. My Friday-night regular now.' },
	{ name: 'Anaya S.', dish: 'Margherita Pizza', rating: 5, date: '18 Oct 2026', text: 'Simple done right. Fresh basil, good mozzarella, base still crisp on arrival.' },
	{ name: 'Kabir R.', dish: 'Cold Coffee', rating: 4, date: '15 Oct 2026', text: 'Properly chilled and not too sweet. Wish the large size was on the menu too.' },
	{ name: 'Elena G.', dish: 'Garlic Bread', rating: 5, date: '12 Oct 2026', text: 'Crusty outside, buttery inside. The parmesan dusting is a nice touch.' }
];

/** Zesty Rewards tiers (mock loyalty programme — points are demo only). */
export interface RewardTier {
	name: string;
	points: string;
	perks: string[];
}

export const REWARD_TIERS: RewardTier[] = [
	{ name: 'Bronze', points: '0–499 pts', perks: ['1 pt per $1 spent', 'Birthday treat', 'Members-only offers'] },
	{ name: 'Silver', points: '500–1,499 pts', perks: ['Everything in Bronze', 'Free delivery on weekends', 'Early access to new dishes'] },
	{ name: 'Gold', points: '1,500+ pts', perks: ['Everything in Silver', 'Free delivery, always', 'Priority support', 'Double points Tuesdays'] }
];

/** Gift card denominations (mock — demo checkout only, no real payment). */
export const GIFT_CARD_AMOUNTS = [10, 25, 50, 100];

/** Catering packages (mock — enquiry only, no real booking). */
export interface CateringPackage {
	name: string;
	serves: string;
	price: string;
	items: string[];
}

export const CATERING_PACKAGES: CateringPackage[] = [
	{ name: 'Small Gathering', serves: 'Serves 10–15', price: 'From $89', items: ['2 burger platters', '1 pizza platter', 'Garlic bread', 'Soft drinks'] },
	{ name: 'Office Lunch', serves: 'Serves 20–30', price: 'From $179', items: ['Mixed burger + pizza platters', 'Thai noodles trays', 'Salad bowls', 'Cold coffee + smoothies'] },
	{ name: 'Big Celebration', serves: 'Serves 40–60', price: 'From $349', items: ['Full menu spread', 'Veg biryani trays', 'Dessert platter', 'Dedicated delivery slot'] }
];

/** Allergen guide per dish (from the listed ingredients — demo content). */
export const ALLERGEN_INFO: Record<string, string[]> = {
	'zesty-chicken-burger': ['Gluten (bun)', 'Egg (sauce)'],
	'double-cheese-burger': ['Gluten (bun)', 'Milk (cheese)', 'Egg (sauce)'],
	'veggie-supreme-pizza': ['Gluten (base)', 'Milk (mozzarella)'],
	'margherita-pizza': ['Gluten (base)', 'Milk (mozzarella)'],
	'thai-basil-noodles': ['Peanuts', 'Soy', 'Gluten (noodles)'],
	'schezwan-fried-rice': ['Egg', 'Soy'],
	'chocolate-lava-cake': ['Gluten', 'Milk', 'Egg'],
	'mango-smoothie': ['Milk (yoghurt)'],
	'veg-biryani': ['Milk (raita)'],
	'grilled-chicken-wings': ['Milk (dip)'],
	'garlic-bread': ['Gluten', 'Milk'],
	'cold-coffee': ['Milk']
};

/** Estimated nutrition per dish (demo values — not lab-tested). */
export interface Nutrition {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
}

export const NUTRITION: Record<string, Nutrition> = {
	'zesty-chicken-burger': { calories: 640, protein: 32, carbs: 48, fat: 34 },
	'double-cheese-burger': { calories: 820, protein: 44, carbs: 42, fat: 48 },
	'veggie-supreme-pizza': { calories: 580, protein: 22, carbs: 72, fat: 22 },
	'margherita-pizza': { calories: 540, protein: 20, carbs: 68, fat: 20 },
	'thai-basil-noodles': { calories: 490, protein: 14, carbs: 76, fat: 14 },
	'schezwan-fried-rice': { calories: 560, protein: 18, carbs: 74, fat: 20 },
	'chocolate-lava-cake': { calories: 420, protein: 6, carbs: 52, fat: 22 },
	'mango-smoothie': { calories: 210, protein: 6, carbs: 38, fat: 4 },
	'veg-biryani': { calories: 620, protein: 16, carbs: 88, fat: 18 },
	'grilled-chicken-wings': { calories: 480, protein: 38, carbs: 8, fat: 32 },
	'garlic-bread': { calories: 310, protein: 8, carbs: 42, fat: 12 },
	'cold-coffee': { calories: 160, protein: 5, carbs: 24, fat: 5 }
};

/** Meal combos — bundles of existing dishes (demo bundles; items are added
 * to the cart individually, so the normal cart math still applies). */
export interface Combo {
	id: string;
	name: string;
	desc: string;
	serves: string;
	tag: string;
	items: Array<{ dishId: string; qty: number }>;
}

export const COMBOS: Combo[] = [
	{
		id: 'family-feast',
		name: 'Family Feast',
		desc: 'Two burgers, a whole pizza and wings — the table favourite.',
		serves: 'Serves 4',
		tag: 'Most ordered',
		items: [
			{ dishId: 'zesty-chicken-burger', qty: 2 },
			{ dishId: 'veggie-supreme-pizza', qty: 1 },
			{ dishId: 'grilled-chicken-wings', qty: 1 }
		]
	},
	{
		id: 'movie-night',
		name: 'Movie Night',
		desc: 'Pizza, garlic bread and two cold coffees. Couch, sorted.',
		serves: 'Serves 2',
		tag: 'Best value',
		items: [
			{ dishId: 'margherita-pizza', qty: 1 },
			{ dishId: 'garlic-bread', qty: 1 },
			{ dishId: 'cold-coffee', qty: 2 }
		]
	},
	{
		id: 'veggie-party',
		name: 'Veggie Party',
		desc: 'All-veg spread: biryani, pizza, noodles and smoothies.',
		serves: 'Serves 4',
		tag: '100% veg',
		items: [
			{ dishId: 'veg-biryani', qty: 1 },
			{ dishId: 'veggie-supreme-pizza', qty: 1 },
			{ dishId: 'thai-basil-noodles', qty: 1 },
			{ dishId: 'mango-smoothie', qty: 2 }
		]
	}
];

export function comboPrice(combo: Combo): { price: number; oldPrice: number } {
	let price = 0;
	for (const item of combo.items) {
		const dish = DISHES.find((d) => d.id === item.dishId);
		if (dish) price += dish.price * item.qty;
	}
	// Combos save 10% on the summed dish prices.
	const discounted = Math.round(price * 0.9 * 100) / 100;
	return { price: discounted, oldPrice: Math.round(price * 100) / 100 };
}

/** Delivery time slots offered at checkout (demo slots). */
export const DELIVERY_SLOTS = [
	'ASAP — 20–30 min',
	'Today, 12:30 PM',
	'Today, 1:00 PM',
	'Today, 6:30 PM',
	'Tomorrow, 12:30 PM'
];

/** Tip options at checkout (fractions of the subtotal). */
export const TIP_OPTIONS: Array<{ label: string; rate: number }> = [
	{ label: 'No tip', rate: 0 },
	{ label: '10%', rate: 0.1 },
	{ label: '15%', rate: 0.15 },
	{ label: '20%', rate: 0.2 }
];

/** Demo rider shown on the tracking page (mock persona, not a real person). */
export const DEMO_RIDER = {
	name: 'Rahul K.',
	rating: 4.9,
	trips: 1240,
	vehicle: 'Scooter • Orange helmet',
	etaNote: 'Your rider is on the way'
};

/** Demo notifications (mock inbox). */
export interface AppNotification {
	id: string;
	kind: 'order' | 'offer' | 'reward';
	title: string;
	text: string;
	time: string;
	unread: boolean;
}

export const NOTIFICATIONS: AppNotification[] = [
	{ id: 'n1', kind: 'order', title: 'Order delivered', text: 'Your Zesty Chicken Burger order was delivered. Enjoy your meal!', time: '2h ago', unread: true },
	{ id: 'n2', kind: 'offer', title: 'FIRST50 is waiting', text: '50% off your first order — no minimum spend. Use code FIRST50 at checkout.', time: 'Yesterday', unread: true },
	{ id: 'n3', kind: 'reward', title: 'You earned 120 points', text: 'Your last order added 120 Zesty Rewards points. 380 more to Silver.', time: 'Yesterday', unread: false },
	{ id: 'n4', kind: 'offer', title: 'Free delivery weekend', text: 'Free delivery on all orders over $20 this weekend. No code needed.', time: '2 days ago', unread: false },
	{ id: 'n5', kind: 'reward', title: 'Gold tier is close', text: 'Order 3 more times this month to keep your Gold perks next month.', time: '3 days ago', unread: false }
];

/** Zesty Plus membership plans (demo — no real subscription is taken). */
export interface PlusPlan {
	id: string;
	name: string;
	price: string;
	period: string;
	save?: string;
	perks: string[];
}

export const PLUS_PLANS: PlusPlan[] = [
	{
		id: 'plus-monthly',
		name: 'Plus Monthly',
		price: '$4.99',
		period: 'per month',
		perks: ['Free delivery on every order', 'Priority support', 'Exclusive member deals', 'Cancel anytime']
	},
	{
		id: 'plus-annual',
		name: 'Plus Annual',
		price: '$49',
		period: 'per year',
		save: 'Save 18%',
		perks: ['Everything in Monthly', 'Two months free', 'Birthday month free delivery', 'Early access to new dishes']
	}
];

/** Referral programme (demo — codes and credits are not real). */
export const REFERRAL_CODE = 'ZESTY-INVITE';
export const REFERRAL_REWARD = '$5 credit for you, 50% off for your friend';

export interface Referral {
	name: string;
	status: 'Joined' | 'Ordered' | 'Invited';
	reward: string;
}

export const REFERRALS: Referral[] = [
	{ name: 'Aarav P.', status: 'Ordered', reward: '$5 earned' },
	{ name: 'Sana M.', status: 'Joined', reward: 'Waiting for first order' },
	{ name: 'Vikram T.', status: 'Invited', reward: 'Invite sent' }
];

/** Demo wallet transactions (mock history). */
export interface WalletTx {
	id: string;
	label: string;
	date: string;
	amount: number;
}

export const WALLET_TXS: WalletTx[] = [
	{ id: 'w1', label: 'Referral credit — Aarav P.', date: '16 Nov 2026', amount: 5 },
	{ id: 'w2', label: 'Added money', date: '12 Nov 2026', amount: 25 },
	{ id: 'w3', label: 'Order ZST790129', date: '11 Nov 2026', amount: -12.47 },
	{ id: 'w4', label: 'Welcome bonus', date: '8 Nov 2026', amount: 5 }
];

export const WALLET_BALANCE = 25;

/** Demo saved addresses (mock — edit or delete them on the Addresses page). */
export interface SavedAddress {
	id: string;
	label: 'Home' | 'Work' | 'Other';
	address: string;
	isDefault: boolean;
}

export const DEFAULT_ADDRESSES: SavedAddress[] = [
	{ id: 'a1', label: 'Home', address: '42 Palm Street, Downtown', isDefault: true },
	{ id: 'a2', label: 'Work', address: '8 Market Road, University District', isDefault: false }
];
