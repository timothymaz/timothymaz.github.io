import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Contact from './pages/Contact/Contact';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const Terminal = lazy(() => import('./pages/Terminal/Terminal'));
const SecurityDemo = lazy(() => import('./pages/SecurityDemo/SecurityDemo'));
const Automotive = lazy(() => import('./pages/Automotive/Automotive'));
const SixtySeven = lazy(() => import('./pages/SecretPages/SixtySeven'));

const pageTransition = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(6px)' },
  transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] }
};

function AnimatedPage({ children }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/portfolio" element={<AnimatedPage><Portfolio /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/blog/:slug" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
        <Route path="/automotive" element={
          <AnimatedPage>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Automotive />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/terminal" element={
          <AnimatedPage>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Terminal />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="/security-demo" element={
          <AnimatedPage>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <SecurityDemo />
            </Suspense>
          </AnimatedPage>
        } />
        {/* Secret Easter Egg - No navigation link! */}
        <Route path="/67" element={
          <AnimatedPage>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <SixtySeven />
            </Suspense>
          </AnimatedPage>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .skill-card, .project-card, .contact-card');
      setIsHovering(!!target);
    };

    let animFrame;
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      animFrame = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    animFrame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <CustomCursor />
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;
