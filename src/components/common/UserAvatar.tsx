import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TSessionUser } from "@/lib/types/user";

interface UserAvatarProps {
  user: TSessionUser;
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatarProps) => {
  if (!user) return null;
  return (
    <Avatar className={className} key={`${user.name || "User or author"}`}>
      {user.image && (
        <AvatarImage
          src={user.image}
          key="User avatar"
          alt={user.name || "User Avatar"}
        />
      )}
      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
