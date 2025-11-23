import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import jsPDF from "jspdf";
import { useStore } from "@/store/useStore";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  image?: string;
  count: number;
  description?: string;
}

export default function Receipt({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items: Item[] = useStore((s) => s.items);
  const [loading, setLoading] = useState(false);

  const grandTotal = items.reduce((acc, i) => acc + i.count * i.price, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  // Fetch image and convert to base64 without using canvas
  const loadImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const downloadPDF = async () => {
    setLoading(true);
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const rowHeight = 30;
    let y = 30;

    // Add logo
    try {
      const logoBase64 = await loadImageAsBase64("/logo.png");
      if (logoBase64) doc.addImage(logoBase64, "PNG", 10, 5, 40, 15);
    } catch {}

    doc.setFontSize(18);
    doc.text("Receipt", 80, 20);

    // Preload item images
    const images: Record<number, string | null> = {};
    await Promise.all(
      items.map(async (i) => {
        if (i.count > 0 && i.image) {
          images[i.id] = await loadImageAsBase64(i.image);
        } else {
          images[i.id] = null;
        }
      })
    );

    // Table header
    const drawHeader = () => {
      doc.setFillColor(200, 200, 200);
      doc.rect(10, y, 190, 10, "F");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Item", 40, y + 7);
      doc.text("Price", 100, y + 7);
      doc.text("Qty", 130, y + 7);
      doc.text("Total", 160, y + 7);
      y += 12;
    };

    drawHeader();
    let rowIndex = 0;

    for (const i of items.filter((item) => item.count > 0)) {
      // Pagination
      if (y + rowHeight > pageHeight - 20) {
        doc.addPage();
        y = 20;
        drawHeader();
        rowIndex = 0;
      }

      // Row background
      if (rowIndex % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(10, y - 2, 190, rowHeight, "F");
      }

      // Draw item image if exists
      if (images[i.id]) doc.addImage(images[i.id]!, "PNG", 10, y - 2, 25, 25);

      // Item details
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(i.name, 40, y + 10);
      if (i.description) doc.text(i.description, 40, y + 16);
      doc.text(formatCurrency(i.price), 100, y + 10);
      doc.text(`${i.count}`, 130, y + 10);
      doc.text(formatCurrency(i.count * i.price), 160, y + 10);

      y += rowHeight;
      rowIndex++;
    }

    // Grand total
    if (y + 20 > pageHeight - 20) doc.addPage();
    y += 5;
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`Grand Total: ${formatCurrency(grandTotal)}`, 10, y + 10);

    doc.save("receipt.pdf");
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-lg font-bold">Receipt</DialogTitle>
        <DialogDescription className="sr-only">
          List of items purchased, quantity, price, and total.
        </DialogDescription>

        <div className="space-y-3 max-h-80 overflow-auto">
          {items.filter((i) => i.count > 0).map((i) => (
            <div key={i.id} className="flex items-center justify-between gap-4 border-b pb-2">
              <img src={i.image} alt={i.name} className="w-12 h-12 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{i.name}</div>
                {i.description && <div className="text-sm text-gray-500">{i.description}</div>}
                <div className="text-sm text-gray-500">Price: {formatCurrency(i.price)}</div>
                <div className="text-sm text-gray-500">Quantity: {i.count}</div>
              </div>
              <div className="font-bold">{formatCurrency(i.count * i.price)}</div>
            </div>
          ))}
        </div>

        <div className="font-bold text-right mt-4 text-lg">
          Grand Total: {formatCurrency(grandTotal)}
        </div>

        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded flex items-center justify-center"
          onClick={downloadPDF}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
