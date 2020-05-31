import {PROFILE_UNION, PROFILE_REPORT, PROFILE_START_CHAT} from '../../assets';

const menuItems = unionName => [
  {label: unionName, icon: PROFILE_UNION, link: '#union'},
  {label: 'Start Chat', icon: PROFILE_START_CHAT, link: '#chat'},
  {label: 'Report', icon: PROFILE_REPORT, link: '#report'},
];

export default menuItems;
