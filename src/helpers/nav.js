import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import Dashboard from "../../public/assets/Dashboard.png";
import Portfolio from "../../public/assets/Portfolio.png";
import privateChat from "../../public/assets/privateChat.png";
import stakeChat from "../../public/assets/stakeChat.png";
import comunityChat from "../../public/assets/comunityChat.png";
import navWalletIcon from "../../public/assets/navWalletIcon.png";
import settingIcon from "../../public/assets/settingIcon.png";
import navlogoutIcon from "../../public/assets/navlogoutIcon.png";
import Permissions from "../../public/assets/permissions.svg";
import Roles from "../../public/assets/roles.svg";
import Users from "../../public/assets/users.svg";

export const indivisualSellerNav = [
  {
    name: "Menu",
    link: [
      {
        navigation: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
      },
      {
        navigation: "/portfolio",
        name: "Portfolio",
        icon: Portfolio,
      },
    ],
  },
  {
    name: "Messages & Chats",
    link: [
      {
        navigation: "/private-chat",
        name: "Private Chat",
        icon: privateChat,
      },
      {
        navigation: "/stakeholder-chat",
        name: "Stakeholder Chat",
        icon: stakeChat,
      },
      {
        navigation: "/community-chat",
        name: "Community Chat",
        icon: comunityChat,
      },
    ],
  },
  {
    name: "System",
    link: [
      {
        navigation: "/my-wallet",
        name: "My Wallet",
        icon: navWalletIcon,
      },
      {
        navigation: "/profile",
        name: "Settings",
        icon: settingIcon,
      },
      {
        navigation: "/Log-Out",
        name: "Log Out",
        icon: navlogoutIcon,
      },
    ],
  },
];

export const companySellerNav = [
  {
    name: "Menu",
    link: [
      {
        navigation: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
      },
      {
        navigation: "/portfolio",
        name: "Portfolio",
        icon: Portfolio,
      },
    ],
  },
  {
    name: "Messages & Chats",
    link: [
      {
        navigation: "/private-chat",
        name: "Private Chat",
        icon: privateChat,
      },
      {
        navigation: "/stakeholder-chat",
        name: "Stakeholder Chat",
        icon: stakeChat,
      },
      {
        navigation: "/community-chat",
        name: "Community Chat",
        icon: comunityChat,
      },
    ],
  },
  {
    name: "C.R.M",
    link: [
      {
        navigation: "/permissions",
        name: "Permissions",
        icon: Permissions,
      },
      {
        navigation: "/roles",
        name: "Roles",
        icon: Roles,
      },
      {
        navigation: "/users",
        name: "Users",
        icon: Users,
      },
    ],
  },
  {
    name: "System",
    link: [
      {
        navigation: "/my-wallet",
        name: "My Wallet",
        icon: navWalletIcon,
      },
      {
        navigation: "/profile",
        name: "Settings",
        icon: settingIcon,
      },
      {
        navigation: "/Log-Out",
        name: "Log Out",
        icon: navlogoutIcon,
      },
    ],
  },
];
