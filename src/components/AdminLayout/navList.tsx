import { IconType } from 'react-icons';
import { GiHerbsBundle } from 'react-icons/gi';
import { FaSchool } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BiGame } from 'react-icons/bi';
import { CgListTree } from 'react-icons/cg';
import { FaRegObjectUngroup } from 'react-icons/fa';
import { BiImages } from 'react-icons/bi';

interface Nav {
  path: string;
  title: string;
  Icon: IconType;
}

const navList: Nav[] = [
  {
    path: '/admin',
    title: 'Welcome',
    Icon: GiHerbsBundle,
  },
  {
    path: '/admin/tenants',
    title: 'Tenants',
    Icon: FaSchool,
  },
  {
    path: '/admin/users',
    title: 'Users',
    Icon: FiUsers,
  },
  {
    path: '/admin/games',
    title: 'Games',
    Icon: BiGame,
  },
  {
    path: '/admin/categories',
    title: 'Categories',
    Icon: CgListTree,
  },
  {
    path: '/admin/images',
    title: 'Images',
    Icon: FaRegObjectUngroup,
  },
  {
    path: '/admin/backgrounds',
    title: 'Backgrounds',
    Icon: BiImages,
  },
];

export default navList;