import React from "react"
import { User as UserInterface } from "@/store/interface"
import Image from "next/image"
import Avatar from "./Avatar"
import { useRouter } from "next/navigation";
import {
    Cloud,
    CreditCard,
    DiameterIcon,
    Diamond,
    DiamondIcon,
    DiamondPlus,
    DiamondPlusIcon,
    Edit,
    Github,
    Heart,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageCircleDashedIcon,
    MessageCircleMore,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import usePrivateStore from "@/store/privateStore";
  
  export const UserMenuItems:React.FC<{currentUser:UserInterface}> = ({currentUser}) => {
    const {logout} = usePrivateStore();
    const router = useRouter();
    async function handleLogout(){
      await logout();
    }

    return (
    <div className="bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button>
                {currentUser.profilePicture ? (
                  <Image
                    src={currentUser.profilePicture}
                    height={20}
                    width={20}
                    alt={currentUser.username}
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
            <DropdownMenuItem onClick={() => router.push('/write')}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Write</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/favorites')}>
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorites</span>
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/messenger')}>
              <MessageCircleMore className="mr-2 h-4 w-4" />
              <span>Messenger</span>
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/')}>
              <DiamondPlusIcon className="mr-2 h-4 w-4" />
              <span>Get Premium</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
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
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu></div>
    )
  }
  