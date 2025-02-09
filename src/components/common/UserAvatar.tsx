import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TSessionUser } from "@/lib/types/user";

interface UserAvatarProps {
  user: TSessionUser;
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={user.image || ""}
        alt={user.name || "User Avatar"}
      />
      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
