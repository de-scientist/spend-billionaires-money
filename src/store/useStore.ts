import { create } from "zustand";

export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  count: number;
}

export interface StoreState {
  money: number;
  items: Item[];
  buy: (id: number) => void;
  sell: (id: number) => void;
  reset: () => void;

  profile: {
    name: string;
    avatar: string;
  };

  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  money: 456_000_000_000, // <-- FIXED

  items: [],

  buy: (id) =>
    set((state) => {
      const selected = state.items.find((i) => i.id === id);
      if (!selected) return state;

      if (state.money < selected.price) return state; // Not enough money

      const items = state.items.map((i) =>
        i.id === id ? { ...i, count: i.count + 1 } : i
      );

      return {
        items,
        money: state.money - selected.price, // <-- FIXED
      };
    }),

  sell: (id) =>
    set((state) => {
      const selected = state.items.find((i) => i.id === id);
      if (!selected || selected.count === 0) return state;

      const items = state.items.map((i) =>
        i.id === id ? { ...i, count: i.count - 1 } : i
      );

      return {
        items,
        money: state.money + selected.price, // <-- FIXED
      };
    }),

  reset: () =>
    set((state) => ({
      money: 456_000_000_000,
      items: state.items.map((i) => ({ ...i, count: 0 })),
    })),

  profile: {
    name: "Visitor",
    avatar: "/avatars/default.png",
  },

  setAvatar: (avatar) =>
    set((state) => ({
      profile: { ...state.profile, avatar },
    })),

  setName: (name) =>
    set((state) => ({
      profile: { ...state.profile, name },
    })),
}));
