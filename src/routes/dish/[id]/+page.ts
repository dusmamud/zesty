import { DISHES } from '#lib/data.ts';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => DISHES.map((d) => ({ id: d.id }));
