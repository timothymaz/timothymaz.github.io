import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import './SixtySeven.css';

const FACTS_ABOUT_67 = [
  "67 is a prime number",
  "67 is the atomic number of Holmium",
  "67 in binary is 1000011",
  "Route 67 crosses multiple US states",
  "67 is the sum of five consecutive primes",
  "In hex, 67 is 0x43",
  "67 degrees is a perfect temperature",
  "There are 67 moons in the solar system... wait, that's not true",
  "67 is the number of awesomeness",
  "You found the secret 67 page!",
  "67 backwards is 76, which is boring",
  "67 is the best number, fight me",
  "The year 67 AD was pretty cool probably",
  "67 is divisible by... 1 and 67. That's it.",
  "In Roman numerals: LXVII"
];

const ACHIEVEMENTS = {
  'first_visit': { title: 'Secret Found!', desc: 'You discovered the secret page', icon: '🔍' },
  'click_master': { title: 'Click Master', desc: 'Spawned 100 67s', icon: '🖱️' },
  'konami_legend': { title: 'Konami Legend', desc: 'Entered the Konami Code', icon: '🎮' },
  'time_traveler': { title: 'Time Traveler', desc: 'Spent 5 minutes here', icon: '⏰' },
  'explorer': { title: 'Explorer', desc: 'Tried all modes', icon: '🧭' },
  'disco_king': { title: 'Disco King', desc: 'Activated disco mode', icon: '🕺' },
  'matrix_fan': { title: 'Matrix Fan', desc: 'Activated 67 rain', icon: '🌧️' }
};

const SixtySeven = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const explosionNumbersRef = useRef([]);
  const rain67sRef = useRef([]);

  const [fps, setFps] = useState(60);
  const [particleCount, setParticleCount] = useState(0);
  const [visitTime, setVisitTime] = useState(0);
  const [spawned67s, setSpawned67s] = useState(0);
  const [currentFact, setCurrentFact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [shake, setShake] = useState(false);
  const [mode, setMode] = useState('normal');
  const [showControls, setShowControls] = useState(true);
  const [konami, setKonami] = useState([]);
  const [celebration, setCelebration] = useState(false);
  const [discoMode, setDiscoMode] = useState(false);
  const [rainMode, setRainMode] = useState(false);
  const [timeWarp, setTimeWarp] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [modesUsed, setModesUsed] = useState(new Set());

  const mouseRef = useRef({ x: 0, y: 0 });
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Achievement system
  const unlockAchievement = (id) => {
    const unlocked = JSON.parse(localStorage.getItem('achievements-67') || '{}');

    if (!unlocked[id]) {
      unlocked[id] = true;
      localStorage.setItem('achievements-67', JSON.stringify(unlocked));
      setAchievement(ACHIEVEMENTS[id]);

      setTimeout(() => setAchievement(null), 3000);
    }
  };

  // Track visit time
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitTime(prev => {
        const newTime = prev + 1;
        if (newTime === 300) {
          unlockAchievement('time_traveler');
        }
        return newTime;
      });
    }, 1000);

    const visits = parseInt(localStorage.getItem('67-visits') || '0') + 1;
    localStorage.setItem('67-visits', visits.toString());

    if (visits === 1) {
      setTimeout(() => unlockAchievement('first_visit'), 2000);
    }

    const factInterval = setInterval(() => {
      const randomFact = FACTS_ABOUT_67[Math.floor(Math.random() * FACTS_ABOUT_67.length)];
      setCurrentFact(randomFact);
      setShowFact(true);

      setTimeout(() => setShowFact(false), 4000);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(factInterval);
    };
  }, []);

  // FPS counter
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const countFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(frames);
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(countFPS);
    };

    countFPS();
  }, []);

  // Three.js Scene - PARTICLES ONLY (NO TEXT GEOMETRY)
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
      setParticleCount(count);

      return particles;
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
      const speed = timeWarp ? 0.2 : 1;
      time += 0.01 * speed;

      // Animate particles
      particlesRef.current.forEach(({ mesh, velocities }) => {
        mesh.rotation.y += 0.001 * speed;

        const positions = mesh.geometry.attributes.position.array;

        if (mode === 'gravity') {
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.02;

            if (positions[i + 1] < -50) {
              positions[i + 1] = 50;
            }
          }
        } else {
          for (let i = 0; i < positions.length; i += 3) {
            const idx = i / 3;
            positions[i] += velocities[idx].x * speed;
            positions[i + 1] += velocities[idx].y * speed;
            positions[i + 2] += velocities[idx].z * speed;

            if (Math.abs(positions[i]) > 50) velocities[idx].x *= -1;
            if (Math.abs(positions[i + 1]) > 50) velocities[idx].y *= -1;
            if (Math.abs(positions[i + 2]) > 50) velocities[idx].z *= -1;
          }
        }

        mesh.geometry.attributes.position.needsUpdate = true;
      });

      stars.rotation.y += 0.0005 * speed;

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
  }, [mode, timeWarp]);

  // Mouse movement handler with trail
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.className = 'trail-67';
        trail.textContent = '67';
        trail.style.left = event.clientX + 'px';
        trail.style.top = event.clientY + 'px';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click handler
  const handleClick = (event) => {
    const newSpawned = [];
    const count = 10;

    const wave = document.createElement('div');
    wave.className = 'pulse-wave';
    wave.style.left = event.clientX + 'px';
    wave.style.top = event.clientY + 'px';
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 1000);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const distance = 100 + Math.random() * 200;

      newSpawned.push({
        id: Date.now() + i,
        x: event.clientX,
        y: event.clientY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance
      });
    }

    explosionNumbersRef.current = [...explosionNumbersRef.current, ...newSpawned];
    setSpawned67s(prev => {
      const newCount = prev + count;
      if (newCount >= 100) {
        unlockAchievement('click_master');
      }
      return newCount;
    });

    setTimeout(() => {
      explosionNumbersRef.current = explosionNumbersRef.current.filter(
        n => !newSpawned.find(sn => sn.id === n.id)
      );
    }, 1000);
  };

  const handleDoubleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const toggle67Rain = () => {
    setRainMode(prev => {
      const newMode = !prev;

      if (newMode) {
        unlockAchievement('matrix_fan');
        const columns = Math.floor(window.innerWidth / 30);

        for (let i = 0; i < columns; i++) {
          const drop = document.createElement('div');
          drop.className = 'rain-67';
          drop.textContent = '67';
          drop.style.left = (i * 30) + 'px';
          drop.style.animationDelay = Math.random() * 2 + 's';
          drop.style.animationDuration = (Math.random() * 2 + 3) + 's';
          document.body.appendChild(drop);
          rain67sRef.current.push(drop);
        }
      } else {
        rain67sRef.current.forEach(drop => drop.remove());
        rain67sRef.current = [];
      }

      return newMode;
    });
  };

  const toggleDiscoMode = () => {
    setDiscoMode(prev => {
      if (!prev) {
        unlockAchievement('disco_king');
      }
      return !prev;
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      setKonami(prev => {
        const newKonami = [...prev, event.key];
        if (newKonami.length > konamiCode.length) {
          newKonami.shift();
        }

        if (newKonami.join(',') === konamiCode.join(',')) {
          ultimateCelebration();
          unlockAchievement('konami_legend');
          return [];
        }

        return newKonami;
      });

      const trackMode = (modeName) => {
        setModesUsed(prev => {
          const newSet = new Set(prev);
          newSet.add(modeName);
          if (newSet.size >= 5) {
            unlockAchievement('explorer');
          }
          return newSet;
        });
      };

      switch(key) {
        case 'g':
          setMode(prev => prev === 'gravity' ? 'normal' : 'gravity');
          trackMode('gravity');
          break;
        case 'e':
          setMode(prev => prev === 'explosion' ? 'normal' : 'explosion');
          trackMode('explosion');
          break;
        case 'r':
          trackMode('random');
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggle67Rain();
          trackMode('rain');
          break;
        case 'd':
          toggleDiscoMode();
          trackMode('disco');
          break;
        case 't':
          setTimeWarp(prev => !prev);
          trackMode('timewarp');
          break;
        case ' ':
          event.preventDefault();
          fireworks();
          break;
        case 'escape':
          setShowControls(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const fireworks = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let burst = 0; burst < 5; burst++) {
      setTimeout(() => {
        handleClick({
          clientX: centerX + (Math.random() - 0.5) * 400,
          clientY: centerY + (Math.random() - 0.5) * 400
        });
      }, burst * 200);
    }
  };

  const ultimateCelebration = () => {
    setCelebration(true);
    setMode('explosion');
    setDiscoMode(true);

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        handleClick({
          clientX: Math.random() * window.innerWidth,
          clientY: Math.random() * window.innerHeight
        });
      }, i * 100);
    }

    setTimeout(() => {
      setCelebration(false);
      setMode('normal');
      setDiscoMode(false);
    }, 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`sixtyseven-page ${shake ? 'shake' : ''} ${celebration ? 'celebration' : ''} ${discoMode ? 'disco-mode' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={mountRef}
    >
      {/* GIANT CSS 67 - GUARANTEED VISIBLE! */}
      <motion.div
        className={`giant-67 ${mode} ${timeWarp ? 'timewarp' : ''}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10 }}
      >
        67
      </motion.div>

      {/* Stats Overlay */}
      <motion.div
        className="stats-overlay"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div>FPS: {fps}</div>
        <div>Particles: {particleCount.toLocaleString()}</div>
        <div>Time: {formatTime(visitTime)}</div>
        <div>67s Spawned: {spawned67s}</div>
        <div>Visitors: #{localStorage.getItem('67-visits')}</div>
        <div>Mode: {mode.toUpperCase()}</div>
        {timeWarp && <div className="time-warp-indicator">⏱️ TIME WARP</div>}
        {rainMode && <div className="rain-indicator">🌧️ 67 RAIN</div>}
        {discoMode && <div className="disco-indicator">🕺 DISCO MODE</div>}
      </motion.div>

      {/* Controls Hint */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="controls-hint"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="control-title">┌─ SECRET CONTROLS ─┐</div>
            <div className="control-item">CLICK - Spawn 67</div>
            <div className="control-item">DBLCLICK - Shake</div>
            <div className="control-item">SPACE - Fireworks</div>
            <div className="control-item">G - Gravity</div>
            <div className="control-item">E - Explosion</div>
            <div className="control-item">M - Matrix Rain</div>
            <div className="control-item">D - Disco Mode</div>
            <div className="control-item">T - Time Warp</div>
            <div className="control-item">F - Fullscreen</div>
            <div className="control-item">ESC - Hide/Show</div>
            <div className="control-secret">↑↑↓↓←→←→BA</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fact Cards */}
      <AnimatePresence>
        {showFact && (
          <motion.div
            className="fact-card"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: [0, -20, 0]
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ duration: 0.5 }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            {currentFact}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {achievement && (
          <motion.div
            className="achievement-popup"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-text">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-desc">{achievement.desc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion 67s */}
      {explosionNumbersRef.current.map(num => (
        <div
          key={num.id}
          className="explosion-67"
          style={{
            left: num.x,
            top: num.y,
            '--tx': `${num.tx}px`,
            '--ty': `${num.ty}px`
          }}
        >
          67
        </div>
      ))}

      {/* Celebration overlay */}
      {celebration && (
        <motion.div
          className="celebration-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="celebration-text"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            67!!! 🎉
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SixtySeven;
