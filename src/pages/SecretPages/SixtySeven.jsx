import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './SixtySeven.css';
import { HEAVENLY_UPGRADES } from './HeavenlyUpgrades';

// Game version for save migrations
const GAME_VERSION = '2.0.0';
const SAVE_KEY = '67-clicker-save';
const BACKUP_KEY = '67-clicker-backup';

// Achievement definitions (100+ achievements!)
const ACHIEVEMENTS = [
  // 67 Production Achievements
  { id: 'ach_67_1', name: 'Getting Started', description: 'Have 1 67', requirement: { type: 'total67s', value: 1 }, bonus: 0.01 },
  { id: 'ach_67_100', name: 'Centennial', description: 'Have 100 67s', requirement: { type: 'total67s', value: 100 }, bonus: 0.01 },
  { id: 'ach_67_1k', name: 'One Thousand', description: 'Have 1,000 67s', requirement: { type: 'total67s', value: 1000 }, bonus: 0.01 },
  { id: 'ach_67_10k', name: 'Ten Thousand', description: 'Have 10,000 67s', requirement: { type: 'total67s', value: 10000 }, bonus: 0.01 },
  { id: 'ach_67_100k', name: 'Hundred Thousand', description: 'Have 100,000 67s', requirement: { type: 'total67s', value: 100000 }, bonus: 0.01 },
  { id: 'ach_67_1m', name: 'Millionaire', description: 'Have 1 million 67s', requirement: { type: 'total67s', value: 1000000 }, bonus: 0.01 },
  { id: 'ach_67_10m', name: 'Ten Million', description: 'Have 10 million 67s', requirement: { type: 'total67s', value: 10000000 }, bonus: 0.01 },
  { id: 'ach_67_100m', name: 'Hundred Million', description: 'Have 100 million 67s', requirement: { type: 'total67s', value: 100000000 }, bonus: 0.01 },
  { id: 'ach_67_1b', name: 'Billionaire', description: 'Have 1 billion 67s', requirement: { type: 'total67s', value: 1000000000 }, bonus: 0.01 },

  // Click Achievements
  { id: 'ach_click_100', name: 'Finger Workout', description: 'Click 100 times', requirement: { type: 'clicks', value: 100 }, bonus: 0.01 },
  { id: 'ach_click_1k', name: 'Clicking Addict', description: 'Click 1,000 times', requirement: { type: 'clicks', value: 1000 }, bonus: 0.01 },
  { id: 'ach_click_10k', name: 'Click Master', description: 'Click 10,000 times', requirement: { type: 'clicks', value: 10000 }, bonus: 0.01 },
  { id: 'ach_click_100k', name: 'Click God', description: 'Click 100,000 times', requirement: { type: 'clicks', value: 100000 }, bonus: 0.01 },

  // Building Achievements (5 per building type)
  { id: 'ach_cursor_1', name: 'Click Assistant', description: 'Own 1 Cursor', requirement: { type: 'building', building: 'cursor', value: 1 }, bonus: 0.01 },
  { id: 'ach_cursor_10', name: 'Cursor Army', description: 'Own 10 Cursors', requirement: { type: 'building', building: 'cursor', value: 10 }, bonus: 0.01 },
  { id: 'ach_cursor_50', name: 'Cursor Legion', description: 'Own 50 Cursors', requirement: { type: 'building', building: 'cursor', value: 50 }, bonus: 0.01 },
  { id: 'ach_cursor_100', name: 'Cursor Empire', description: 'Own 100 Cursors', requirement: { type: 'building', building: 'cursor', value: 100 }, bonus: 0.01 },
  { id: 'ach_cursor_200', name: 'Cursor Dominion', description: 'Own 200 Cursors', requirement: { type: 'building', building: 'cursor', value: 200 }, bonus: 0.01 },

  { id: 'ach_grandma_1', name: 'Family Business', description: 'Own 1 Grandma', requirement: { type: 'building', building: 'grandma', value: 1 }, bonus: 0.01 },
  { id: 'ach_grandma_10', name: 'Grandma Squad', description: 'Own 10 Grandmas', requirement: { type: 'building', building: 'grandma', value: 10 }, bonus: 0.01 },
  { id: 'ach_grandma_50', name: 'Senior Care', description: 'Own 50 Grandmas', requirement: { type: 'building', building: 'grandma', value: 50 }, bonus: 0.01 },
  { id: 'ach_grandma_100', name: 'The Elderpocalypse', description: 'Own 100 Grandmas', requirement: { type: 'building', building: 'grandma', value: 100 }, bonus: 0.01 },
  { id: 'ach_grandma_200', name: 'Grandma Hive Mind', description: 'Own 200 Grandmas', requirement: { type: 'building', building: 'grandma', value: 200 }, bonus: 0.01 },

  { id: 'ach_farm_1', name: 'Green Thumb', description: 'Own 1 Farm', requirement: { type: 'building', building: 'farm', value: 1 }, bonus: 0.01 },
  { id: 'ach_farm_10', name: 'Agriculture Empire', description: 'Own 10 Farms', requirement: { type: 'building', building: 'farm', value: 10 }, bonus: 0.01 },
  { id: 'ach_farm_50', name: 'Harvest Festival', description: 'Own 50 Farms', requirement: { type: 'building', building: 'farm', value: 50 }, bonus: 0.01 },
  { id: 'ach_farm_100', name: 'Agricultural Revolution', description: 'Own 100 Farms', requirement: { type: 'building', building: 'farm', value: 100 }, bonus: 0.01 },
  { id: 'ach_farm_200', name: 'Terraformer', description: 'Own 200 Farms', requirement: { type: 'building', building: 'farm', value: 200 }, bonus: 0.01 },

  // Combo Achievements
  { id: 'ach_combo_10', name: 'Combo Starter', description: 'Achieve a 10x combo', requirement: { type: 'combo', value: 10 }, bonus: 0.01 },
  { id: 'ach_combo_25', name: 'Combo Master', description: 'Achieve a 25x combo', requirement: { type: 'combo', value: 25 }, bonus: 0.01 },
  { id: 'ach_combo_50', name: 'Combo God', description: 'Achieve a 50x combo', requirement: { type: 'combo', value: 50 }, bonus: 0.01 },
  { id: 'ach_combo_100', name: 'Combo Legend', description: 'Achieve a 100x combo', requirement: { type: 'combo', value: 100 }, bonus: 0.02 },

  // Golden 67 Achievements
  { id: 'ach_golden_1', name: 'Shiny!', description: 'Click 1 Golden 67', requirement: { type: 'golden', value: 1 }, bonus: 0.01 },
  { id: 'ach_golden_10', name: 'Gold Digger', description: 'Click 10 Golden 67s', requirement: { type: 'golden', value: 10 }, bonus: 0.01 },
  { id: 'ach_golden_50', name: 'Gold Rush', description: 'Click 50 Golden 67s', requirement: { type: 'golden', value: 50 }, bonus: 0.01 },
  { id: 'ach_golden_100', name: 'Golden Touch', description: 'Click 100 Golden 67s', requirement: { type: 'golden', value: 100 }, bonus: 0.01 },

  // Production Rate Achievements
  { id: 'ach_prod_100', name: 'Passive Income', description: 'Produce 100 67s/sec', requirement: { type: 'production', value: 100 }, bonus: 0.01 },
  { id: 'ach_prod_1k', name: 'Production Line', description: 'Produce 1,000 67s/sec', requirement: { type: 'production', value: 1000 }, bonus: 0.01 },
  { id: 'ach_prod_10k', name: 'Industrial Scale', description: 'Produce 10,000 67s/sec', requirement: { type: 'production', value: 10000 }, bonus: 0.01 },
  { id: 'ach_prod_100k', name: 'Mass Production', description: 'Produce 100,000 67s/sec', requirement: { type: 'production', value: 100000 }, bonus: 0.01 },
  { id: 'ach_prod_1m', name: 'Production God', description: 'Produce 1,000,000 67s/sec', requirement: { type: 'production', value: 1000000 }, bonus: 0.01 },
];

// News ticker messages
const NEWS_MESSAGES = [
  '67 production reaches all-time high!',
  'Local grandma sets 67-baking world record!',
  'Scientists discover 67s grow on trees!',
  'Breaking: 67 futures up 500% today!',
  'Your cursor has formed a union!',
  'Grandmas demand better working conditions!',
  '67 shortage reported in neighboring dimension!',
  'Time traveler caught smuggling 67s from the future!',
  'Wizard tower accidentally summons 67 demon!',
  'Quantum computer achieves 67 consciousness!',
  'Portal to 67 dimension discovered!',
  'Bank declares "too many 67s to count"!',
  'Factory workers go on 67-making strike!',
  'Temple priests bless all 67 production!',
  'Farm produces record 67 crop!',
  '67-pocalypse warning issued by grandmas!',
  'Scientists confirm: 67 is the meaning of life!',
  'Breaking: 67s found to be addictive!',
  'Your clicks have been rated E for Everyone!',
  'New study: clicking increases life expectancy!',
  'Golden 67 sighting reported in local area!',
  'Combo record broken by mysterious clicker!',
  'Critical hit damages reality itself!',
  'Production multiplier causes time paradox!',
  'Local person becomes 67 billionaire!',
];

// Random event types
const EVENT_TYPES = {
  FRENZY: { name: 'Frenzy', multiplier: 7, duration: 77, message: '7x PRODUCTION FOR 77 SECONDS!' },
  CLICK_FRENZY: { name: 'Click Frenzy', multiplier: 777, duration: 13, message: '777x CLICK POWER FOR 13 SECONDS!' },
  BUILDING_SPECIAL: { name: 'Building Special', multiplier: 10, duration: 30, message: '10x BUILDING PRODUCTION FOR 30 SECONDS!' },
  LUCKY: { name: 'Lucky', amount: 'varies', message: 'LUCKY! Extra 67s!' },
  BANK_INTEREST: { name: 'Bank Interest', multiplier: 1.5, duration: 60, message: 'Banks pay 50% interest for 60 seconds!' },
};

// Click upgrade definitions
const CLICK_UPGRADES = [
  { id: 'click1', name: 'Better Fingers', cost: 100, power: 1, icon: '👆', description: '+1 per click' },
  { id: 'click2', name: 'Strong Hands', cost: 500, power: 2, icon: '✋', description: '+2 per click' },
  { id: 'click3', name: 'Power Fists', cost: 2500, power: 5, icon: '👊', description: '+5 per click' },
  { id: 'click4', name: 'Super Arms', cost: 15000, power: 10, icon: '💪', description: '+10 per click' },
  { id: 'click5', name: 'Mega Clicker', cost: 100000, power: 25, icon: '⚡', description: '+25 per click' },
  { id: 'click6', name: 'Ultra Hands', cost: 750000, power: 50, icon: '🔥', description: '+50 per click' },
  { id: 'click7', name: 'God Mode Click', cost: 5000000, power: 100, icon: '👑', description: '+100 per click' },
  { id: 'click8', name: 'Cosmic Clicker', cost: 50000000, power: 250, icon: '🌟', description: '+250 per click' },
  { id: 'click9', name: 'Infinite Power', cost: 500000000, power: 500, icon: '💫', description: '+500 per click' },
  { id: 'click10', name: 'Omnipotent Click', cost: 10000000000, power: 1000, icon: '✨', description: '+1000 per click' },
];

// Click scaling upgrades - make clicks scale with production
const CLICK_SCALING_UPGRADES = [
  { id: 'scaling1', name: 'Productive Fingers', cost: 10000000, scaling: 0.01, icon: '🖐️', description: 'Clicks gain +1% of per-second production' },
  { id: 'scaling2', name: 'Mega Productive Fingers', cost: 100000000, scaling: 0.05, icon: '👐', description: 'Clicks gain +5% of per-second production' },
  { id: 'scaling3', name: 'Ultra Productive Fingers', cost: 1000000000, scaling: 0.25, icon: '🙌', description: 'Clicks gain +25% of per-second production' },
];

// Building definitions
const BUILDINGS = {
  cursor: {
    name: 'Cursor',
    baseCost: 15,
    baseProduction: 1,
    costMultiplier: 1.15,
    icon: '👆',
    description: 'Auto-clicks for you'
  },
  grandma: {
    name: 'Grandma',
    baseCost: 100,
    baseProduction: 5,
    costMultiplier: 1.15,
    icon: '👵',
    description: 'A nice grandma to bake 67s'
  },
  farm: {
    name: '67 Farm',
    baseCost: 1100,
    baseProduction: 20,
    costMultiplier: 1.15,
    icon: '🚜',
    description: 'Grows 67s from the ground'
  },
  factory: {
    name: 'Factory',
    baseCost: 12000,
    baseProduction: 100,
    costMultiplier: 1.15,
    icon: '🏭',
    description: 'Mass produces 67s'
  },
  bank: {
    name: 'Bank',
    baseCost: 130000,
    baseProduction: 500,
    costMultiplier: 1.15,
    icon: '🏦',
    description: 'Generates 67s from interest'
  },
  temple: {
    name: 'Temple',
    baseCost: 1400000,
    baseProduction: 2500,
    costMultiplier: 1.15,
    icon: '⛩️',
    description: 'Summons 67s from the gods'
  },
  wizard: {
    name: 'Wizard Tower',
    baseCost: 20000000,
    baseProduction: 15000,
    costMultiplier: 1.15,
    icon: '🧙',
    description: 'Conjures 67s with magic'
  },
  portal: {
    name: 'Portal',
    baseCost: 330000000,
    baseProduction: 100000,
    costMultiplier: 1.15,
    icon: '🌀',
    description: 'Brings 67s from another dimension'
  },
  timeMachine: {
    name: 'Time Machine',
    baseCost: 5100000000,
    baseProduction: 500000,
    costMultiplier: 1.15,
    icon: '⏰',
    description: 'Retrieves 67s from the past'
  },
  quantum: {
    name: 'Quantum Computer',
    baseCost: 75000000000,
    baseProduction: 3000000,
    costMultiplier: 1.15,
    icon: '💻',
    description: 'Calculates 67s into existence'
  }
};

// Cursor Orbit Component - Displays cursors orbiting the big 67
const CursorOrbit = ({ cursorCount, perClick, clickScaling, perSecond, onCursorClick }) => {
  const [cursors, setCursors] = useState([]);
  const orbitRef = useRef(null);
  const cursorClickIntervalRef = useRef(null);

  // Debug logging
  useEffect(() => {
    console.log('🎯 CursorOrbit mounted/updated');
    console.log('Cursor count:', cursorCount);
    console.log('Click power:', perClick);
    console.log('Cursors array:', cursors);
  }, [cursorCount, perClick, cursors]);

  // Create cursor positions with even spacing
  useEffect(() => {
    if (cursorCount === 0) {
      setCursors([]);
      return;
    }

    // Cap at 12 visible cursors for performance
    const visibleCount = Math.min(cursorCount, 12);

    const newCursors = Array.from({ length: visibleCount }, (_, i) => ({
      id: `cursor-${i}-${Date.now()}`, // Unique ID to force re-render
      angle: (i * 360) / visibleCount, // FIXED: multiply first to avoid rounding
      index: i,
      isClicking: false
    }));

    setCursors(newCursors);
    console.log(`✅ Created ${visibleCount} cursors for ${cursorCount} total`);
    console.log('Cursor angles:', newCursors.map(c => `${c.index}: ${c.angle}°`).join(', '));
  }, [cursorCount]);

  // Auto-click functionality
  useEffect(() => {
    if (cursors.length === 0) return;

    // Clear existing interval
    if (cursorClickIntervalRef.current) {
      clearInterval(cursorClickIntervalRef.current);
    }

    console.log('🔄 Setting up cursor auto-click interval');

    // Click every second, stagger the cursor clicks
    cursorClickIntervalRef.current = setInterval(() => {
      cursors.forEach((cursor, index) => {
        // Stagger the clicks so they don't all click at once
        setTimeout(() => {
          // Calculate cursor click value (10% of manual click power)
          let cursorClickValue = perClick * 0.1;

          // Add 10% of click scaling benefit
          if (clickScaling > 0 && perSecond > 0) {
            cursorClickValue += (perSecond * clickScaling) * 0.1;
          }

          // Call the parent click handler
          onCursorClick(cursorClickValue, cursor.id);

          // Visual feedback - animate cursor
          const cursorElem = document.getElementById(cursor.id);
          if (cursorElem) {
            cursorElem.classList.add('clicking');
            setTimeout(() => {
              cursorElem.classList.remove('clicking');
            }, 200);
          }
        }, index * (1000 / cursors.length));
      });
    }, 1000);

    return () => {
      if (cursorClickIntervalRef.current) {
        clearInterval(cursorClickIntervalRef.current);
      }
    };
  }, [cursors, perClick, clickScaling, perSecond, onCursorClick]);

  // Check if cursors are actually rendering
  useEffect(() => {
    if (cursorCount > 0) {
      setTimeout(() => {
        const orbit = document.querySelector('.cursor-orbit');
        const cursorElems = document.querySelectorAll('.orbiting-cursor');
        console.log('🔍 Checking rendered cursors:');
        console.log('  Orbit element:', orbit);
        console.log('  Found cursor elements:', cursorElems.length);

        if (cursorElems.length === 0) {
          console.error('❌ CURSORS NOT RENDERING!');
        } else {
          console.log('✅ Cursors are rendering correctly');
        }
      }, 500);
    }
  }, [cursorCount]);

  if (cursors.length === 0) return null;

  return (
    <div className="cursor-orbit" ref={orbitRef}>
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          id={cursor.id}
          className="orbiting-cursor"
          style={{
            '--angle': `${cursor.angle}deg`,
            '--orbit-radius': '180px',
            animationDelay: `${cursor.index * -1.7}s` // Stagger the orbit animation
          }}
        >
          <span className="cursor-emoji">👆</span>
        </div>
      ))}

      {/* Show cursor count badge if more than 12 */}
      {cursorCount > 12 && (
        <div className="cursor-overflow-badge">
          +{cursorCount - 12} more
        </div>
      )}
    </div>
  );
};

// Prestige Panel Component - Displays ascension and heavenly upgrades
const PrestigePanel = ({ state, onAscend, onBuyUpgrade, formatNumber }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const prestigeGain = Math.floor(Math.cbrt(state.totalSixtySevensMade / 1000000000000));
  const canPrestige = prestigeGain > 0;

  // Calculate multiplier
  const calculateMultiplier = () => {
    let multiplier = 1 + (state.heavenlySeventies * 0.01);
    if (state.heavenlyUpgrades.heavenly_chip_1) multiplier += state.heavenlySeventies * 0.01;
    if (state.heavenlyUpgrades.heavenly_chip_2) multiplier += state.heavenlySeventies * 0.01;
    if (state.heavenlyUpgrades.heavenly_chip_3) multiplier += state.heavenlySeventies * 0.01;
    return multiplier;
  };

  return (
    <div className="prestige-panel">
      <div className="prestige-header">
        <h2>☁️ ASCENSION ☁️</h2>
        <div className="prestige-stats">
          <div className="prestige-points">
            {state.heavenlySeventies} Heavenly 67s
          </div>
          <div className="prestige-level">
            Ascension Level: {state.ascensionCount}
          </div>
          <div className="prestige-multiplier">
            +{((calculateMultiplier() - 1) * 100).toFixed(0)}% production
          </div>
          <div className="prestige-lifetime">
            Lifetime: {state.lifetimePrestigePoints} Heavenly 67s
          </div>
        </div>
      </div>

      {/* Ascend button */}
      <div className="ascend-section">
        {canPrestige ? (
          <>
            <div className="ascend-info">
              You will gain <span className="prestige-gain">{prestigeGain}</span> Heavenly 67s!
              <div className="ascend-requirement">
                Need: 1 trillion total 67s per point
              </div>
            </div>
            {!showConfirm ? (
              <button className="ascend-btn" onClick={() => setShowConfirm(true)}>
                ☁️ ASCEND ☁️
              </button>
            ) : (
              <div className="ascend-confirm">
                <p><strong>This will reset your progress!</strong></p>
                <p>You'll keep: Achievements & Heavenly Upgrades</p>
                <button className="confirm-yes" onClick={() => {
                  onAscend();
                  setShowConfirm(false);
                }}>
                  YES, ASCEND
                </button>
                <button className="confirm-no" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="not-ready">
            <p>Keep baking to unlock ascension!</p>
            <p>Need: 1 trillion total 67s</p>
            <p>Have: {formatNumber(state.totalSixtySevensMade)}</p>
          </div>
        )}
      </div>

      {/* Heavenly upgrades */}
      <div className="heavenly-upgrades">
        <h3>HEAVENLY UPGRADES</h3>
        <div className="upgrades-grid">
          {Object.entries(HEAVENLY_UPGRADES).map(([id, upgrade]) => {
            const owned = state.heavenlyUpgrades[id];
            const canAfford = state.heavenlySeventies >= upgrade.cost;
            const meetsReq = upgrade.requirement({
              heavenlyUpgrades: state.heavenlyUpgrades,
              lifetimePrestigePoints: state.lifetimePrestigePoints,
              prestigeLevel: state.ascensionCount
            });

            if (owned) return null; // Don't show owned upgrades

            return meetsReq && (
              <div
                key={id}
                className={`heavenly-upgrade ${canAfford ? 'affordable' : 'locked'}`}
                onClick={() => canAfford && onBuyUpgrade(id)}
                title={upgrade.longDesc}
              >
                <div className="upgrade-icon">{upgrade.icon}</div>
                <div className="upgrade-name">{upgrade.name}</div>
                <div className="upgrade-desc">{upgrade.desc}</div>
                <div className="upgrade-cost">{upgrade.cost} Heavenly 67s</div>
              </div>
            );
          })}
        </div>

        {/* Show owned upgrades */}
        {Object.keys(state.heavenlyUpgrades).some(key => state.heavenlyUpgrades[key]) && (
          <div className="owned-upgrades">
            <h4>Owned Upgrades:</h4>
            <div className="owned-list">
              {Object.entries(state.heavenlyUpgrades)
                .filter(([_, owned]) => owned)
                .map(([id]) => {
                  const upgrade = HEAVENLY_UPGRADES[id];
                  return upgrade && (
                    <div key={id} className="owned-upgrade">
                      {upgrade.icon} {upgrade.name}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stats Panel Component - Displays game statistics
const StatsPanel = ({ state, formatNumber }) => {
  const totalBuildings = Object.values(state.buildings).reduce((a, b) => a + b, 0);

  return (
    <div className="stats-panel-container">
      <div className="stats-header">
        <h2>📊 STATISTICS 📊</h2>
      </div>

      <div className="stats-content">
        {/* Core Stats */}
        <div className="stat-section">
          <h3>Core Statistics</h3>
          <div className="stat-row">
            <span className="stat-label">Total 67s Made:</span>
            <span className="stat-value">{formatNumber(state.totalSixtySevensMade)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Current 67s:</span>
            <span className="stat-value">{formatNumber(state.sixtySevenCount)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">67s per Second:</span>
            <span className="stat-value">{formatNumber(state.perSecond)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">67s per Click:</span>
            <span className="stat-value">{formatNumber(state.perClick)}</span>
          </div>
        </div>

        {/* Click Stats */}
        <div className="stat-section">
          <h3>Click Statistics</h3>
          <div className="stat-row">
            <span className="stat-label">Total Clicks:</span>
            <span className="stat-value">{formatNumber(state.totalClicks)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Golden 67s Clicked:</span>
            <span className="stat-value">{state.goldenClicks}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Max Combo:</span>
            <span className="stat-value">{state.maxCombo}x</span>
          </div>
          {state.clickScaling > 0 && (
            <div className="stat-row">
              <span className="stat-label">Click Scaling:</span>
              <span className="stat-value">+{(state.clickScaling * 100).toFixed(0)}%</span>
            </div>
          )}
        </div>

        {/* Building Stats */}
        <div className="stat-section">
          <h3>Buildings ({totalBuildings} total)</h3>
          {Object.entries(state.buildings).map(([key, count]) => {
            if (count === 0) return null;
            const building = {
              cursor: { name: 'Cursors', icon: '👆' },
              grandma: { name: 'Grandmas', icon: '👵' },
              farm: { name: 'Farms', icon: '🌾' },
              factory: { name: 'Factories', icon: '🏭' },
              bank: { name: 'Banks', icon: '🏦' },
              temple: { name: 'Temples', icon: '⛩️' },
              wizard: { name: 'Wizards', icon: '🧙' },
              portal: { name: 'Portals', icon: '🌀' },
              timeMachine: { name: 'Time Machines', icon: '⏰' },
              quantum: { name: 'Quantum Computers', icon: '💻' }
            }[key];

            return (
              <div key={key} className="stat-row">
                <span className="stat-label">{building?.icon} {building?.name}:</span>
                <span className="stat-value">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Prestige Stats */}
        <div className="stat-section">
          <h3>Prestige Statistics</h3>
          <div className="stat-row">
            <span className="stat-label">Heavenly 67s:</span>
            <span className="stat-value gold">{state.heavenlySeventies}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Lifetime Prestige Points:</span>
            <span className="stat-value gold">{state.lifetimePrestigePoints}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Ascensions:</span>
            <span className="stat-value">{state.ascensionCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Heavenly Upgrades Owned:</span>
            <span className="stat-value">
              {Object.values(state.heavenlyUpgrades).filter(Boolean).length}
            </span>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="stat-section">
          <h3>Achievement Statistics</h3>
          <div className="stat-row">
            <span className="stat-label">Achievements Unlocked:</span>
            <span className="stat-value">{state.unlockedAchievements.length}</span>
          </div>
        </div>

        {/* Milestones */}
        <div className="stat-section">
          <h3>Milestones</h3>
          <div className="milestone-grid">
            {state.totalSixtySevensMade >= 1000000 && (
              <div className="milestone">🏆 Million Club</div>
            )}
            {state.totalSixtySevensMade >= 1000000000 && (
              <div className="milestone">💎 Billion Club</div>
            )}
            {state.totalSixtySevensMade >= 1000000000000 && (
              <div className="milestone">👑 Trillion Club</div>
            )}
            {state.totalClicks >= 10000 && (
              <div className="milestone">👆 Click Master</div>
            )}
            {state.maxCombo >= 50 && (
              <div className="milestone">🔥 Combo Legend</div>
            )}
            {totalBuildings >= 100 && (
              <div className="milestone">🏗️ Builder</div>
            )}
            {state.ascensionCount >= 1 && (
              <div className="milestone">☁️ Ascended</div>
            )}
            {state.heavenlySeventies >= 100 && (
              <div className="milestone">⭐ Heavenly</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SixtySeven = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const lastSaveRef = useRef(Date.now());
  const offlineEarningsRef = useRef(0);

  // Core game state - load from localStorage on first render
  const [sixtySevenCount, setSixtySevenCount] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        console.log('Loading save:', gameState);

        // Calculate offline earnings
        const timeAway = Date.now() - (gameState.game?.lastSave || Date.now());
        const secondsAway = Math.floor(timeAway / 1000);

        let offlinePerSecond = 0;
        Object.keys(BUILDINGS).forEach(key => {
          const building = BUILDINGS[key];
          const owned = gameState.game?.buildings?.[key] || 0;
          offlinePerSecond += building.baseProduction * owned;
        });

        const offlineEarnings = offlinePerSecond * secondsAway;
        offlineEarningsRef.current = offlineEarnings;

        const savedCount = gameState.game?.sixtySevenCount || 0;
        return (typeof savedCount === 'number' && !isNaN(savedCount)) ? savedCount + offlineEarnings : 0;
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
    return 0;
  });

  const [totalSixtySevensMade, setTotalSixtySevensMade] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        const timeAway = Date.now() - (gameState.game?.lastSave || Date.now());
        const secondsAway = Math.floor(timeAway / 1000);

        let offlinePerSecond = 0;
        Object.keys(BUILDINGS).forEach(key => {
          const building = BUILDINGS[key];
          const owned = gameState.game?.buildings?.[key] || 0;
          offlinePerSecond += building.baseProduction * owned;
        });

        const offlineEarnings = offlinePerSecond * secondsAway;
        const savedTotal = gameState.game?.totalSixtySevensMade || 0;
        return (typeof savedTotal === 'number' && !isNaN(savedTotal)) ? savedTotal + offlineEarnings : 0;
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
    return 0;
  });

  const [perClick, setPerClick] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.perClick || 1;
      } catch (e) {
        console.error('Failed to load perClick:', e);
      }
    }
    return 1;
  });

  const [perSecond, setPerSecond] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.perSecond || 0;
      } catch (e) {
        console.error('Failed to load perSecond:', e);
      }
    }
    return 0;
  });

  const [buildings, setBuildings] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        console.log('Loading buildings:', gameState.game?.buildings);
        return gameState.game?.buildings || {
          cursor: 0,
          grandma: 0,
          farm: 0,
          factory: 0,
          bank: 0,
          temple: 0,
          wizard: 0,
          portal: 0,
          timeMachine: 0,
          quantum: 0
        };
      } catch (e) {
        console.error('Failed to load buildings:', e);
      }
    }
    return {
      cursor: 0,
      grandma: 0,
      farm: 0,
      factory: 0,
      bank: 0,
      temple: 0,
      wizard: 0,
      portal: 0,
      timeMachine: 0,
      quantum: 0
    };
  });

  const [purchasedClickUpgrades, setPurchasedClickUpgrades] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.purchasedClickUpgrades || [];
      } catch (e) {
        console.error('Failed to load upgrades:', e);
      }
    }
    return [];
  });

  // UI state
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Golden 67 state
  const [goldenSixtySeven, setGoldenSixtySeven] = useState(null);
  const [productionMultiplier, setProductionMultiplier] = useState(1);
  const multiplierTimerRef = useRef(null);

  // New game features state - LOAD FROM SAVE
  const [purchasedScalingUpgrades, setPurchasedScalingUpgrades] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.purchasedScalingUpgrades || [];
      } catch (e) {
        console.error('Failed to load scaling upgrades:', e);
      }
    }
    return [];
  });

  const [clickScaling, setClickScaling] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.clickScaling || 0;
      } catch (e) {
        console.error('Failed to load click scaling:', e);
      }
    }
    return 0;
  });

  const [clickCombo, setClickCombo] = useState(0);

  const [maxCombo, setMaxCombo] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.maxCombo || 0;
      } catch (e) {
        console.error('Failed to load max combo:', e);
      }
    }
    return 0;
  });

  const clickComboTimerRef = useRef(null);
  const [showComboDisplay, setShowComboDisplay] = useState(false);
  const [criticalHit, setCriticalHit] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());

  // Cookie Clicker features state - LOAD FROM SAVE
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.unlockedAchievements || [];
      } catch (e) {
        console.error('Failed to load achievements:', e);
      }
    }
    return [];
  });

  const [totalClicks, setTotalClicks] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.totalClicks || 0;
      } catch (e) {
        console.error('Failed to load totalClicks:', e);
      }
    }
    return 0;
  });

  const [goldenClicks, setGoldenClicks] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.goldenClicks || 0;
      } catch (e) {
        console.error('Failed to load goldenClicks:', e);
      }
    }
    return 0;
  });

  const [newsMessage, setNewsMessage] = useState('');
  const [currentTab, setCurrentTab] = useState('store'); // store, achievements, prestige, stats

  const [heavenlySeventies, setHeavenlySeventies] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.heavenlySeventies || 0;
      } catch (e) {
        console.error('Failed to load heavenlySeventies:', e);
      }
    }
    return 0;
  });

  const [ascensionCount, setAscensionCount] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.ascensionCount || 0;
      } catch (e) {
        console.error('Failed to load ascensionCount:', e);
      }
    }
    return 0;
  });

  const [lifetimePrestigePoints, setLifetimePrestigePoints] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.lifetimePrestigePoints || 0;
      } catch (e) {
        console.error('Failed to load lifetimePrestigePoints:', e);
      }
    }
    return 0;
  });

  const [heavenlyUpgrades, setHeavenlyUpgrades] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.heavenlyUpgrades || {};
      } catch (e) {
        console.error('Failed to load heavenlyUpgrades:', e);
      }
    }
    return {};
  });

  const [activeEvent, setActiveEvent] = useState(null);
  const eventTimerRef = useRef(null);
  const [wrinklers, setWrinklers] = useState([]);

  const [apocalypseLevel, setApocalypseLevel] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.apocalypseLevel || 0;
      } catch (e) {
        console.error('Failed to load apocalypseLevel:', e);
      }
    }
    return 0;
  });

  const [divine67s, setDivine67s] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.divine67s || 0;
      } catch (e) {
        console.error('Failed to load divine67s:', e);
      }
    }
    return 0;
  });

  const [lastHarvestDate, setLastHarvestDate] = useState(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.game?.lastHarvestDate || null;
      } catch (e) {
        console.error('Failed to load lastHarvestDate:', e);
      }
    }
    return null;
  });

  const [showAchievementPopup, setShowAchievementPopup] = useState(null);

  // Format large numbers with NaN protection
  const formatNumber = (num) => {
    // Handle NaN, undefined, null
    if (typeof num !== 'number' || isNaN(num)) return '0';

    if (num < 1000) return Math.floor(num).toLocaleString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
  };

  // Calculate building cost with safety checks
  const getBuildingCost = (buildingKey) => {
    try {
      const building = BUILDINGS[buildingKey];
      if (!building) {
        console.error(`Building ${buildingKey} not found in BUILDINGS config`);
        return 0;
      }

      // Safety check: ensure buildings state exists and has the building key
      const owned = (buildings && buildings[buildingKey] !== undefined) ? buildings[buildingKey] : 0;
      const cost = Math.floor(building.baseCost * Math.pow(building.costMultiplier, owned));

      return cost;
    } catch (error) {
      console.error(`Error calculating cost for ${buildingKey}:`, error);
      return BUILDINGS[buildingKey]?.baseCost || 0;
    }
  };

  // Calculate total per second with all bonuses
  const calculatePerSecond = () => {
    let total = 0;

    Object.keys(BUILDINGS).forEach(key => {
      const building = BUILDINGS[key];
      const owned = buildings[key];
      let production = building.baseProduction * owned;

      // Apply building-specific heavenly upgrades
      if (key === 'cursor' && heavenlyUpgrades.cursor_heaven) {
        production *= 3;
      }
      if (key === 'grandma' && heavenlyUpgrades.grandma_heaven) {
        production *= 3;
      }
      if (key === 'farm' && heavenlyUpgrades.farm_heaven) {
        production *= 3;
      }
      if (key === 'factory' && heavenlyUpgrades.factory_heaven) {
        production *= 3;
      }

      total += production;
    });

    // Apply heavenly multiplier (prestige bonus)
    const heavenlyMultiplier = calculateHeavenlyMultiplier(heavenlySeventies, heavenlyUpgrades);
    total *= heavenlyMultiplier;

    // Apply heavenly production upgrades
    if (heavenlyUpgrades.heavenly_production_1) {
      total *= 1.1;
    }
    if (heavenlyUpgrades.heavenly_production_2) {
      total *= 1.25;
    }

    // Angels bonus (+10% per 100 buildings)
    if (heavenlyUpgrades.angels) {
      const totalBuildings = Object.values(buildings).reduce((a, b) => a + b, 0);
      const angelBonus = 1 + (Math.floor(totalBuildings / 100) * 0.1);
      total *= angelBonus;
    }

    return total;
  };

  // Update per second when buildings or upgrades change
  useEffect(() => {
    setPerSecond(calculatePerSecond());
  }, [buildings, heavenlySeventies, heavenlyUpgrades]);

  // Update per click when upgrades change
  useEffect(() => {
    const totalClickPower = 1 + purchasedClickUpgrades.reduce((sum, upgradeId) => {
      const upgrade = CLICK_UPGRADES.find(u => u.id === upgradeId);
      return sum + (upgrade?.power || 0);
    }, 0);
    setPerClick(totalClickPower);
  }, [purchasedClickUpgrades]);

  // Passive production - Generate 67s from buildings every 100ms
  useEffect(() => {
    const productionInterval = setInterval(() => {
      if (perSecond > 0) {
        const productionPerTick = perSecond / 10; // Divide by 10 because we tick 10 times per second

        setSixtySevenCount(prev => {
          const newValue = prev + productionPerTick;
          return newValue;
        });

        setTotalSixtySevensMade(prev => prev + productionPerTick);
      }
    }, 100); // Run every 100ms (10 times per second)

    return () => clearInterval(productionInterval);
  }, [perSecond]);

  // Purchase building
  const purchaseBuilding = (buildingKey) => {
    const cost = getBuildingCost(buildingKey);

    if (sixtySevenCount >= cost) {
      setSixtySevenCount(prev => prev - cost);
      setBuildings(prev => ({
        ...prev,
        [buildingKey]: prev[buildingKey] + 1
      }));

      // Show purchase feedback
      showFloatingText(`+1 ${BUILDINGS[buildingKey].name}`, 'building');
    }
  };

  // Purchase click upgrade
  const purchaseClickUpgrade = (upgradeId) => {
    const upgrade = CLICK_UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || purchasedClickUpgrades.includes(upgradeId)) return;

    if (sixtySevenCount >= upgrade.cost) {
      setSixtySevenCount(prev => prev - upgrade.cost);
      setPurchasedClickUpgrades(prev => [...prev, upgradeId]);

      // Show purchase feedback
      showFloatingText(`${upgrade.name}!`, 'upgrade');
    }
  };

  // Purchase click scaling upgrade
  const purchaseScalingUpgrade = (upgradeId) => {
    const upgrade = CLICK_SCALING_UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || purchasedScalingUpgrades.includes(upgradeId)) return;

    if (sixtySevenCount >= upgrade.cost) {
      setSixtySevenCount(prev => prev - upgrade.cost);
      setPurchasedScalingUpgrades(prev => [...prev, upgradeId]);

      // Update click scaling
      setClickScaling(upgrade.scaling);

      // Show purchase feedback
      showFloatingText(`${upgrade.name}!`, 'upgrade');
    }
  };

  // Big 67 click handler with enhanced features
  const handleBigClick = (event) => {
    // For keyboard clicks, get center of big 67
    let clickX, clickY;

    if (event?.clientX !== undefined) {
      // Mouse/touch click - use event position
      clickX = event.clientX;
      clickY = event.clientY;
    } else {
      // Keyboard click - find center of big 67
      const big67 = document.querySelector('.big-67');
      if (big67) {
        const rect = big67.getBoundingClientRect();
        clickX = rect.left + rect.width / 2;
        clickY = rect.top + rect.height / 2;
      } else {
        // Fallback to center of viewport
        clickX = window.innerWidth / 2;
        clickY = window.innerHeight / 2;
      }
    }

    // Track total clicks
    setTotalClicks(prev => prev + 1);

    // Calculate click power with scaling
    let clickPower = perClick;

    // Add click scaling bonus (% of per-second production)
    if (clickScaling > 0 && perSecond > 0) {
      clickPower += perSecond * clickScaling;
    }

    // Apply active event multipliers
    if (activeEvent?.type === 'CLICK_FRENZY') {
      clickPower *= EVENT_TYPES.CLICK_FRENZY.multiplier;
    }

    // Critical hit chance (10%)
    const isCritical = Math.random() < 0.10;
    if (isCritical) {
      clickPower *= 10;
      setCriticalHit(true);
      setTimeout(() => setCriticalHit(false), 500);
    }

    // Combo system - increment and track
    let currentCombo = clickCombo;
    let comboMultiplier = 1;

    setClickCombo(prev => {
      const newCombo = prev + 1;
      currentCombo = newCombo; // Store for this click

      // Update max combo if needed
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }

      // Show combo display at 5+
      if (newCombo >= 5) {
        setShowComboDisplay(true);
      }

      return newCombo;
    });

    // Clear existing combo timer
    if (clickComboTimerRef.current) {
      clearTimeout(clickComboTimerRef.current);
    }

    // Set new combo timer (2 seconds) - Award SCALED bonus when combo breaks!
    clickComboTimerRef.current = setTimeout(() => {
      // Use the functional update to get the CURRENT combo value
      setClickCombo(finalCombo => {
        // Award SCALED bonus 67s if combo was 10+
        if (finalCombo >= 10) {
          // Calculate scaled combo bonus using current game state
          const comboBonus = calculateComboBonus(finalCombo, perClick, perSecond);

          console.log('🔥 COMBO BREAK - Before state update:', {
            combo: finalCombo,
            calculatedBonus: comboBonus,
            currentCount: sixtySevenCount
          });

          // CRITICAL VALIDATION: Ensure bonus is valid
          if (isNaN(comboBonus) || comboBonus <= 0) {
            console.error('🚨 INVALID COMBO BONUS:', comboBonus);
            const emergencyBonus = finalCombo * Math.max(perClick, 100);
            console.warn('Using emergency bonus:', emergencyBonus);

            // Apply emergency bonus with validation
            setSixtySevenCount(prev => {
              const newValue = (prev || 0) + emergencyBonus;
              console.log('Emergency update:', prev, '+', emergencyBonus, '=', newValue);
              return newValue;
            });
            setTotalSixtySevensMade(prev => (prev || 0) + emergencyBonus);

            showComboBreakBonus(finalCombo, emergencyBonus);
          } else {
            // Apply bonus with SAFE state updates
            setSixtySevenCount(prev => {
              const currentValue = prev || 0;
              const newValue = currentValue + comboBonus;

              console.log('💰 State update:', {
                previous: formatNumber(currentValue),
                bonus: formatNumber(comboBonus),
                new: formatNumber(newValue)
              });

              // VALIDATION: Ensure new value is valid
              if (isNaN(newValue) || newValue < currentValue) {
                console.error('🚨 STATE CORRUPTION DETECTED!');
                console.error('Previous:', currentValue, 'Bonus:', comboBonus, 'New:', newValue);
                return currentValue; // Don't apply corrupted update
              }

              return newValue;
            });

            setTotalSixtySevensMade(prev => {
              const newValue = (prev || 0) + comboBonus;
              return isNaN(newValue) ? prev : newValue;
            });

            // Show big combo break bonus message
            showComboBreakBonus(finalCombo, comboBonus);

            // Determine tier for logging
            const tier = finalCombo >= 100 ? 'LEGENDARY (2x)' :
                        finalCombo >= 50 ? 'ULTRA (1.75x)' :
                        finalCombo >= 25 ? 'MEGA (1.5x)' : 'Normal';
            console.log(`💥 COMBO BREAK! ${finalCombo}x ${tier} combo awarded ${formatNumber(comboBonus)} 67s`);
          }

          // Verify update after a moment
          setTimeout(() => {
            console.log('✅ After combo bonus - Count:', formatNumber(sixtySevenCount));
          }, 100);
        }

        // Reset combo
        setShowComboDisplay(false);
        return 0;
      });
    }, 2000);

    // Combo multiplier for THIS click (caps at 5x)
    comboMultiplier = Math.min(1 + (currentCombo * 0.1), 5);
    clickPower *= comboMultiplier;

    // Apply achievement bonuses
    const achBonus = calculateAchievementBonus();
    clickPower *= (1 + achBonus);

    // Apply heavenly multiplier (prestige bonus)
    const heavenlyMultiplier = calculateHeavenlyMultiplier(heavenlySeventies, heavenlyUpgrades);
    clickPower *= heavenlyMultiplier;

    // Apply heavenly click upgrades
    if (heavenlyUpgrades.heavenly_click_1) {
      clickPower *= 2;
    }
    if (heavenlyUpgrades.heavenly_click_2) {
      clickPower *= 5;
    }

    // Apply cursor heaven bonus to manual clicks
    if (heavenlyUpgrades.cursor_heaven && buildings.cursor > 0) {
      clickPower *= 1.5; // Extra 50% boost from angelic cursors
    }

    // Add to count
    setSixtySevenCount(prev => prev + clickPower);
    setTotalSixtySevensMade(prev => prev + clickPower);

    // Show floating number
    showFloatingText(
      `+${formatNumber(clickPower)}`,
      isCritical ? 'critical' : 'click',
      clickX,
      clickY
    );

    // Show critical effect
    if (isCritical) {
      const criticalElem = document.createElement('div');
      criticalElem.className = 'critical-effect';
      criticalElem.textContent = 'CRITICAL!';
      criticalElem.style.left = clickX + 'px';
      criticalElem.style.top = (clickY - 50) + 'px';
      document.body.appendChild(criticalElem);
      setTimeout(() => criticalElem.remove(), 1000);
    }

    // Click animation
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 100);

    // Pulse wave effect
    const wave = document.createElement('div');
    wave.className = isCritical ? 'pulse-wave critical' : 'pulse-wave';
    wave.style.left = clickX + 'px';
    wave.style.top = clickY + 'px';
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 1000);
  };

  // Calculate SCALED combo bonus with VALIDATION - Makes combos worth it in late game!
  const calculateComboBonus = (combo, currentPerClick, currentPerSecond) => {
    // Validation: ensure inputs are valid
    if (!combo || combo < 10) {
      console.log('Combo too low (<10), returning 0');
      return 0;
    }

    // Ensure values are valid numbers with fallbacks
    const safePerClick = Math.max(currentPerClick || 1, 1);
    const safePerSecond = Math.max(currentPerSecond || 0, 0);

    console.log('💰 Calculating combo bonus:', {
      combo,
      perClick: safePerClick,
      perSecond: safePerSecond
    });

    // Base bonus: combo count squared (more combo = exponentially better)
    let bonus = combo * combo;

    // Scale with click power (main scaling factor)
    bonus *= safePerClick;

    // Additional scaling: 1% of your per-second production per combo level
    const productionBonus = safePerSecond * (combo * 0.01);
    bonus += productionBonus;

    // Bonus multiplier for higher combos (scaled to max 2x at legendary)
    let tierMultiplier = 1;
    let tierName = 'Normal';

    if (combo >= 100) {
      tierMultiplier = 2; // Legendary tier - 2x max
      tierName = 'LEGENDARY';
    } else if (combo >= 50) {
      tierMultiplier = 1.75; // Ultra tier
      tierName = 'ULTRA';
    } else if (combo >= 25) {
      tierMultiplier = 1.5; // Mega tier
      tierName = 'MEGA';
    }

    bonus *= tierMultiplier;

    const finalBonus = Math.floor(bonus);

    console.log('💰 Bonus breakdown:', {
      baseCalc: `${combo}² × ${safePerClick} = ${combo * combo * safePerClick}`,
      productionBonus,
      tier: `${tierName} (${tierMultiplier}x)`,
      finalBonus: formatNumber(finalBonus)
    });

    // Absolute minimum - never return 0 or negative
    if (finalBonus <= 0) {
      const minimum = combo * 100;
      console.warn('⚠️ Bonus was 0 or negative, using minimum:', minimum);
      return minimum;
    }

    return finalBonus;
  };

  // Show combo break bonus - Big celebration when combo ends!
  const showComboBreakBonus = (comboCount, bonus67s) => {
    const bonusElem = document.createElement('div');

    // Different messages and multipliers based on combo size
    let message = '';
    let className = 'combo-break-bonus';
    let multiplierText = '';
    let emoji = '';

    if (comboCount >= 100) {
      message = `LEGENDARY ${comboCount}x COMBO BREAK!`;
      className += ' legendary';
      multiplierText = '2x BONUS!';
      emoji = '🔥💎🔥';
    } else if (comboCount >= 50) {
      message = `ULTRA ${comboCount}x COMBO BREAK!`;
      className += ' ultra';
      multiplierText = '1.75x BONUS!';
      emoji = '⚡⚡⚡';
    } else if (comboCount >= 25) {
      message = `MEGA ${comboCount}x COMBO BREAK!`;
      className += ' mega';
      multiplierText = '1.5x BONUS!';
      emoji = '🔥🔥';
    } else {
      message = `${comboCount}x COMBO BREAK!`;
      emoji = '🎯';
    }

    bonusElem.className = className;
    bonusElem.innerHTML = `
      <div class="combo-break-title">${emoji} ${message} ${emoji}</div>
      <div class="combo-break-reward">+${formatNumber(bonus67s)} 67s!</div>
      ${multiplierText ? `<div class="combo-break-multiplier">${multiplierText}</div>` : ''}
    `;

    // Center on screen
    bonusElem.style.left = '50%';
    bonusElem.style.top = '30%';
    bonusElem.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(bonusElem);

    // Remove after animation - quick display
    const displayTime = 1500; // 1.5 seconds for all combos
    setTimeout(() => bonusElem.remove(), displayTime);

    console.log(`🎉 Combo break bonus displayed: ${comboCount}x = ${formatNumber(bonus67s)} 67s`);
  };

  // Calculate achievement bonus
  const calculateAchievementBonus = () => {
    return unlockedAchievements.reduce((total, achId) => {
      const ach = ACHIEVEMENTS.find(a => a.id === achId);
      return total + (ach?.bonus || 0);
    }, 0);
  };

  // Check and unlock achievements
  const checkAchievements = () => {
    ACHIEVEMENTS.forEach(ach => {
      if (unlockedAchievements.includes(ach.id)) return;

      let shouldUnlock = false;

      switch (ach.requirement.type) {
        case 'total67s':
          shouldUnlock = totalSixtySevensMade >= ach.requirement.value;
          break;
        case 'clicks':
          shouldUnlock = totalClicks >= ach.requirement.value;
          break;
        case 'building':
          shouldUnlock = buildings[ach.requirement.building] >= ach.requirement.value;
          break;
        case 'combo':
          shouldUnlock = maxCombo >= ach.requirement.value;
          break;
        case 'golden':
          shouldUnlock = goldenClicks >= ach.requirement.value;
          break;
        case 'production':
          shouldUnlock = perSecond >= ach.requirement.value;
          break;
      }

      if (shouldUnlock) {
        setUnlockedAchievements(prev => [...prev, ach.id]);
        setShowAchievementPopup(ach);
        setTimeout(() => setShowAchievementPopup(null), 5000);
        showFloatingText(`Achievement: ${ach.name}!`, 'achievement');
      }
    });
  };

  // Calculate prestige gain
  const calculatePrestigeGain = () => {
    // Formula: cube root of (total / 1 trillion)
    const trillions = totalSixtySevensMade / 1000000000000;
    return Math.floor(Math.cbrt(trillions));
  };

  // Calculate heavenly multiplier from prestige points and upgrades
  const calculateHeavenlyMultiplier = (points, upgrades) => {
    let multiplier = 1 + (points * 0.01); // Base: 1% per point

    // Heavenly chip upgrades add extra multiplier per point
    if (upgrades.heavenly_chip_1) {
      multiplier += points * 0.01; // +1% more per point
    }
    if (upgrades.heavenly_chip_2) {
      multiplier += points * 0.01; // +1% more per point (total +2%)
    }
    if (upgrades.heavenly_chip_3) {
      multiplier += points * 0.01; // +1% more per point (total +3%)
    }

    return multiplier;
  };

  // Ascension/Prestige function
  const performAscension = () => {
    const prestigeGain = calculatePrestigeGain();

    if (prestigeGain === 0) {
      showFloatingText('Need more 67s to ascend!', 'building');
      return;
    }

    // Calculate new multiplier
    const newPrestigePoints = heavenlySeventies + prestigeGain;
    const newMultiplier = calculateHeavenlyMultiplier(newPrestigePoints, heavenlyUpgrades);

    // Confirm ascension
    if (!window.confirm(`Ascend and gain ${prestigeGain} Heavenly 67s?\n\nThis will reset ALL progress but grant:\n• Total: ${newPrestigePoints} Heavenly 67s\n• Production: +${((newMultiplier - 1) * 100).toFixed(0)}%\n• Keep: Achievements & Heavenly Upgrades`)) {
      return;
    }

    // Apply starter boost if owned
    const startingAmount = heavenlyUpgrades.starting_boost ? 1000 : 0;

    // Reset everything
    setSixtySevenCount(startingAmount);
    setTotalSixtySevensMade(0);
    setBuildings({
      cursor: 0,
      grandma: 0,
      farm: 0,
      factory: 0,
      bank: 0,
      temple: 0,
      wizard: 0,
      portal: 0,
      timeMachine: 0,
      quantum: 0
    });
    setPurchasedClickUpgrades([]);
    setPurchasedScalingUpgrades([]);
    setClickScaling(0);
    setMaxCombo(0);
    setTotalClicks(0);
    setGoldenClicks(0);

    // Grant heavenly 67s and update lifetime
    setHeavenlySeventies(prev => prev + prestigeGain);
    setLifetimePrestigePoints(prev => prev + prestigeGain);
    setAscensionCount(prev => prev + 1);

    showFloatingText(`Ascended! +${prestigeGain} Heavenly 67s!`, 'prestige');
  };

  // Buy heavenly upgrade
  const buyHeavenlyUpgrade = (upgradeId) => {
    const upgrade = HEAVENLY_UPGRADES[upgradeId];

    if (!upgrade) {
      console.error('Unknown upgrade:', upgradeId);
      return;
    }

    if (heavenlyUpgrades[upgradeId]) {
      showFloatingText('Already owned!', 'building');
      return;
    }

    if (heavenlySeventies < upgrade.cost) {
      showFloatingText('Not enough Heavenly 67s!', 'building');
      return;
    }

    // Check requirement
    const state = {
      heavenlyUpgrades,
      lifetimePrestigePoints,
      prestigeLevel: ascensionCount
    };

    if (!upgrade.requirement(state)) {
      showFloatingText('Requirements not met!', 'building');
      return;
    }

    // Deduct cost
    setHeavenlySeventies(prev => prev - upgrade.cost);

    // Mark as owned
    setHeavenlyUpgrades(prev => ({
      ...prev,
      [upgradeId]: true
    }));

    showFloatingText(`Purchased: ${upgrade.name}!`, 'prestige');
  };

  // Trigger random event
  const triggerRandomEvent = () => {
    const events = Object.keys(EVENT_TYPES);
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const event = EVENT_TYPES[randomEvent];

    setActiveEvent({ type: randomEvent, endTime: Date.now() + (event.duration * 1000) });
    showFloatingText(event.message, 'event');

    // Clear existing timer
    if (eventTimerRef.current) {
      clearTimeout(eventTimerRef.current);
    }

    // End event after duration
    eventTimerRef.current = setTimeout(() => {
      setActiveEvent(null);
      showFloatingText('Event ended!', 'building');
    }, event.duration * 1000);
  };

  // Check for daily divine 67 harvest
  const checkDivineHarvest = () => {
    const today = new Date().toDateString();
    if (lastHarvestDate !== today && divine67s > 0) {
      return true;
    }
    return false;
  };

  // Harvest divine 67
  const harvestDivine67 = () => {
    if (!checkDivineHarvest()) {
      showFloatingText('Divine 67 not ready!', 'building');
      return;
    }

    const today = new Date().toDateString();
    setLastHarvestDate(today);
    setDivine67s(prev => prev + 1);
    showFloatingText('Harvested Divine 67!', 'golden');
  };

  // Show floating text
  const showFloatingText = (text, type = 'click', x, y) => {
    const id = Date.now() + Math.random();
    const newFloat = {
      id,
      text,
      type,
      x: x || window.innerWidth * 0.35,
      y: y || window.innerHeight / 2
    };

    setFloatingNumbers(prev => [...prev, newFloat]);

    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  // Handle cursor auto-clicks
  const handleCursorClick = (amount, cursorId) => {
    // Add to game state
    setSixtySevenCount(prev => prev + amount);
    setTotalSixtySevensMade(prev => prev + amount);

    // Show floating number at cursor position
    const cursorElement = document.getElementById(`cursor-${cursorId}`);
    if (cursorElement) {
      const rect = cursorElement.getBoundingClientRect();
      showFloatingText(
        `+${formatNumber(amount)}`,
        'cursor',
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    }
  };

  // Spawn golden 67
  const spawnGoldenSixtySeven = () => {
    // Don't spawn if one already exists
    if (goldenSixtySeven) return;

    const golden = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 200) + 100,
      y: Math.random() * (window.innerHeight - 200) + 100
    };

    setGoldenSixtySeven(golden);

    // Remove after 4 seconds if not clicked
    setTimeout(() => {
      setGoldenSixtySeven(prev => prev?.id === golden.id ? null : prev);
    }, 4000);
  };

  // Click golden 67
  const clickGoldenSixtySeven = () => {
    if (!goldenSixtySeven) return;

    // Track golden clicks
    setGoldenClicks(prev => prev + 1);

    // Remove the golden 67
    setGoldenSixtySeven(null);

    // Random golden 67 effect
    const effects = ['FRENZY', 'LUCKY', 'CLICK_FRENZY'];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    if (effect === 'FRENZY') {
      triggerRandomEvent();
    } else if (effect === 'LUCKY') {
      const luckyAmount = sixtySevenCount * 0.15 + (perSecond * 60 * 13);
      setSixtySevenCount(prev => prev + luckyAmount);
      showFloatingText(`LUCKY! +${formatNumber(luckyAmount)}`, 'golden');
    } else if (effect === 'CLICK_FRENZY') {
      setActiveEvent({ type: 'CLICK_FRENZY', endTime: Date.now() + 13000 });
      showFloatingText('777x CLICK POWER!', 'golden');
      setTimeout(() => setActiveEvent(null), 13000);
    }
  };

  // Passive income generation (with multiplier)
  useEffect(() => {
    const interval = setInterval(() => {
      if (perSecond > 0) {
        // Update 10 times per second for smoother number changes
        const amount = (perSecond * productionMultiplier) / 10;
        setSixtySevenCount(prev => prev + amount);
        setTotalSixtySevensMade(prev => prev + amount);
      }
    }, 100); // 100ms = 10 updates per second

    return () => clearInterval(interval);
  }, [perSecond, productionMultiplier]);

  // Golden 67 spawner (every 1-2 minutes)
  useEffect(() => {
    const spawnInterval = () => {
      // Random interval between 60-120 seconds
      const nextSpawn = (60 + Math.random() * 60) * 1000;

      setTimeout(() => {
        spawnGoldenSixtySeven();
        spawnInterval(); // Schedule next spawn
      }, nextSpawn);
    };

    // Start the spawn cycle
    spawnInterval();

    return () => {
      if (multiplierTimerRef.current) {
        clearTimeout(multiplierTimerRef.current);
      }
    };
  }, []);

  // Version-aware save system with backup - INCLUDES ALL COOKIE CLICKER FEATURES
  useEffect(() => {
    const saveGame = () => {
      try {
        // Validate critical values before saving
        const validatedCount = (typeof sixtySevenCount === 'number' && !isNaN(sixtySevenCount)) ? sixtySevenCount : 0;
        const validatedTotal = (typeof totalSixtySevensMade === 'number' && !isNaN(totalSixtySevensMade)) ? totalSixtySevensMade : 0;

        const saveData = {
          version: GAME_VERSION,
          timestamp: Date.now(),
          game: {
            // Core game state
            sixtySevenCount: validatedCount,
            totalSixtySevensMade: validatedTotal,
            perClick,
            perSecond,
            buildings: { ...buildings },
            purchasedClickUpgrades: [...purchasedClickUpgrades],
            purchasedScalingUpgrades: [...purchasedScalingUpgrades],
            clickScaling,
            maxCombo,

            // Cookie Clicker features
            unlockedAchievements: [...unlockedAchievements],
            totalClicks,
            goldenClicks,
            heavenlySeventies,
            ascensionCount,
            lifetimePrestigePoints,
            heavenlyUpgrades: { ...heavenlyUpgrades },
            apocalypseLevel,
            divine67s,
            lastHarvestDate,

            lastSave: Date.now()
          }
        };

        const saveString = JSON.stringify(saveData);

        // Create backup of previous save
        const oldSave = localStorage.getItem(SAVE_KEY);
        if (oldSave) {
          localStorage.setItem(BACKUP_KEY, oldSave);
        }

        // Save new data
        localStorage.setItem(SAVE_KEY, saveString);
        setLastSaveTime(Date.now());

        // Show save indicator
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
          indicator.classList.add('active');
          setTimeout(() => indicator.classList.remove('active'), 2000);
        }

        console.log('✅ Game saved successfully! v' + GAME_VERSION, {
          count: validatedCount,
          total: validatedTotal,
          buildings: Object.values(buildings).reduce((a,b) => a+b, 0),
          achievements: unlockedAchievements.length,
          heavenly: heavenlySeventies
        });
      } catch (error) {
        console.error('❌ Save failed:', error);
      }
    };

    const interval = setInterval(saveGame, 10000); // Auto-save every 10 seconds

    // Save immediately on important changes
    if (Object.values(buildings).some(count => count > 0) ||
        purchasedClickUpgrades.length > 0 ||
        purchasedScalingUpgrades.length > 0 ||
        unlockedAchievements.length > 0) {
      saveGame();
    }

    // Save on unmount
    return () => {
      clearInterval(interval);
      saveGame();
      console.log('💾 Final save on unmount');
    };
  }, [sixtySevenCount, totalSixtySevensMade, buildings, purchasedClickUpgrades, purchasedScalingUpgrades, perClick, perSecond, clickScaling, maxCombo, unlockedAchievements, totalClicks, goldenClicks, heavenlySeventies, ascensionCount, lifetimePrestigePoints, heavenlyUpgrades, apocalypseLevel, divine67s, lastHarvestDate]);

  // Show offline earnings notification on mount
  useEffect(() => {
    if (offlineEarningsRef.current > 0) {
      setTimeout(() => {
        showFloatingText(`+${formatNumber(offlineEarningsRef.current)} offline!`, 'building');
      }, 1000);
    }
  }, []);

  // Achievement checker - runs frequently to check progress
  useEffect(() => {
    const interval = setInterval(() => {
      checkAchievements();
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSixtySevensMade, totalClicks, buildings, maxCombo, goldenClicks, perSecond, unlockedAchievements]);

  // News ticker - updates every 20-40 seconds
  useEffect(() => {
    const updateNews = () => {
      const randomNews = NEWS_MESSAGES[Math.floor(Math.random() * NEWS_MESSAGES.length)];
      setNewsMessage(randomNews);

      // Schedule next update (20-40 seconds)
      const nextUpdate = (20 + Math.random() * 20) * 1000;
      setTimeout(updateNews, nextUpdate);
    };

    // Initial news after 2 seconds
    setTimeout(updateNews, 2000);
  }, []);

  // Random event spawner (every 5-10 minutes)
  useEffect(() => {
    const spawnEvent = () => {
      const nextEvent = (300 + Math.random() * 300) * 1000; // 5-10 minutes

      setTimeout(() => {
        // Only spawn if no event is active
        if (!activeEvent && perSecond > 100) {
          triggerRandomEvent();
        }
        spawnEvent(); // Schedule next event
      }, nextEvent);
    };

    // Start event cycle after 2 minutes
    setTimeout(spawnEvent, 120000);
  }, []);

  // Divine 67 growth (grows slowly over time, caps at 3)
  useEffect(() => {
    const growthInterval = setInterval(() => {
      if (divine67s < 3 && totalSixtySevensMade > 10000000) {
        // Chance to grow a divine 67 (very rare)
        if (Math.random() < 0.00001) { // 0.001% chance per check
          setDivine67s(prev => Math.min(prev + 1, 3));
          showFloatingText('A Divine 67 has grown!', 'golden');
        }
      }
    }, 1000);

    return () => clearInterval(growthInterval);
  }, [divine67s, totalSixtySevensMade]);

  // 67-pocalypse system (triggered by grandma count)
  useEffect(() => {
    const grandmaCount = buildings.grandma;

    if (grandmaCount >= 100 && apocalypseLevel === 0) {
      setApocalypseLevel(1);
      showFloatingText('The 67-pocalypse has begun...', 'event');
    } else if (grandmaCount >= 200 && apocalypseLevel === 1) {
      setApocalypseLevel(2);
      showFloatingText('The grandmas grow stronger...', 'event');
    } else if (grandmaCount >= 300 && apocalypseLevel === 2) {
      setApocalypseLevel(3);
      showFloatingText('PEAK 67-POCALYPSE!', 'event');
    }
  }, [buildings.grandma, apocalypseLevel]);

  // Hide header on mount
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    return () => {
      if (header) {
        header.style.display = '';
      }
    };
  }, []);

  // Three.js Scene - Background particles only
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.005);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 3, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Particle System
    const createParticles = (count) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = [];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        velocities.push({
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      particlesRef.current.push({ mesh: particles, velocities });
    };

    const isMobile = window.innerWidth < 768;
    createParticles(isMobile ? 2000 : 5000);

    // Background stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation Loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particles
      particlesRef.current.forEach(({ mesh, velocities }) => {
        mesh.rotation.y += 0.001;

        const positions = mesh.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const idx = i / 3;
          positions[i] += velocities[idx].x;
          positions[i + 1] += velocities[idx].y;
          positions[i + 2] += velocities[idx].z;

          if (Math.abs(positions[i]) > 50) velocities[idx].x *= -1;
          if (Math.abs(positions[i + 1]) > 50) velocities[idx].y *= -1;
          if (Math.abs(positions[i + 2]) > 50) velocities[idx].z *= -1;
        }

        mesh.geometry.attributes.position.needsUpdate = true;
      });

      stars.rotation.y += 0.0005;

      pointLight1.intensity = 3 + Math.sin(time * 2) * 1;
      pointLight2.intensity = 3 + Math.cos(time * 2) * 1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent key repeat spam (holding down key)
      if (event.repeat) return;

      const key = event.key.toLowerCase();

      switch(key) {
        case ' ':
          event.preventDefault();
          handleBigClick();
          break;
        case 's':
          setShowStats(prev => !prev);
          break;
        case 'escape':
          setShowStats(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [perClick]);

  // Debug: Log buildings state for troubleshooting
  useEffect(() => {
    console.log('🏢 Buildings Shop State:', {
      buildings,
      buildingKeys: Object.keys(BUILDINGS),
      costs: Object.keys(BUILDINGS).map(key => ({
        [key]: {
          cost: getBuildingCost(key),
          owned: buildings[key],
          baseCost: BUILDINGS[key].baseCost
        }
      }))
    });
  }, [buildings, sixtySevenCount]);

  return (
    <div className="sixtyseven-page clicker-mode" ref={mountRef}>
      {/* Center Area with Orbiting Cursors and Big 67 */}
      <div className="center-area">
        {/* Cursor Orbit Component */}
        {buildings.cursor > 0 && (
          <CursorOrbit
            cursorCount={buildings.cursor}
            perClick={perClick}
            clickScaling={clickScaling}
            perSecond={perSecond}
            onCursorClick={handleCursorClick}
          />
        )}

        {/* Cursor Count Badge */}
        {buildings.cursor > 0 && (
          <div className="cursor-count-badge">
            👆 x{buildings.cursor}
          </div>
        )}

        {/* Big Clickable 67 */}
        <div
          className={`big-67 ${clickAnimation ? 'clicked' : ''}`}
          onClick={handleBigClick}
          onTouchStart={(e) => {
            e.preventDefault();
            handleBigClick(e);
          }}
          tabIndex={0}
          role="button"
          aria-label="Click to earn 67s (Press Space or Enter)"
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleBigClick();
            }
          }}
        >
          67
          <div className="big-67-shadow">67</div>
        </div>
      </div>

      {/* Count Display */}
      <div className="count-display">
        <div className="count-main">{formatNumber(sixtySevenCount)}</div>
        <div className="count-label">sixty-sevens</div>
        {perSecond > 0 && (
          <div className="count-per-second">
            per second: {formatNumber(perSecond)}
          </div>
        )}
        {buildings.cursor > 0 && (
          <div className="cursor-info-display">
            <div className="cursor-info-title">👆 Cursor Production</div>
            <div className="cursor-info-stat">
              {buildings.cursor} cursor{buildings.cursor !== 1 ? 's' : ''} active
            </div>
            <div className="cursor-info-stat">
              ~{formatNumber(buildings.cursor * perClick * 0.1)}/sec from auto-clicks
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${currentTab === 'store' ? 'active' : ''}`}
          onClick={() => setCurrentTab('store')}
        >
          🏪 Store
        </button>
        <button
          className={`tab-button ${currentTab === 'prestige' ? 'active' : ''}`}
          onClick={() => setCurrentTab('prestige')}
        >
          ☁️ Ascension
        </button>
        <button
          className={`tab-button ${currentTab === 'stats' ? 'active' : ''}`}
          onClick={() => setCurrentTab('stats')}
        >
          📊 Stats
        </button>
      </div>

      {/* Prestige Tab */}
      {currentTab === 'prestige' && (
        <PrestigePanel
          state={{
            sixtySevenCount,
            totalSixtySevensMade,
            heavenlySeventies,
            ascensionCount,
            lifetimePrestigePoints,
            heavenlyUpgrades,
            buildings
          }}
          onAscend={performAscension}
          onBuyUpgrade={buyHeavenlyUpgrade}
          formatNumber={formatNumber}
        />
      )}

      {/* Stats Tab */}
      {currentTab === 'stats' && (
        <StatsPanel
          state={{
            sixtySevenCount,
            totalSixtySevensMade,
            perSecond,
            perClick,
            totalClicks,
            goldenClicks,
            maxCombo,
            clickScaling,
            buildings,
            heavenlySeventies,
            lifetimePrestigePoints,
            ascensionCount,
            heavenlyUpgrades,
            unlockedAchievements
          }}
          formatNumber={formatNumber}
        />
      )}

      {/* Upgrade Shop - Store Tab */}
      {currentTab === 'store' && (
        <div className="upgrade-shop">
          <div className="shop-header">
            <h2>Upgrades</h2>
            <div className="shop-subtitle">Increase your power</div>
          </div>

        {/* Click Power Upgrades */}
        <div className="shop-section">
          <div className="shop-section-title">Click Power</div>
          <div className="shop-upgrades">
            {CLICK_UPGRADES.map(upgrade => {
              const isPurchased = purchasedClickUpgrades.includes(upgrade.id);
              const canAfford = sixtySevenCount >= upgrade.cost && !isPurchased;

              return (
                <div
                  key={upgrade.id}
                  className={`upgrade-card ${canAfford ? 'affordable' : 'expensive'} ${isPurchased ? 'purchased' : ''}`}
                  onClick={() => purchaseClickUpgrade(upgrade.id)}
                >
                  <div className="upgrade-icon">{upgrade.icon}</div>
                  <div className="upgrade-info">
                    <div className="upgrade-name">{upgrade.name}</div>
                    <div className="upgrade-description">{upgrade.description}</div>
                  </div>
                  <div className="upgrade-cost">
                    {isPurchased ? '✓' : formatNumber(upgrade.cost)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Click Scaling Upgrades */}
        <div className="shop-section">
          <div className="shop-section-title">Click Scaling</div>
          <div className="shop-upgrades">
            {CLICK_SCALING_UPGRADES.map(upgrade => {
              const isPurchased = purchasedScalingUpgrades.includes(upgrade.id);
              const canAfford = sixtySevenCount >= upgrade.cost && !isPurchased;

              return (
                <div
                  key={upgrade.id}
                  className={`upgrade-card ${canAfford ? 'affordable' : 'expensive'} ${isPurchased ? 'purchased' : ''}`}
                  onClick={() => purchaseScalingUpgrade(upgrade.id)}
                >
                  <div className="upgrade-icon">{upgrade.icon}</div>
                  <div className="upgrade-info">
                    <div className="upgrade-name">{upgrade.name}</div>
                    <div className="upgrade-description">{upgrade.description}</div>
                  </div>
                  <div className="upgrade-cost">
                    {isPurchased ? '✓' : formatNumber(upgrade.cost)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buildings Section */}
        <div className="shop-section">
          <div className="shop-section-title">Buildings</div>
          <div className="shop-buildings">
            {Object.keys(BUILDINGS).map(key => {
            const building = BUILDINGS[key];
            const cost = getBuildingCost(key);

            // Safety check: ensure buildings state exists and has the key
            const owned = (buildings && buildings[key] !== undefined) ? buildings[key] : 0;
            const canAfford = (sixtySevenCount || 0) >= cost;

            // Calculate total production for this building type
            let totalProduction = building.baseProduction * owned;

            // Apply heavenly upgrades
            if (key === 'cursor' && heavenlyUpgrades.cursor_heaven) {
              totalProduction *= 3;
            }
            if (key === 'grandma' && heavenlyUpgrades.grandma_heaven) {
              totalProduction *= 3;
            }
            if (key === 'farm' && heavenlyUpgrades.farm_heaven) {
              totalProduction *= 3;
            }
            if (key === 'factory' && heavenlyUpgrades.factory_heaven) {
              totalProduction *= 3;
            }

            return (
              <div
                key={key}
                className={`building-card ${canAfford ? 'affordable' : 'expensive'}`}
                onClick={() => purchaseBuilding(key)}
              >
                <div className="building-icon">{building.icon}</div>
                <div className="building-info">
                  <div className="building-name">{building.name}</div>
                  <div className="building-description">{building.description}</div>
                  <div className="building-stats">
                    {/* Base production per building */}
                    <div className="stat-item">
                      {key === 'cursor'
                        ? 'Auto-clicks every second'
                        : `Each produces ${formatNumber(building.baseProduction)}/sec`
                      }
                    </div>

                    {/* Total production if owned */}
                    {owned > 0 && totalProduction > 0 && (
                      <div className="stat-item total-production">
                        Total: <span className="highlight">{formatNumber(totalProduction)}/sec</span>
                      </div>
                    )}

                    {/* Cursor click bonus */}
                    {key === 'cursor' && owned > 0 && (
                      <div className="stat-item total-production">
                        Click bonus: <span className="highlight">+{formatNumber(owned * 0.1)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="building-purchase">
                  <div className="building-owned">{owned}</div>
                  <div className="building-cost">
                    {formatNumber(cost)}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
        </div>
      )}

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel" onClick={() => setShowStats(false)}>
          <div className="stats-content" onClick={(e) => e.stopPropagation()}>
            <h2>Statistics</h2>
            <div className="stat-row">
              <span>Total 67s made:</span>
              <span>{formatNumber(totalSixtySevensMade)}</span>
            </div>
            <div className="stat-row">
              <span>67s per click:</span>
              <span>{formatNumber(perClick)}</span>
            </div>
            <div className="stat-row">
              <span>67s per second:</span>
              <span>{formatNumber(perSecond)}</span>
            </div>
            {maxCombo > 0 && (
              <div className="stat-row">
                <span>🔥 Max Combo:</span>
                <span>{maxCombo}x</span>
              </div>
            )}
            {clickScaling > 0 && (
              <div className="stat-row">
                <span>📈 Click Scaling:</span>
                <span>+{(clickScaling * 100).toFixed(0)}% of production</span>
              </div>
            )}
            <div className="stat-divider"></div>
            {Object.keys(BUILDINGS).map(key => {
              const building = BUILDINGS[key];
              const owned = buildings[key];
              if (owned === 0) return null;

              return (
                <div key={key} className="stat-row">
                  <span>{building.icon} {building.name}:</span>
                  <span>{owned}</span>
                </div>
              );
            })}
            <button className="stats-close" onClick={() => setShowStats(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Golden 67 */}
      {goldenSixtySeven && (
        <div
          className="golden-67"
          style={{
            left: goldenSixtySeven.x + 'px',
            top: goldenSixtySeven.y + 'px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            clickGoldenSixtySeven();
          }}
        >
          <div className="golden-67-glow">67</div>
          67
        </div>
      )}

      {/* Production Multiplier Indicator */}
      {productionMultiplier > 1 && (
        <div className="multiplier-indicator">
          {productionMultiplier}x PRODUCTION!
        </div>
      )}

      {/* Combo Display */}
      {showComboDisplay && clickCombo >= 5 && (
        <div className={`combo-display ${
          clickCombo >= 100 ? 'legendary' :
          clickCombo >= 50 ? 'ultra' :
          clickCombo >= 25 ? 'mega' : ''
        }`}>
          <div className="combo-count">{clickCombo}x</div>
          <div className="combo-label">
            {clickCombo >= 100 ? '🔥💎 LEGENDARY! 💎🔥' :
             clickCombo >= 50 ? '⚡ ULTRA! ⚡' :
             clickCombo >= 25 ? '✨ MEGA! ✨' :
             'COMBO!'}
          </div>
          <div className="combo-multiplier">
            {Math.min(1 + (clickCombo * 0.1), 5).toFixed(1)}x damage
          </div>
          {clickCombo >= 10 && (
            <div className="combo-bonus-preview">
              +{formatNumber(calculateComboBonus(clickCombo, perClick, perSecond))} on break!
            </div>
          )}
          {clickCombo >= 100 && (
            <div className="combo-tier-badge legendary-badge">2x BONUS!</div>
          )}
          {clickCombo >= 50 && clickCombo < 100 && (
            <div className="combo-tier-badge ultra-badge">1.75x BONUS!</div>
          )}
          {clickCombo >= 25 && clickCombo < 50 && (
            <div className="combo-tier-badge mega-badge">1.5x BONUS!</div>
          )}
        </div>
      )}

      {/* Version Info */}
      <div className="version-info">
        v{GAME_VERSION}
      </div>

      {/* Floating Numbers */}
      {floatingNumbers.map(float => (
        <div
          key={float.id}
          className={`floating-number ${float.type}`}
          style={{
            left: float.x + 'px',
            top: float.y + 'px'
          }}
        >
          {float.text}
        </div>
      ))}

      {/* Controls Hint */}
      <div className="clicker-controls">
        <div className="control-hint">
          <kbd>SPACE</kbd> or <kbd>CLICK</kbd> - Click the 67
        </div>
        <div className="control-hint">
          <kbd>S</kbd> - Stats
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="autosave-indicator">
        Auto-save enabled
      </div>

      {/* News Ticker */}
      {newsMessage && (
        <div className="news-ticker">
          <div className="news-content">
            {newsMessage}
          </div>
        </div>
      )}

      {/* Achievement Popup */}
      {showAchievementPopup && (
        <div className="achievement-popup">
          <div className="achievement-popup-content">
            <div className="achievement-popup-title">Achievement Unlocked!</div>
            <div className="achievement-popup-name">{showAchievementPopup.name}</div>
            <div className="achievement-popup-desc">{showAchievementPopup.description}</div>
            <div className="achievement-popup-bonus">+{(showAchievementPopup.bonus * 100).toFixed(0)}% production bonus</div>
          </div>
        </div>
      )}

      {/* Active Event Display */}
      {activeEvent && (
        <div className="active-event-display">
          <div className="event-name">{EVENT_TYPES[activeEvent.type]?.name}</div>
          <div className="event-timer">
            {Math.ceil((activeEvent.endTime - Date.now()) / 1000)}s
          </div>
        </div>
      )}

      {/* Heavenly 67s Display (if any) */}
      {heavenlySeventies > 0 && (
        <div className="heavenly-display">
          <div className="heavenly-icon">✨</div>
          <div className="heavenly-count">{heavenlySeventies} Heavenly 67s</div>
          <div className="heavenly-bonus">+{(heavenlySeventies * 2)}% production</div>
        </div>
      )}

      {/* 67-pocalypse Indicator */}
      {apocalypseLevel > 0 && (
        <div className={`apocalypse-indicator level-${apocalypseLevel}`}>
          <div className="apocalypse-text">
            {apocalypseLevel === 1 && '67-pocalypse: Rising'}
            {apocalypseLevel === 2 && '67-pocalypse: Intensifying'}
            {apocalypseLevel === 3 && '67-POCALYPSE: MAXIMUM'}
          </div>
        </div>
      )}

      {/* Divine 67s Display */}
      {divine67s > 0 && (
        <div className="divine-67-display">
          <div className="divine-icon">🌟</div>
          <div className="divine-count">{divine67s} Divine 67{divine67s !== 1 ? 's' : ''}</div>
          {checkDivineHarvest() && (
            <button className="divine-harvest-btn" onClick={harvestDivine67}>
              Harvest Ready!
            </button>
          )}
        </div>
      )}

      {/* Achievement Counter in Corner */}
      {unlockedAchievements.length > 0 && (
        <div className="achievement-counter" title={`${unlockedAchievements.length}/${ACHIEVEMENTS.length} achievements`}>
          🏆 {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          <div className="achievement-bonus-display">
            +{(calculateAchievementBonus() * 100).toFixed(0)}% bonus
          </div>
        </div>
      )}

      {/* Save Indicator */}
      <div className="save-indicator" id="save-indicator">
        💾 Saved!
      </div>

      {/* Debug Panel */}
      <div className="debug-panel-container">
        <button
          className="debug-toggle"
          onClick={() => {
            const panel = document.querySelector('.debug-panel');
            if (panel) {
              panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
          }}
          title="Toggle Debug Panel"
        >
          🐛
        </button>
        <div className="debug-panel" style={{display: 'none'}}>
          <div className="debug-header">
            <h3>🐛 DEBUG PANEL v{GAME_VERSION}</h3>
            <button
              className="debug-close"
              onClick={() => {
                const panel = document.querySelector('.debug-panel');
                if (panel) panel.style.display = 'none';
              }}
            >
              ✕
            </button>
          </div>

          <div className="debug-section">
            <h4>Core Stats:</h4>
            <div className="debug-stat">67s: {formatNumber(sixtySevenCount)}</div>
            <div className="debug-stat">Total Made: {formatNumber(totalSixtySevensMade)}</div>
            <div className="debug-stat">Per Click: {formatNumber(perClick)}</div>
            <div className="debug-stat">Per Second: {formatNumber(perSecond)}</div>
            <div className="debug-stat">Total Clicks: {totalClicks}</div>
            <div className="debug-stat">Golden Clicks: {goldenClicks}</div>
            <div className="debug-stat">Max Combo: {maxCombo}</div>
          </div>

          <div className="debug-section">
            <h4>Prestige:</h4>
            <div className="debug-stat">Heavenly 67s: {heavenlySeventies}</div>
            <div className="debug-stat">Lifetime Prestige: {lifetimePrestigePoints}</div>
            <div className="debug-stat">Ascensions: {ascensionCount}</div>
            <div className="debug-stat">Prestige Bonus: +{(heavenlySeventies * 2)}%</div>
            <div className="debug-stat">Heavenly Upgrades: {Object.keys(heavenlyUpgrades).length}</div>
          </div>

          <div className="debug-section">
            <h4>Buildings ({Object.values(buildings).reduce((a,b) => a+b, 0)} total):</h4>
            {Object.entries(buildings).map(([key, value]) => (
              value > 0 && <div key={key} className="debug-stat">{BUILDINGS[key].icon} {BUILDINGS[key].name}: {value}</div>
            ))}
          </div>

          <div className="debug-section">
            <h4>Cheats:</h4>
            <button onClick={() => {
              setSixtySevenCount(prev => prev + 1000);
              setTotalSixtySevensMade(prev => prev + 1000);
            }}>+1K 67s</button>
            <button onClick={() => {
              setSixtySevenCount(prev => prev + 1000000);
              setTotalSixtySevensMade(prev => prev + 1000000);
            }}>+1M 67s</button>
            <button onClick={() => {
              setSixtySevenCount(prev => prev + 1000000000);
              setTotalSixtySevensMade(prev => prev + 1000000000);
            }}>+1B 67s</button>
            <button onClick={() => {
              setSixtySevenCount(prev => prev + 1000000000000);
              setTotalSixtySevensMade(prev => prev + 1000000000000);
            }}>+1T 67s</button>
            <button onClick={() => {
              setHeavenlySeventies(prev => prev + 10);
              setLifetimePrestigePoints(prev => prev + 10);
            }}>+10 Heavenly</button>
          </div>

          <div className="debug-section">
            <h4>Save Management:</h4>
            <button onClick={() => {
              const saveData = localStorage.getItem(SAVE_KEY);
              console.log('📋 Current Save Data:', JSON.parse(saveData || '{}'));
              alert('✅ Save data logged to console (F12)');
            }}>📋 View Save Data</button>

            <button onClick={() => {
              try {
                const saveData = localStorage.getItem(SAVE_KEY);
                const encoded = btoa(saveData || '{}');
                navigator.clipboard.writeText(encoded).then(() => {
                  alert('✅ Save exported and copied to clipboard!\n\nPaste this code to import your save later.');
                }).catch(() => {
                  prompt('📤 Copy this save code:', encoded);
                });
              } catch (error) {
                alert('❌ Export failed: ' + error.message);
              }
            }}>📤 Export Save</button>

            <button onClick={() => {
              const code = prompt('📥 Paste your save code:');
              if (code && code.trim()) {
                if (window.confirm('⚠️ This will overwrite your current save!\n\nContinue?')) {
                  try {
                    const decoded = atob(code);
                    const saveData = JSON.parse(decoded);
                    localStorage.setItem(SAVE_KEY, decoded);
                    alert('✅ Save imported successfully! Page will reload...');
                    setTimeout(() => window.location.reload(), 500);
                  } catch (error) {
                    alert('❌ Invalid save code!\n\n' + error.message);
                  }
                }
              }
            }}>📥 Import Save</button>

            <button onClick={() => {
              const backup = localStorage.getItem(BACKUP_KEY);
              if (backup) {
                if (window.confirm('Restore from backup save?\n\nThis will overwrite your current progress.')) {
                  localStorage.setItem(SAVE_KEY, backup);
                  alert('✅ Backup restored! Page will reload...');
                  setTimeout(() => window.location.reload(), 500);
                }
              } else {
                alert('❌ No backup found!');
              }
            }}>🔄 Restore Backup</button>
          </div>

          <div className="debug-section danger-zone">
            <h4>⚠️ Danger Zone:</h4>

            <button
              className="warning-btn"
              onClick={() => {
                const confirmed = window.confirm(
                  '🔄 SOFT RESET 🔄\n\n' +
                  'This will reset:\n' +
                  '• All 67s\n' +
                  '• All buildings\n' +
                  '• All non-heavenly upgrades\n\n' +
                  'But you will KEEP:\n' +
                  '• Prestige points (' + heavenlySeventies + ')\n' +
                  '• Heavenly upgrades (' + Object.keys(heavenlyUpgrades).length + ')\n' +
                  '• Achievements (' + unlockedAchievements.length + ')\n\n' +
                  'Continue?'
                );

                if (confirmed) {
                  // Backup prestige data
                  const prestigeData = {
                    heavenlySeventies,
                    lifetimePrestigePoints,
                    ascensionCount,
                    heavenlyUpgrades: {...heavenlyUpgrades},
                    unlockedAchievements: [...unlockedAchievements]
                  };

                  // Clear all game state
                  localStorage.removeItem(SAVE_KEY);
                  localStorage.removeItem(BACKUP_KEY);

                  // Create fresh save with only prestige data
                  const freshSave = {
                    game: {
                      sixtySevenCount: 0,
                      totalSixtySevensMade: 0,
                      totalClicks: 0,
                      goldenClicks: 0,
                      maxCombo: 0,
                      buildings: {
                        cursor: 0,
                        grandma: 0,
                        farm: 0,
                        factory: 0,
                        mine: 0,
                        shipment: 0,
                        alchemy: 0,
                        portal: 0,
                        timeMachine: 0,
                        quantumComputer: 0
                      },
                      purchasedClickUpgrades: [],
                      purchasedScalingUpgrades: [],
                      ...prestigeData
                    }
                  };

                  localStorage.setItem(SAVE_KEY, JSON.stringify(freshSave));
                  console.log('🔄 Soft reset complete - prestige data kept');
                  alert('🔄 Soft reset complete! Page will reload...');
                  setTimeout(() => window.location.reload(), 500);
                }
              }}
            >
              🔄 Soft Reset (Keep Prestige)
            </button>

            <button
              className="danger-btn"
              onClick={() => {
                const confirmed = window.confirm(
                  '⚠️ HARD RESET ⚠️\n\n' +
                  'This will DELETE EVERYTHING:\n' +
                  '• All 67s (' + formatNumber(sixtySevenCount) + ')\n' +
                  '• All buildings (' + Object.values(buildings).reduce((a,b) => a+b, 0) + ')\n' +
                  '• All upgrades\n' +
                  '• Prestige points (' + heavenlySeventies + ')\n' +
                  '• Heavenly upgrades (' + Object.keys(heavenlyUpgrades).length + ')\n' +
                  '• Achievements (' + unlockedAchievements.length + ')\n\n' +
                  '⚠️ This CANNOT be undone! ⚠️\n\n' +
                  'Are you absolutely sure?'
                );

                if (confirmed) {
                  const doubleCheck = window.confirm(
                    '🚨 FINAL WARNING! 🚨\n\n' +
                    'Click OK to permanently delete your save.\n\n' +
                    'This is your last chance to cancel!'
                  );

                  if (doubleCheck) {
                    // Clear localStorage completely
                    localStorage.removeItem(SAVE_KEY);
                    localStorage.removeItem(BACKUP_KEY);

                    // Also clear any other potential keys
                    const keysToRemove = [];
                    for (let i = 0; i < localStorage.length; i++) {
                      const key = localStorage.key(i);
                      if (key && key.includes('67')) {
                        keysToRemove.push(key);
                      }
                    }
                    keysToRemove.forEach(key => localStorage.removeItem(key));

                    console.log('🗑️ Game completely reset - localStorage cleared');
                    console.log('Cleared keys:', keysToRemove);

                    // Force a hard reload by clearing all state immediately
                    // Set all state to initial values before reload
                    console.log('🔄 Resetting all state to initial values...');

                    setSixtySevenCount(0);
                    setTotalSixtySevensMade(0);
                    setPerClick(1);
                    setPerSecond(0);
                    setTotalClicks(0);
                    setGoldenClicks(0);
                    setMaxCombo(0);
                    setClickCombo(0);

                    // Match BUILDINGS config exactly
                    const freshBuildings = {
                      cursor: 0,
                      grandma: 0,
                      farm: 0,
                      factory: 0,
                      bank: 0,
                      temple: 0,
                      wizard: 0,
                      portal: 0,
                      timeMachine: 0,
                      quantum: 0
                    };
                    setBuildings(freshBuildings);
                    console.log('✅ Buildings reset to:', freshBuildings);

                    setPurchasedClickUpgrades([]);
                    setPurchasedScalingUpgrades([]);
                    setClickScaling(0);
                    setHeavenlySeventies(0);
                    setLifetimePrestigePoints(0);
                    setAscensionCount(0);
                    setHeavenlyUpgrades({});
                    setUnlockedAchievements([]);
                    setProductionMultiplier(1);

                    console.log('✅ All state reset complete');

                    // Use location.replace to force a complete reload
                    alert('🗑️ Save deleted! Page will hard reload...');
                    setTimeout(() => {
                      window.location.replace(window.location.href);
                    }, 100);
                  }
                }
              }}
            >
              🗑️ Hard Reset (Delete Everything)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixtySeven;
