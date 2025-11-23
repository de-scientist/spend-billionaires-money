import { create } from "zustand";


export interface Item {
id: number;
name: string;
price: number;
image: string;
count: number;
}


interface StoreState {
balance: number;
items: Item[];
buy: (id: number) => void;
sell: (id: number) => void;
reset: () => void;
}


export const useStore = create<StoreState>((set) => ({
balance: 456_000_000_000,
items: [], // populate dynamically
buy: (id) =>
set((state) => {
const items = state.items.map((i) => {
if (i.id === id && state.balance >= i.price) {
return { ...i, count: i.count + 1 };
}
return i;
});
const selected = state.items.find((i) => i.id === id);
return selected && state.balance >= selected.price
? { items, balance: state.balance - selected.price }
: state;
}),
sell: (id) =>
set((state) => {
const items = state.items.map((i) => {
if (i.id === id && i.count > 0) return { ...i, count: i.count - 1 };
return i;
});
const selected = state.items.find((i) => i.id === id);
return selected && selected.count > 0
? { items, balance: state.balance + selected.price }
: state;
}),
reset: () =>
set((state) => ({
balance: 456_000_000_000,
items: state.items.map((i) => ({ ...i, count: 0 })),
})),
}));