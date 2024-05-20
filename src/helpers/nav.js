import Dashboard from '../../public/assets/Dashboard.png';
import Portfolio from '../../public/assets/Portfolio.png';
import stakeChat from '../../public/assets/stakeChat.png';
import comunityChat from '../../public/assets/comunityChat.png';
import settingIcon from '../../public/assets/settingIcon.png';
import navlogoutIcon from '../../public/assets/navlogoutIcon.png';
import mangeUser from '../../public/assets/mangeUser.svg';

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
        navigation: '/stakeholder-chat',
        name: 'Stakeholder Chat',
        icon: stakeChat,
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
