import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import { useStore } from "./store/useStore";


export default function App() {
const { items, balance } = useStore();


return (
<div>

<div className="text-center text-xl font-bold bg-green-700 text-white py-3">
Current balance: ${balance.toLocaleString()}
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