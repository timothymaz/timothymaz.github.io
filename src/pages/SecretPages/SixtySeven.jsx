import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
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

const SixtySeven = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const textMeshRef = useRef(null);
  const particlesRef = useRef([]);
  const explosionNumbersRef = useRef([]);

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

  const mouseRef = useRef({ x: 0, y: 0 });
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Track visit time
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitTime(prev => prev + 1);
    }, 1000);

    // Increment visit counter
    const visits = parseInt(localStorage.getItem('67-visits') || '0') + 1;
    localStorage.setItem('67-visits', visits.toString());

    // Random facts
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

  // Three.js Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create 3D Text "67"
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('67', {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelOffset: 0,
        bevelSegments: 5
      });

      textGeometry.center();

      const textMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        shininess: 100,
        specular: 0xffffff
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);
      textMeshRef.current = textMesh;
    });

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
        size: 0.1,
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
      time += 0.01;

      // Animate text
      if (textMeshRef.current) {
        const text = textMeshRef.current;

        if (mode === 'normal') {
          text.rotation.x += 0.005;
          text.rotation.y += 0.01;
          text.position.y = Math.sin(time) * 2;

          // Color cycle
          const hue = (time * 0.1) % 1;
          text.material.color.setHSL(hue, 1, 0.5);
          text.material.emissive.setHSL(hue, 1, 0.3);

          // Mouse tracking
          text.rotation.y += mouseRef.current.x * 0.01;
          text.rotation.x += mouseRef.current.y * 0.01;
        } else if (mode === 'gravity') {
          text.position.y -= 0.1;
          text.rotation.z += 0.05;

          if (text.position.y < -20) {
            text.position.y = 10;
          }
        } else if (mode === 'explosion') {
          text.rotation.x += 0.1;
          text.rotation.y += 0.1;
          text.rotation.z += 0.1;
          text.scale.x = 1 + Math.sin(time * 5) * 0.3;
          text.scale.y = 1 + Math.sin(time * 5) * 0.3;
          text.scale.z = 1 + Math.sin(time * 5) * 0.3;
        }
      }

      // Animate particles
      particlesRef.current.forEach(({ mesh, velocities }) => {
        mesh.rotation.y += 0.001;

        const positions = mesh.geometry.attributes.position.array;

        if (mode === 'gravity') {
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.02; // Gravity

            if (positions[i + 1] < -50) {
              positions[i + 1] = 50;
            }
          }
        } else {
          for (let i = 0; i < positions.length; i += 3) {
            const idx = i / 3;
            positions[i] += velocities[idx].x;
            positions[i + 1] += velocities[idx].y;
            positions[i + 2] += velocities[idx].z;

            // Boundary check
            if (Math.abs(positions[i]) > 50) velocities[idx].x *= -1;
            if (Math.abs(positions[i + 1]) > 50) velocities[idx].y *= -1;
            if (Math.abs(positions[i + 2]) > 50) velocities[idx].z *= -1;
          }
        }

        mesh.geometry.attributes.position.needsUpdate = true;
      });

      // Animate stars
      stars.rotation.y += 0.0005;

      // Pulse lights
      pointLight1.intensity = 2 + Math.sin(time * 2) * 0.5;
      pointLight2.intensity = 2 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode]);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click handler - spawn explosion of 67s
  const handleClick = (event) => {
    const newSpawned = [];
    const count = 10;

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

    setExplosionNumbersRef(prev => [...prev, ...newSpawned]);
    setSpawned67s(prev => prev + count);

    setTimeout(() => {
      setExplosionNumbersRef(prev =>
        prev.filter(n => !newSpawned.find(sn => sn.id === n.id))
      );
    }, 1000);
  };

  const setExplosionNumbersRef = (updater) => {
    explosionNumbersRef.current = typeof updater === 'function'
      ? updater(explosionNumbersRef.current)
      : updater;
  };

  // Double click - screen shake
  const handleDoubleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      // Konami code check
      setKonami(prev => {
        const newKonami = [...prev, event.key];
        if (newKonami.length > konamiCode.length) {
          newKonami.shift();
        }

        if (newKonami.join(',') === konamiCode.join(',')) {
          ultimateCelebration();
          return [];
        }

        return newKonami;
      });

      switch(key) {
        case 'g':
          setMode(prev => prev === 'gravity' ? 'normal' : 'gravity');
          break;
        case 'e':
          setMode(prev => prev === 'explosion' ? 'normal' : 'explosion');
          break;
        case 'r':
          randomizeColors();
          break;
        case 'f':
          toggleFullscreen();
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

  const randomizeColors = () => {
    if (textMeshRef.current) {
      const randomHue = Math.random();
      textMeshRef.current.material.color.setHSL(randomHue, 1, 0.5);
      textMeshRef.current.material.emissive.setHSL(randomHue, 1, 0.3);
    }
  };

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

    // Massive fireworks
    for (let i = 0; i < 20; i++) {
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
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`sixtyseven-page ${shake ? 'shake' : ''} ${celebration ? 'celebration' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={mountRef}
    >
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
            <div className="control-title">SECRET PAGE CONTROLS</div>
            <div className="control-item">CLICK - Spawn 67</div>
            <div className="control-item">DOUBLE CLICK - Screen Shake</div>
            <div className="control-item">SPACEBAR - Fireworks</div>
            <div className="control-item">G - Gravity Mode</div>
            <div className="control-item">E - Explosion Mode</div>
            <div className="control-item">R - Random Colors</div>
            <div className="control-item">F - Fullscreen</div>
            <div className="control-item">ESC - Hide Controls</div>
            <div className="control-secret">Try the Konami Code... ↑↑↓↓←→←→BA</div>
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
