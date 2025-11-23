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
    <div className="px-1"> {/* <-- Added horizontal padding */}
      <div className="border rounded-xl p-4 shadow-lg bg-white flex flex-col items-center transition-transform hover:scale-[1.02]">
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
        </div>

        <div className="flex items-center justify-between w-full mt-4 gap-3">
          {/* Sell Button */}
          <Button
            onClick={() => sell(id)}
            disabled={cannotSell}
            className={`flex-1 transition-all ${
              count > 0 ? "bg-red-600 text-white hover:bg-red-700" : ""
            }`}
          >
            Sell
          </Button>

          {/* Count in the middle */}
          <span className="text-xl font-bold text-center w-12">{count}</span>

          {/* Buy Button */}
          <Button
            onClick={() => buy(id)}
            disabled={cannotBuy}
            className="flex-1 bg-green-600 text-white hover:bg-green-700 transition-all"
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
