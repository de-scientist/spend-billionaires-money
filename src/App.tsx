import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import { useStore } from "./store/useStore";

export default function App() {
  const { items, money } = useStore();

  return (
    <div>
      <div className="sticky top-0 text-center text-xl font-bold bg-green-700 text-white py-3 z-50">
        Current balance: ${money.toLocaleString()}
      </div>

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {items.map((i) => (
          <ItemCard key={i.id} {...i} />
        ))}
      </div>
    </div>
  );
}
