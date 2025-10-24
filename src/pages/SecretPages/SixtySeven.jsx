import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './SixtySeven.css';

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

const SixtySeven = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const lastSaveRef = useRef(Date.now());
  const offlineEarningsRef = useRef(0);

  // Core game state - load from localStorage on first render
  const [sixtySevenCount, setSixtySevenCount] = useState(() => {
    const saved = localStorage.getItem('67-clicker-save');
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        console.log('Loading save:', gameState);

        // Calculate offline earnings
        const timeAway = Date.now() - (gameState.lastSave || Date.now());
        const secondsAway = Math.floor(timeAway / 1000);

        let offlinePerSecond = 0;
        Object.keys(BUILDINGS).forEach(key => {
          const building = BUILDINGS[key];
          const owned = gameState.buildings?.[key] || 0;
          offlinePerSecond += building.baseProduction * owned;
        });

        const offlineEarnings = offlinePerSecond * secondsAway;
        offlineEarningsRef.current = offlineEarnings;

        return gameState.sixtySevenCount + offlineEarnings;
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
    return 0;
  });

  const [totalSixtySevensMade, setTotalSixtySevensMade] = useState(() => {
    const saved = localStorage.getItem('67-clicker-save');
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        const timeAway = Date.now() - (gameState.lastSave || Date.now());
        const secondsAway = Math.floor(timeAway / 1000);

        let offlinePerSecond = 0;
        Object.keys(BUILDINGS).forEach(key => {
          const building = BUILDINGS[key];
          const owned = gameState.buildings?.[key] || 0;
          offlinePerSecond += building.baseProduction * owned;
        });

        const offlineEarnings = offlinePerSecond * secondsAway;
        return gameState.totalSixtySevensMade + offlineEarnings;
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
    return 0;
  });

  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);

  const [buildings, setBuildings] = useState(() => {
    const saved = localStorage.getItem('67-clicker-save');
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        console.log('Loading buildings:', gameState.buildings);
        return gameState.buildings || {
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
    const saved = localStorage.getItem('67-clicker-save');
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        return gameState.purchasedClickUpgrades || [];
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

  // Format large numbers
  const formatNumber = (num) => {
    if (num < 1000) return Math.floor(num).toLocaleString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
  };

  // Calculate building cost
  const getBuildingCost = (buildingKey) => {
    const building = BUILDINGS[buildingKey];
    const owned = buildings[buildingKey];
    return Math.floor(building.baseCost * Math.pow(building.costMultiplier, owned));
  };

  // Calculate total per second
  const calculatePerSecond = () => {
    let total = 0;
    Object.keys(BUILDINGS).forEach(key => {
      const building = BUILDINGS[key];
      const owned = buildings[key];
      total += building.baseProduction * owned;
    });
    return total;
  };

  // Update per second when buildings change
  useEffect(() => {
    setPerSecond(calculatePerSecond());
  }, [buildings]);

  // Update per click when upgrades change
  useEffect(() => {
    const totalClickPower = 1 + purchasedClickUpgrades.reduce((sum, upgradeId) => {
      const upgrade = CLICK_UPGRADES.find(u => u.id === upgradeId);
      return sum + (upgrade?.power || 0);
    }, 0);
    setPerClick(totalClickPower);
  }, [purchasedClickUpgrades]);

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

  // Big 67 click handler
  const handleBigClick = (event) => {
    const clickX = event?.clientX || window.innerWidth * 0.35;
    const clickY = event?.clientY || window.innerHeight / 2;

    // Add to count
    setSixtySevenCount(prev => prev + perClick);
    setTotalSixtySevensMade(prev => prev + perClick);

    // Show floating +X
    showFloatingText(`+${formatNumber(perClick)}`, 'click', clickX, clickY);

    // Click animation
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 100);

    // Pulse wave effect
    const wave = document.createElement('div');
    wave.className = 'pulse-wave';
    wave.style.left = clickX + 'px';
    wave.style.top = clickY + 'px';
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 1000);
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

    // Remove the golden 67
    setGoldenSixtySeven(null);

    // Apply 50x multiplier for 5 seconds
    setProductionMultiplier(50);

    // Show notification
    showFloatingText('50x PRODUCTION!', 'golden');

    // Clear existing timer if any
    if (multiplierTimerRef.current) {
      clearTimeout(multiplierTimerRef.current);
    }

    // Remove multiplier after 5 seconds
    multiplierTimerRef.current = setTimeout(() => {
      setProductionMultiplier(1);
      showFloatingText('Bonus ended', 'building');
    }, 5000);
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

  // Auto-save system
  useEffect(() => {
    const saveGame = () => {
      const gameState = {
        sixtySevenCount,
        totalSixtySevensMade,
        buildings,
        purchasedClickUpgrades,
        lastSave: Date.now()
      };
      localStorage.setItem('67-clicker-save', JSON.stringify(gameState));
      lastSaveRef.current = Date.now();
      console.log('Game saved:', gameState);
    };

    const interval = setInterval(saveGame, 5000); // Auto-save every 5 seconds

    // Save immediately on buildings change
    if (Object.values(buildings).some(count => count > 0) || purchasedClickUpgrades.length > 0) {
      saveGame();
    }

    // Save on unmount (when component is about to be destroyed)
    return () => {
      clearInterval(interval);
      saveGame(); // Final save before unmount
      console.log('Saving on unmount');
    };
  }, [sixtySevenCount, totalSixtySevensMade, buildings, purchasedClickUpgrades]);

  // Show offline earnings notification on mount
  useEffect(() => {
    if (offlineEarningsRef.current > 0) {
      setTimeout(() => {
        showFloatingText(`+${formatNumber(offlineEarningsRef.current)} offline!`, 'building');
      }, 1000);
    }
  }, []);

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

  return (
    <div className="sixtyseven-page clicker-mode" ref={mountRef}>
      {/* Big Clickable 67 */}
      <div
        className={`big-67 ${clickAnimation ? 'clicked' : ''}`}
        onClick={handleBigClick}
      >
        67
        <div className="big-67-shadow">67</div>
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
      </div>

      {/* Upgrade Shop */}
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

        {/* Buildings Section */}
        <div className="shop-section">
          <div className="shop-section-title">Buildings</div>
          <div className="shop-buildings">
            {Object.keys(BUILDINGS).map(key => {
            const building = BUILDINGS[key];
            const cost = getBuildingCost(key);
            const owned = buildings[key];
            const canAfford = sixtySevenCount >= cost;

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
                  <div className="building-production">
                    Produces {formatNumber(building.baseProduction)}/sec
                  </div>
                </div>
                <div className="building-purchase">
                  <div className="building-cost">
                    {formatNumber(cost)}
                  </div>
                  <div className="building-owned">{owned}</div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default SixtySeven;
