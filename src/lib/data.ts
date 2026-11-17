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
		veg: false
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
		veg: false
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
		veg: true
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
		veg: true
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
		veg: true
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
		veg: false
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
		veg: true
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
		veg: true
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

export const FREE_DELIVERY_OVER = 20;
export const DELIVERY_FEE = 1.99;

export const PROMOS: Record<string, number> = {
	FIRST50: 0.5,
	ZESTY20: 0.2
};

export function promoRate(code: string | null): number {
	return code ? (PROMOS[code] ?? 0) : 0;
}

export function formatPrice(n: number): string {
	return `$${n.toFixed(2)}`;
}
