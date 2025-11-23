import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";


export default function ItemCard({ id, name, price, image, count }: any) {
const buy = useStore((s) => s.buy);
const sell = useStore((s) => s.sell);


return (
<div className="border rounded-xl p-4 shadow bg-white">
<img src={image} className="w-full h-48 object-cover rounded" />
<h2 className="text-lg font-semibold mt-3">{name}</h2>
<p className="text-green-600 font-bold">${price.toLocaleString()}</p>


<div className="flex items-center justify-between mt-3">
<Button onClick={() => sell(id)} variant="secondary">Sell</Button>
<span className="text-xl font-bold">{count}</span>
<Button onClick={() => buy(id)}>Buy</Button>
</div>
</div>
);
}