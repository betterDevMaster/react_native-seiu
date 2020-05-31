import {PROFILE_UNION, PROFILE_ACTIVITIES} from '../../../assets';

const menuItems = unionName => [
  {
    data: [
      {label: unionName, icon: PROFILE_UNION, link: 'UnionMembers'},
      {label: 'Activities', icon: PROFILE_ACTIVITIES},
    ],
  },
  {
    data: [
      {label: 'Personal', link: 'Personal'},
      {label: 'Password', link: 'ChangePassword'},
      {label: 'Notifications', link: 'Notifications'},
    ],
  },
  {
    data: [
      {label: 'Privacy', link: 'Privacy'},
      {label: 'About', link: 'About'},
      {label: 'Contact us', link: 'mailto:support@seiu.com'},
    ],
  },
  {
    data: [{label: 'Log out', link: '#logout'}],
  },
];

export default menuItems;
