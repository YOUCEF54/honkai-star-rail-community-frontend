export interface LightCone {
  id: number;
  name: string;
  rarity: number;
  path: string;
  imageUrl: string;
  hp: number;
  atk: number;
  def: number;
  description: string;
  skill: {
    name: string;
    description: string;
  };
}
export const paths = ['Destruction', 'Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance'];
export const lightCones: LightCone[] = [{
  id: 1,
  name: 'In the Night',
  rarity: 5,
  path: 'Hunt',
  imageUrl: '/images/Hyselin.jpg',
  hp: 952,
  atk: 529,
  def: 396,
  description: "A special ticket that grants access to a dream-like night. It's said that one will meet many interesting people in the dream.",
  skill: {
    name: 'Meteor Swarm',
    description: "Increases the wearer's CRIT DMG by 36%. When the wearer deals DMG to an enemy whose HP percentage is higher than or equal to the wearer's, the DMG dealt is increased by 24%."
  }
}, {
  id: 2,
  name: 'Moment of Victory',
  rarity: 5,
  path: 'Destruction',
  imageUrl: '/images/Hyselin.jpg',
  hp: 1058,
  atk: 582,
  def: 330,
  description: 'The moment when the Aeon of Destruction slays the Leviathan, and the moment when the Aeon of Preservation successfully defends the universe.',
  skill: {
    name: 'Thorns of Crimson',
    description: "Increases the wearer's ATK by 24%. When the wearer defeats an enemy, increases the wearer's ATK by 24% for 2 turn(s)."
  }
}, {
  id: 3,
  name: 'Night on the Milky Way',
  rarity: 5,
  path: 'Erudition',
  imageUrl: '/images/Hyselin.jpg',
  hp: 1058,
  atk: 582,
  def: 330,
  description: 'The vast and silent universe makes one feel so insignificant. But as long as there is life, there will be a song of praise for the starry sky.',
  skill: {
    name: 'Woof! Walk Time!',
    description: "Increases the wearer's CRIT DMG by 36%. When the wearer uses their Ultimate, their CRIT Rate increases by 18% for 2 turn(s)."
  }
}, {
  id: 4,
  name: "But the Battle Isn't Over",
  rarity: 4,
  path: 'Preservation',
  imageUrl: '/images/Hyselin.jpg',
  hp: 846,
  atk: 476,
  def: 330,
  description: 'Even if it takes a lifetime, I will safeguard this land.',
  skill: {
    name: 'Movable Barrier',
    description: "Increases the wearer's DEF by 16%. When the wearer is hit, increases their DEF by 16% for 2 turn(s)."
  }
}, {
  id: 5,
  name: 'Post-Op Conversation',
  rarity: 4,
  path: 'Abundance',
  imageUrl: '/images/Hyselin.jpg',
  hp: 846,
  atk: 423,
  def: 396,
  description: 'The most important thing after surgery is to keep the patient in a positive mood.',
  skill: {
    name: 'Mutual Healing',
    description: 'When the wearer uses their Basic ATK, increases the base Outgoing Healing for their next action by 12%. This effect can stack up to 2 time(s).'
  }
}, {
  id: 6,
  name: 'Memories of the Past',
  rarity: 3,
  path: 'Harmony',
  imageUrl: '/images/Hyselin.jpg',
  hp: 635,
  atk: 370,
  def: 264,
  description: 'Memories can be sweet, but they can also be painful.',
  skill: {
    name: 'Oath of Shared Beauty',
    description: 'After the wearer uses their Ultimate, regenerates 2 Energy for all allies.'
  }
}, {
  id: 7,
  name: 'Eyes of the Prey',
  rarity: 3,
  path: 'Nihility',
  imageUrl: '/images/Hyselin.jpg',
  hp: 635,
  atk: 317,
  def: 330,
  description: 'The eyes of the prey are filled with fear, but the hunter sees only victory.',
  skill: {
    name: 'Venomous Tinge',
    description: "Increases the wearer's Effect Hit Rate by 20%. When the wearer inflicts a debuff on an enemy, deals Additional DMG equal to 48% of the wearer's ATK to that enemy."
  }
}];