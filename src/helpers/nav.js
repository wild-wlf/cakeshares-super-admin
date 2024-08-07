import Dashboard from '../../public/assets/Dashboard.png';
import Portfolio from '../../public/assets/Portfolio.png';
import stakeChat from '../../public/assets/stakeChat.png';
import comunityChat from '../../public/assets/comunityChat.png';
import settingIcon from '../../public/assets/settingIcon.png';
import navlogoutIcon from '../../public/assets/navlogoutIcon.png';
import mangeUser from '../../public/assets/mangeUser.svg';
import Permissions from '../../public/assets/permissions.svg';
import Roles from '../../public/assets/roles.svg';
import Users from '../../public/assets/users.svg';

export const indivisualSellerNav = [
  {
    name: 'Menu',
    link: [
      {
        navigation: '/dashboard',
        name: 'Dashboard',
        icon: Dashboard,
      },
      {
        navigation: '/manage-user',
        name: 'Manage Users',
        icon: mangeUser,
      },
      {
        navigation: '/manage-products',
        name: 'Manage Products',
        icon: Portfolio,
      },
      {
        navigation: '/manage-categories',
        name: 'Manage Categories',
        icon: Portfolio,
      },
      {
        navigation: '/manage-payouts',
        name: 'Manage Payouts',
        icon: Portfolio,
      },
      {
        navigation: '/manage-reports',
        name: 'Manage Reports',
        icon: Portfolio,
      },
    ],
  },
  {
    name: 'Messages & Chats',
    link: [
      {
        navigation: '/community-chat',
        name: 'Community Chat',
        icon: comunityChat,
      },
      {
        navigation: '/shareholder-chat',
        name: 'Shareholder Chat',
        icon: stakeChat,
      },
    ],
  },
  {
    name: 'C.R.M',
    link: [
      {
        navigation: '/permissions',
        name: 'Permissions',
        icon: Permissions,
      },
      {
        navigation: '/roles',
        name: 'Roles',
        icon: Roles,
      },
      {
        navigation: '/admins',
        name: 'Admins',
        icon: Users,
      },
    ],
  },
  {
    name: 'System',
    link: [
      {
        navigation: '/settings',
        name: 'Settings',
        icon: settingIcon,
      },
      {
        navigation: '/log-out',
        name: 'Log Out',
        icon: navlogoutIcon,
      },
    ],
  },
];
