import React, { useState } from "react";
import { User as UserInterface } from "@/store/interface";
import Image from "next/image";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import {
  Book,
  BookA,
  Bookmark,
  DiamondPlusIcon,
  Edit,
  Home,
  LogOut,
  Mail,
  MessageCircleMore,
  MessageSquare,
  Newspaper,
  PlusCircle,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePrivateStore from "@/store/privateStore";

export const UserMenuItems: React.FC<{ currentUser: UserInterface }> = ({
  currentUser,
}) => {
  const [imageError, setImageError] = useState(false);
  const { logout } = usePrivateStore();
  const router = useRouter();
  async function handleLogout() {
    await logout();
  }

  return (
    <div className="bg-white rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center">
            {!imageError && currentUser.profilePicture ? (
              <Image
                src={currentUser.profilePicture}
                height={40}
                width={40}
                className="rounded-full"
                alt={currentUser.username}
                onError={() => setImageError(true)}
              />
            ) : (
              <Avatar letter={currentUser.username[0].toUpperCase()} />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 fixed z-50 top-5 -right-10">
          <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem className="md:hidden" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/write")}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Write</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/bookmarks")}>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Bookmarks</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => router.push("/messenger")}>
              <MessageCircleMore className="mr-2 h-4 w-4" />
              <span>Messenger</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => router.push(`/articles/user?u=${currentUser.id}`)}>
              <Newspaper className="mr-2 h-4 w-4"/>
              <span>Your articles</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/about")}>
              <Book className="mr-2 h-4 w-4" />
              <span>About Us</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => router.push("/")}>
              <DiamondPlusIcon className="mr-2 h-4 w-4" />
              <span>Get Premium</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
