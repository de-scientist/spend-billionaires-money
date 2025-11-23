import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

type ItemCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  count: number;
};

export default function ItemCard({
  id,
  name,
  price,
  image,
  count,
}: ItemCardProps) {
  const buy = useStore((s) => s.buy);
  const sell = useStore((s) => s.sell);
  const money = useStore((s) => s.money);

  const cannotBuy = money < price;
  const cannotSell = count === 0;

  return (
    <div className="border rounded-xl p-4 shadow bg-white flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />

      <div className="flex flex-col items-center text-center mt-3 space-y-1">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-lg text-green-600 font-semibold">
          ${price.toLocaleString()}
        </p>
        <p className="text-base font-medium">Owned: {count}</p>
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <Button
          onClick={() => sell(id)}
          variant="secondary"
          disabled={cannotSell}
        >
          Sell
        </Button>

        <Button onClick={() => buy(id)} disabled={cannotBuy}>
          Buy
        </Button>
      </div>
    </div>
  );
}
