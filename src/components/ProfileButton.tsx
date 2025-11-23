import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function ProfileButton() {
  const profile = useStore((s) => s.profile);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <Avatar>
          <AvatarImage src={profile.avatar} alt="profile" />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
      </Button>

      <ProfileModal open={open} setOpen={setOpen} />
    </>
  );
}
