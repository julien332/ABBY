import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { MenuView } from './components/MenuView';
import { ContactModal } from './components/ContactModal';
import { AdminView } from './components/AdminView';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (['/a-propos', '/about'].includes(path)) return '/a-propos';
      if (['/menu', '/carte'].includes(path)) return '/menu';
      if (['/contact'].includes(path)) return '/contact';
      return '/';
    }
    return '/';
  });

  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Détection secrète de l'accès administrateur via le hash (#admin)
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin';
    }
    return false;
  });

  // Synchronisation de l'URL pour l'administration (#admin)
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setIsAdminOpen(false);
  };

  // Synchronize route with HTML5 History API for SEO / Sitelinks
  const navigate = (path: string) => {
    if (path === '/contact') {
      setContactModalOpen(true);
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title for SEO
    if (path === '/a-propos') {
      document.title = "À propos de Geoffroy & Jacques — ABBY Paris (Le temple des pâtes)";
    } else if (path === '/menu') {
      document.title = "Grimoire des Délices — Menu du Restaurant ABBY Paris 18e";
    } else {
      document.title = "ABBY — Restaurant de Pâtes Fraîches à Paris (Paris 18e)";
    }
  };

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (['/a-propos', '/about'].includes(path)) {
        setCurrentPath('/a-propos');
      } else if (['/menu', '/carte'].includes(path)) {
        setCurrentPath('/menu');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#2E2E2E] text-[#D9D9D9] flex flex-col font-body selection:bg-[#966EA3] selection:text-white md:cursor-none">
      {/* CURSEUR PERSONNALISÉ PENNE */}
      <CustomCursor />

      {/* SEMANTIC HEADER & NAVBAR (3 SECTIONS) */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* MAIN VIEW CONTAINER WITH FLUID TRANSITION */}
      <div className="flex-1 w-full">
        {currentPath === '/' && (
          <HomeView
            navigate={navigate}
            onOpenContact={() => setContactModalOpen(true)}
          />
        )}

        {currentPath === '/a-propos' && (
          <AboutView navigate={navigate} />
        )}

        {currentPath === '/menu' && (
          <MenuView
            navigate={navigate}
            onOpenContact={() => setContactModalOpen(true)}
          />
        )}
      </div>

      {/* CONTACT & LOCAL GEO MODAL */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* ACCÈS SECRET ADMIN (#admin) */}
      {isAdminOpen && (
        <AdminView onClose={handleCloseAdmin} />
      )}
    </div>
  );
}
