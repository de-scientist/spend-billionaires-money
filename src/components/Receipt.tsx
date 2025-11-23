import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import jsPDF from "jspdf";
import { useStore } from "@/store/useStore";

export default function Receipt({ open, onClose }: any) {
  const items = useStore((s) => s.items);

  const grandTotal = items.reduce((acc, i) => acc + i.count * i.price, 0);

  const downloadPDF = async () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Receipt", 10, y);
    y += 10;

    // Loop through items
    for (const i of items) {
      if (i.count > 0) {
        y += 10;

        // Add image if exists
        if (i.image) {
          // Convert image URL to base64
          const img = new Image();
          img.src = i.image;
          await new Promise((resolve) => {
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              if (ctx) ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL("image/png");
              doc.addImage(dataURL, "PNG", 10, y, 20, 20); // x, y, width, height
              resolve(true);
            };
          });
        }

        // Add text details
        doc.setFontSize(12);
        const textX = i.image ? 35 : 10;
        doc.text(`${i.name}`, textX, y + 5);
        doc.text(`Price: $${i.price}`, textX, y + 10);
        doc.text(`Qty: ${i.count}`, textX, y + 15);
        doc.text(`Total: $${i.count * i.price}`, textX, y + 20);

        y += 20;
      }
    }

    y += 10;
    doc.setFontSize(14);
    doc.text(`Grand Total: $${grandTotal}`, 10, y + 10);
    doc.save("receipt.pdf");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>Receipt</DialogHeader>

        <div className="space-y-3 max-h-80 overflow-auto">
          {items.filter((i) => i.count > 0).map((i) => (
            <div key={i.id} className="flex items-center justify-between gap-4 border-b pb-2">
              <img src={i.image} alt={i.name} className="w-12 h-12 object-cover rounded" />

              <div className="flex-1">
                <div className="font-semibold">{i.name}</div>
                <div className="text-sm text-gray-500">Price: ${i.price}</div>
                <div className="text-sm text-gray-500">Quantity: {i.count}</div>
              </div>

              <div className="font-bold">${(i.count * i.price).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="font-bold text-right mt-4 text-lg">
          Grand Total: ${grandTotal.toLocaleString()}
        </div>

        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </DialogContent>
    </Dialog>
  );
}
