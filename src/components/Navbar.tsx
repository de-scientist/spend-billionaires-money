import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResetConfirmation from "@/components/ResetConfirmation";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow sticky top-12 z-40">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/elon.jpg" alt="Elon Musk" />
        </Avatar>
        <h1 className="text-2xl font-bold">SPEND ELON'S MONEY</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline">Spend</Button>
        <Button variant="outline">Receipt</Button>
        <Button onClick={() => setOpen(true)}>AC</Button>
        <Avatar>
          <AvatarImage src="/elon.jpg" alt="Profile" />
        </Avatar>
        <ProfileButton />
      </div>

      <ResetConfirmation open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
