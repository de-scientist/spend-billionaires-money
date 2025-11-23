import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResetConfirmation from "./ResetConfirmation";


export default function Navbar() {
const [open, setOpen] = useState(false);


return (
<div className="flex items-center justify-between px-6 py-4 bg-white shadow">
<h1 className="text-2xl font-bold">SPEND ELON'S MONEY</h1>


<div className="flex items-center gap-4">
<Button variant="outline">Spend</Button>
<Button variant="outline">Receipt</Button>
<Button onClick={() => setOpen(true)}>AC</Button>
<Avatar>
<AvatarImage src="/elon.jpg" />
</Avatar>
</div>


<ResetConfirmation open={open} onClose={() => setOpen(false)} />
</div>
);
}