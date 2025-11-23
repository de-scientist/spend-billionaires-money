import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import Receipt from "./components/Receipt";
import { useStore } from "./store/useStore";

export default function App() {
  const { items, money } = useStore();
  const [receiptOpen, setReceiptOpen] = useState(false);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the items grid
  const handleShopNow = () => {
    if (itemsRef.current) {
      itemsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="sticky top-0 text-center text-xl font-bold bg-green-700 text-white py-3 z-50">
        Current balance: ${money.toLocaleString()}
      </div>

      <Navbar
        onShowReceipt={() => setReceiptOpen(true)} // trigger receipt open
      />

      <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {items.map((i) => (
          <ItemCard key={i.id} {...i} />
        ))}
      </div>

      <Receipt
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        onShopNow={handleShopNow} // pass callback for empty receipt
      />
    </div>
  );
}
