import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import { useStore } from "./store/useStore";
import { useState } from "react";
import Receipt from "./components/Receipt";

export default function App() {
  const { items, money } = useStore();
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Callback for "Shop Now" in Receipt
  const handleShopNow = () => {
    setReceiptOpen(false); // close receipt modal
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top where items are
  };

  return (
    <div>
      <div className="sticky top-0 text-center text-xl font-bold bg-green-700 text-white py-3 z-50">
        Current balance: ${money.toLocaleString()}
      </div>

      <Navbar onShowReceipt={() => setReceiptOpen(true)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-50">
        {items.map((i) => (
          <ItemCard key={i.id} {...i} />
        ))}
      </div>

      {/* Receipt modal */}
      <Receipt
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        onShopNow={handleShopNow} // pass callback
      />
    </div>
  );
}
