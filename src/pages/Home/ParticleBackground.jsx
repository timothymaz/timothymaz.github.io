import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = ({ theme }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const color = useMemo(() => {
    if (theme === 'cyber') return '#00ff41';
    if (theme === 'dark') return '#00d4aa';
    return '#718096';
  }, [theme]);

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 35,
        density: { enable: true, area: 1000 }
      },
      color: { value: color },
      links: {
        enable: true,
        color: color,
        distance: 150,
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: 'none',
        outModes: { default: 'bounce' }
      },
      opacity: { value: { min: 0.1, max: 0.4 } },
      size: { value: { min: 1, max: 2.5 } }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' }
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.4 } }
      }
    },
    detectRetina: true
  }), [color]);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      className="hero-particles"
      options={options}
    />
  );
};

export default ParticleBackground;
