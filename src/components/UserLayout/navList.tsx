interface Nav {
  path: string;
  title: string;
}

const navList: Nav[] = [
  {
    path: '/user/games',
    title: 'Digitālās spēles',
  },
  {
    path: 'http://muzle.lv/',
    title: 'Koka spēles',
  },  
  {
    path: 'https://muzle.lv/lv/kontakti/',
    title: 'Kontakti',
  },
];

export default navList;