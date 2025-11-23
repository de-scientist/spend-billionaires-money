import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import jsPDF from "jspdf";
import { useStore } from "@/store/useStore";


export default function Receipt({ open, onClose }: any) {
const items = useStore((s) => s.items);


const total = items.reduce((acc, i) => acc + i.count * i.price, 0);


const downloadPDF = () => {
const doc = new jsPDF();
doc.text("Receipt", 10, 10);
let y = 20;
items.forEach((i) => {
if (i.count > 0) {
doc.text(`${i.name} x${i.count} - $${i.count * i.price}`, 10, y);
y += 10;
}
});
doc.text(`Total: $${total}`, 10, y + 10);
doc.save("receipt.pdf");
};


return (
<Dialog open={open} onOpenChange={onClose}>
<DialogContent>
<DialogHeader>Receipt</DialogHeader>


<div className="space-y-3 max-h-80 overflow-auto">
{items.filter((i) => i.count > 0).map((i) => (
<div key={i.id} className="flex justify-between">
<span>{i.name} × {i.count}</span>
<span>${(i.count * i.price).toLocaleString()}</span>
</div>
))}
</div>


<div className="font-bold text-right mt-4">
Total: ${total.toLocaleString()}
</div>


<button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={downloadPDF}>
Download PDF
</button>
</DialogContent>
</Dialog>
);
}