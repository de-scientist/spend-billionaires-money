import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResetConfirmation from "@/components/ResetConfirmation";
import ProfileButton from "./ProfileButton";
import Receipt from "@/components/Receipt";

interface NavbarProps {
  onShowReceipt?: () => void; // optional callback
  onShopNow?: () => void;     // callback for Receipt "Shop Now"
}

export default function Navbar({ onShowReceipt, onShopNow }: NavbarProps) {
  const [open, setOpen] = useState(false); // AC modal
  const [receiptOpen, setReceiptOpen] = useState(false); // Receipt modal

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow sticky top-12 z-40">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/elon.jpg" alt="Elon Musk" />
          </Avatar>
          <h1 className="text-2xl font-bold">SPEND ELON'S MONEY</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => alert("Spend functionality")}
          >
            Spend
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setReceiptOpen(true);
              if (onShowReceipt) onShowReceipt();
            }}
          >
            Receipt
          </Button>

          <Button onClick={() => setOpen(true)}>AC</Button>

          <Avatar>
            <AvatarImage src="/elon.jpg" alt="Profile" />
          </Avatar>
          <ProfileButton />
        </div>
      </div>

      {/* Modals */}
      <ResetConfirmation open={open} onClose={() => setOpen(false)} />
      <Receipt
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        onShopNow={() => {
          setReceiptOpen(false); // close receipt
          if (onShopNow) onShopNow(); // call App's scroll/back callback
        }}
      />
    </>
  );
}
