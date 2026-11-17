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
	veg: boolean;
	ingredients: string[];
}

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
		image: '/images/burger-chicken.jpg',
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
		image: '/images/burger-cheese.jpg',
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
		image: '/images/pizza-veggie.jpg',
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
		image: '/images/pizza-margherita.jpg',
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
		image: '/images/noodles-thai.jpg',
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
		image: '/images/fried-rice.jpg',
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
		image: '/images/lava-cake.jpg',
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
		image: '/images/smoothie.jpg',
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
		image: '/images/biryani-veg.jpg',
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
		image: '/images/chicken-wings.jpg',
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
		image: '/images/garlic-bread.jpg',
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
		image: '/images/cold-coffee.jpg',
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

/** Neighbourhoods we deliver to, with typical delivery times. */
export const DELIVERY_AREAS: Array<{ area: string; eta: string }> = [
	{ area: 'Downtown', eta: '20–25 min' },
	{ area: 'Riverside', eta: '20–30 min' },
	{ area: 'Old Town', eta: '25–30 min' },
	{ area: 'University District', eta: '20–25 min' },
	{ area: 'Green Park', eta: '25–30 min' },
	{ area: 'Harbour View', eta: '25–30 min' }
];
