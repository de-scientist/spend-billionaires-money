import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const avatars = [
  "/avatars/a1.png",
  "/avatars/a2.png",
  "/avatars/a3.png",
  "/avatars/a4.png",
];

export default function ProfileModal({ open, setOpen }: Props) {
  const profile = useStore((s) => s.profile);
  const setAvatar = useStore((s) => s.setAvatar);
  const setName = useStore((s) => s.setName);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        {/* Name input */}
        <div className="mt-4">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={profile.name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Avatar grid */}
        <div className="mt-6">
          <p className="text-sm font-medium">Choose Avatar</p>
          <div className="grid grid-cols-4 gap-3 mt-2">
            {avatars.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`border rounded-xl p-1 ${
                  profile.avatar === a ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <img
                  src={a}
                  alt="avatar"
                  className="rounded-xl w-full h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={() => setOpen(false)}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
