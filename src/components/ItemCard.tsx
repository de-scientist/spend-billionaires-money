import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

type ItemCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  count: number;
};

export default function ItemCard({ id, name, price, image, count }: ItemCardProps) {
  const buy = useStore((s) => s.buy);
  const sell = useStore((s) => s.sell);
  const money = useStore((s) => s.money); // <-- get current balance

  const cannotBuy = money < price;
  const cannotSell = count === 0;

  return (
    <div className="border rounded-xl p-4 shadow bg-white">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-3">{name}</h2>
      <p className="text-green-600 font-bold">${price.toLocaleString()}</p>

      <div className="flex items-center justify-between mt-3">

        <Button
          onClick={() => sell(id)}
          variant="secondary"
          disabled={cannotSell}
        >
          Sell
        </Button>

        <span className="text-xl font-bold">{count}</span>

        <Button
          onClick={() => buy(id)}
          disabled={cannotBuy}
        >
          Buy
        </Button>

      </div>
    </div>
  );
}
