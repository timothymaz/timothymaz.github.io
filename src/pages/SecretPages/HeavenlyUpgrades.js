// Heavenly Upgrades - Permanent upgrades purchased with prestige points
export const HEAVENLY_UPGRADES = {
  // Tier 1 - Basic multipliers
  heavenly_chip_1: {
    name: 'Heavenly Chip Secret',
    desc: 'Prestige points are 2x more powerful',
    longDesc: 'Each prestige point now gives +2% production instead of +1%',
    cost: 1,
    icon: '🍪',
    requirement: () => true
  },

  heavenly_chip_2: {
    name: 'Heavenly Cookie Stand',
    desc: 'Prestige points are 3x more powerful',
    longDesc: 'Each prestige point now gives +3% production (stacks with previous)',
    cost: 5,
    icon: '🏪',
    requirement: (state) => state.heavenlyUpgrades?.heavenly_chip_1 === true
  },

  heavenly_chip_3: {
    name: 'Heavenly Bakery',
    desc: 'Prestige points are 4x more powerful',
    longDesc: 'Each prestige point now gives +4% production (stacks with previous)',
    cost: 25,
    icon: '🏭',
    requirement: (state) => state.heavenlyUpgrades?.heavenly_chip_2 === true
  },

  // Golden 67 upgrades
  golden_frequency_1: {
    name: 'Lucky Day',
    desc: 'Golden 67s appear 2x more often',
    longDesc: 'Golden 67s will spawn twice as frequently',
    cost: 3,
    icon: '🍀',
    requirement: () => true
  },

  golden_frequency_2: {
    name: 'Divine Luck',
    desc: 'Golden 67s appear 2x more often (again)',
    longDesc: 'Golden 67s spawn 4x more often total',
    cost: 10,
    icon: '✨',
    requirement: (state) => state.heavenlyUpgrades?.golden_frequency_1 === true
  },

  golden_duration: {
    name: 'Golden Eternity',
    desc: 'Golden 67s last 3 seconds longer',
    longDesc: 'Golden 67s stay on screen for 7 seconds instead of 4',
    cost: 7,
    icon: '⏰',
    requirement: (state) => state.heavenlyUpgrades?.golden_frequency_1 === true
  },

  // Production upgrades
  heavenly_production_1: {
    name: 'Heavenly Boost',
    desc: 'All production +10%',
    longDesc: 'Multiplies all production by 1.1',
    cost: 15,
    icon: '📈',
    requirement: () => true
  },

  heavenly_production_2: {
    name: 'Divine Intervention',
    desc: 'All production +25%',
    longDesc: 'Multiplies all production by 1.25 (stacks with previous)',
    cost: 50,
    icon: '⚡',
    requirement: (state) => state.heavenlyUpgrades?.heavenly_production_1 === true
  },

  // Click upgrades
  heavenly_click_1: {
    name: 'Blessed Fingers',
    desc: 'Clicking is 2x more powerful',
    longDesc: 'All click power multiplied by 2',
    cost: 8,
    icon: '👆',
    requirement: () => true
  },

  heavenly_click_2: {
    name: 'Holy Touch',
    desc: 'Clicking is 5x more powerful',
    longDesc: 'All click power multiplied by 5 (stacks with previous)',
    cost: 40,
    icon: '✋',
    requirement: (state) => state.heavenlyUpgrades?.heavenly_click_1 === true
  },

  // Building-specific upgrades
  cursor_heaven: {
    name: 'Angelic Cursors',
    desc: 'Cursors are 3x more efficient',
    longDesc: 'Cursor production and click bonus tripled',
    cost: 12,
    icon: '😇',
    requirement: (state) => (state.lifetimePrestigePoints || 0) >= 10
  },

  grandma_heaven: {
    name: 'Eternal Grandmas',
    desc: 'Grandmas are 3x more efficient',
    longDesc: 'Grandma production tripled',
    cost: 20,
    icon: '👼',
    requirement: (state) => (state.lifetimePrestigePoints || 0) >= 20
  },

  farm_heaven: {
    name: 'Divine Harvest',
    desc: 'Farms are 3x more efficient',
    longDesc: 'Farm production tripled',
    cost: 30,
    icon: '🌾',
    requirement: (state) => (state.lifetimePrestigePoints || 0) >= 30
  },

  factory_heaven: {
    name: 'Heavenly Assembly',
    desc: 'Factories are 3x more efficient',
    longDesc: 'Factory production tripled',
    cost: 40,
    icon: '🏭',
    requirement: (state) => (state.lifetimePrestigePoints || 0) >= 40
  },

  // Special upgrades
  season_switcher: {
    name: 'Season Switcher',
    desc: 'Unlock seasonal events',
    longDesc: 'Enables special seasonal mechanics',
    cost: 67,
    icon: '🎄',
    requirement: (state) => (state.prestigeLevel || 0) >= 3
  },

  angels: {
    name: 'Angels',
    desc: '+10% production per 100 buildings',
    longDesc: 'Total buildings count gives production bonus (10% per 100 buildings)',
    cost: 100,
    icon: '👼',
    requirement: (state) => (state.lifetimePrestigePoints || 0) >= 100
  },

  // Advanced upgrades
  permanent_upgrade_1: {
    name: 'Permanent Slot I',
    desc: 'Keep one regular upgrade after ascension',
    longDesc: 'Choose one regular upgrade to keep permanently',
    cost: 150,
    icon: '🔒',
    requirement: (state) => (state.prestigeLevel || 0) >= 5
  },

  starting_boost: {
    name: 'Starter Kit',
    desc: 'Start with 1000 67s after ascending',
    longDesc: 'Begin each ascension with 1000 67s',
    cost: 75,
    icon: '🎁',
    requirement: (state) => (state.prestigeLevel || 0) >= 2
  }
};
