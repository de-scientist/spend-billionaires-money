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

  money: 456_000_000_000,

  items: [
    { id: 1, name: "Luxury Watch", price: 15000, image: "/items/Rolex.jpg", count: 0 },
    { id: 2, name: "MacBook Pro", price: 2400, image: "/items/mac book laptops.jpg", count: 0 },
    { id: 3, name: "Gaming PC", price: 3200, image: "/items/pc.jpg", count: 0 },
    { id: 4, name: "Private Jet", price: 45_000_000, image: "/items/Private Jet.jpg", count: 0 },
    { id: 5, name: "Yacht", price: 25_000_000, image: "/items/yacht.jpg", count: 0 },
    { id: 6, name: "Mansion", price: 120_000_000, image: "/items/mansion.jpg", count: 0 },
    { id: 7, name: "Supercar", price: 350_000, image: "/items/supercar.jpg", count: 0 },
    { id: 8, name: "Helicopter", price: 8_000_000, image: "/items/helicopter.jpg", count: 0 },
    { id: 9, name: "Motorbike", price: 18_000, image: "/items/bike.jpg", count: 0 },
    { id: 10, name: "Art Painting", price: 500_000, image: "/items/painting.jpg", count: 0 },
    { id: 11, name: "Football Club", price: 1_800_000_000, image: "/items/club.jpg", count: 0 },
    { id: 12, name: "Island", price: 50_000_000, image: "/items/island.jpg", count: 0 },
    { id: 13, name: "Spaceship Ticket", price: 250_000, image: "/items/spaceship.jpg", count: 0 },
    { id: 14, name: "Restaurant", price: 650_000, image: "/items/restaurant.jpg", count: 0 },
    { id: 15, name: "Hotel", price: 30_000_000, image: "/items/hotel.jpg", count: 0 },
    { id: 16, name: "Factory", price: 12_000_000, image: "/items/factory.jpg", count: 0 },
    { id: 17, name: "Movie Production", price: 90_000_000, image: "/items/movie.jpg", count: 0 },
    { id: 18, name: "Private School", price: 40_000_000, image: "/items/school.jpg", count: 0 },
    { id: 19, name: "Hospital", price: 70_000_000, image: "/items/hospital.jpg", count: 0 },
    { id: 20, name: "Shopping Mall", price: 150_000_000, image: "/items/mall.jpg", count: 0 },
    { id: 21, name: "iPhone 15 Pro", price: 1200, image: "/items/iphone.jpg", count: 0 },
    { id: 22, name: "Camera", price: 2700, image: "/items/camera.jpg", count: 0 },
    { id: 23, name: "Drone", price: 900, image: "/items/drone.jpg", count: 0 },
    { id: 24, name: "Diamond Ring", price: 50000, image: "/items/ring.jpg", count: 0 },
    { id: 25, name: "Clothing Brand", price: 2_500_000, image: "/items/brand.jpg", count: 0 },
    { id: 26, name: "Tech Startup", price: 10_000_000, image: "/items/startup.jpg", count: 0 },
    { id: 27, name: "Solar Farm", price: 40_000_000, image: "/items/solar.jpg", count: 0 },
    { id: 28, name: "Farmland", price: 3_500_000, image: "/items/farm.jpg", count: 0 },
    { id: 29, name: "Cruise Ship", price: 950_000_000, image: "/items/cruise.jpg", count: 0 },
    { id: 30, name: "Spaceship", price: 2_200_000_000, image: "/items/spaceship2.jpg", count: 0 },
    { id: 31, name: "Luxury Bag", price: 4500, image: "/items/bag.jpg", count: 0 },
    { id: 32, name: "Jet Ski", price: 14000, image: "/items/jetski.jpg", count: 0 },
    { id: 33, name: "Sofa Set", price: 3200, image: "/items/sofa.jpg", count: 0 },
  ],

  buy: (id) =>
    set((state) => {
      const selected = state.items.find((i) => i.id === id);
      if (!selected || state.money < selected.price) return state;

      const items = state.items.map((i) =>
        i.id === id ? { ...i, count: i.count + 1 } : i
      );

      return {
        items,
        money: state.money - selected.price,
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
        money: state.money + selected.price,
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
