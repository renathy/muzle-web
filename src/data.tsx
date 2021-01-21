const data = {
  name: "game1",
  backgrounds: [
    {
      key: 'bg1',
      image: '/img/bg/bg1-b.png',
      thumb: '/img/bg/bg1-s.png'
    },
    {
      key: 'bg2',
      image: '/img/bg/bg2-b.jpg',
      thumb: '/img/bg/bg2-s.jpg'
    }
  ],
  categories: [
    {
      name: 'animals',
      image: '/img/cat/aaa/animal.png',
    },
    {
      name: 'birds',
      image: '/img/cat/aaa/bird.png',
    },
    {
      name: 'plants',
      image: '/img/cat/aaa/plant.png',
    },
    {
      name: 'insects',
      image: '/img/cat/aaa/insect.png',
    },
    {
      name: 'mashrooms',
      image: '/img/cat/aaa/mashroom.png',
    },
    {
      name: 'amphibians',
      image: '/img/cat/aaa/amphibian.png',
    },
    {
      name: 'reptiles',
      image: '/img/cat/aaa/reptile.png',
    },
  ],
  images: [
    { cat: 'animals', name: 'alnens', image: '/img/cat/animals/alnens.png' },
    { cat: 'animals', name: 'alnis', image: '/img/cat/animals/alnis.png' },
    { cat: 'animals', name: 'apsens', image: '/img/cat/animals/apsens.png' },
    { cat: 'animals', name: 'apsis', image: '/img/cat/animals/apsis.png' },
    { cat: 'animals', name: 'caune', image: '/img/cat/animals/caune.png' },
    { cat: 'animals', name: 'caunens', image: '/img/cat/animals/caunens.png' },
    { cat: 'animals', name: 'ezens', image: '/img/cat/animals/ezens.png' },
    { cat: 'animals', name: 'ezis', image: '/img/cat/animals/ezis.png' },
    { cat: 'animals', name: 'lacens', image: '/img/cat/animals/lacens.png' },
    { cat: 'animals', name: 'lacis', image: '/img/cat/animals/lacis.png' },
    { cat: 'animals', name: 'lapsens', image: '/img/cat/animals/lapsens.png' },
    { cat: 'animals', name: 'lapsina', image: '/img/cat/animals/lapsina.png' },
    { cat: 'animals', name: 'lusens', image: '/img/cat/animals/lusens.png' },
    { cat: 'animals', name: 'lusis', image: '/img/cat/animals/lusis.png' },
    { cat: 'animals', name: 'pele', image: '/img/cat/animals/pele.png' },
    { cat: 'animals', name: 'pelens', image: '/img/cat/animals/pelens.png' },
    { cat: 'animals', name: 'stirna', image: '/img/cat/animals/stirna.png' },
    { cat: 'animals', name: 'stirnens', image: '/img/cat/animals/stirnens.png' },
    { cat: 'animals', name: 'vavere', image: '/img/cat/animals/vavere.png' },
    { cat: 'animals', name: 'vilcens', image: '/img/cat/animals/vilcens.png' },
    { cat: 'animals', name: 'vilks', image: '/img/cat/animals/vilks.png' },
    { cat: 'animals', name: 'zakens', image: '/img/cat/animals/zakens.png' },
    { cat: 'animals', name: 'zakis', image: '/img/cat/animals/zakis.png' },
    { cat: 'birds', name: 'dzeguze', image: '/img/cat/birds/dzeguze.png' },
    { cat: 'birds', name: 'dzenis', image: '/img/cat/birds/dzenis.png' },
    { cat: 'birds', name: 'puce', image: '/img/cat/birds/puce.png' },
    { cat: 'birds', name: 'upis', image: '/img/cat/birds/upis.png' },
    { cat: 'birds', name: 'valodze', image: '/img/cat/birds/valodze.png' },
    { cat: 'birds', name: 'vanags', image: '/img/cat/birds/vanags.png' },
    { cat: 'birds', name: 'varna', image: '/img/cat/birds/varna.png' },
    { cat: 'birds', name: 'zagata', image: '/img/cat/birds/zagata.png' },
    { cat: 'plants', name: 'baravika', image: '/img/cat/plants/baravika.png' },
    { cat: 'plants', name: 'berza_lapa', image: '/img/cat/plants/berza_lapa.png' },
    { cat: 'plants', name: 'berza_skara', image: '/img/cat/plants/berza_skara.png' },
    { cat: 'plants', name: 'berzs', image: '/img/cat/plants/berzs.png' },
    { cat: 'plants', name: 'egle', image: '/img/cat/plants/egle.png' },
    { cat: 'plants', name: 'janoga', image: '/img/cat/plants/janoga.png' },
    { cat: 'plants', name: 'janogas_krums', image: '/img/cat/plants/janogas_krums.png' },
    { cat: 'plants', name: 'janogas_lapa', image: '/img/cat/plants/janogas_lapa.png' },
    { cat: 'plants', name: 'skujas', image: '/img/cat/plants/kadika skujas.png' },
    { cat: 'plants', name: 'kadika_ogas', image: '/img/cat/plants/kadika_ogas.png' },
    { cat: 'plants', name: 'kadikis', image: '/img/cat/plants/kadikis.png' },
    { cat: 'plants', name: 'mellene', image: '/img/cat/plants/mellene.png' },
    { cat: 'plants', name: 'metra', image: '/img/cat/plants/mellenes metra.png' },
    { cat: 'plants', name: 'mellenes_lapa', image: '/img/cat/plants/mellenes_lapa.png' },
    { cat: 'plants', name: 'piladzoga', image: '/img/cat/plants/piladzoga.png' },
    { cat: 'plants', name: 'priede', image: '/img/cat/plants/priede.png' },
    { cat: 'insects', name: 'skudra', image: '/img/cat/insects/skudra.png' },
    { cat: 'insects', name: 'taurenisdzeltens', image: '/img/cat/insects/taurenisdzeltens.png' },
    { cat: 'insects', name: 'taurenisoranzs', image: '/img/cat/insects/taurenisoranzs.png' },
    { cat: 'mashrooms', name: 'apsubeka', image: '/img/cat/mashrooms/apsubeka.png' },
    { cat: 'mashrooms', name: 'gailene', image: '/img/cat/mashrooms/gailene.png' },
    { cat: 'amphibians', name: 'krupis', image: '/img/cat/amphibians/krupis.png' },
    { cat: 'reptiles', name: 'kirzaka', image: '/img/cat/reptiles/kirzaka.png' },
    { cat: 'reptiles', name: 'odze', image: '/img/cat/reptiles/odze.png' },
  ]
};

export default data;