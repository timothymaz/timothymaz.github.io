import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Contact from './pages/Contact/Contact';
import Terminal from './pages/Terminal/Terminal';
import SecurityDemo from './pages/SecurityDemo/SecurityDemo';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terminal" element={<Terminal />} />
              <Route path="/security-demo" element={<SecurityDemo />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
