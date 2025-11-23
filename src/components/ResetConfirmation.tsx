import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

export default function ResetConfirmation({ open, onClose }: any) {
  const reset = useStore((s) => s.reset);
  const balance = useStore((s) => s.money);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Sell All Items?</DialogHeader>
        <p className="text-sm text-gray-600">
          You are about to sell everything you possess. This will bring your
          worth back to ${balance.toLocaleString()}
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
