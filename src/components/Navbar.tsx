import React, { useState } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import svgChar1 from '../assets/1.svg';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDancing, setIsDancing] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  const ZENCHEF_URL = 'https://module.zenchef.com/fr/restaurant/abby-paris';
  const INSTAGRAM_URL = 'https://www.instagram.com/abbypastaparis/';

  return (
    <>
      {/* Animation de danse : rotation 360° et métamorphose de couleur (Blanc -> Lilas -> Blood Moon) */}
      <style>{`
        @keyframes pastaSpinDance {
          0% {
            transform: rotate(0deg) scale(1);
            filter: brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.8));
          }
          25% {
            transform: rotate(90deg) scale(1.18);
            filter: drop-shadow(0 0 12px #966EA3) invert(56%) sepia(34%) saturate(600%) hue-rotate(240deg);
          }
          50% {
            transform: rotate(180deg) scale(1.28);
            filter: drop-shadow(0 0 16px #FA6755) invert(58%) sepia(80%) saturate(1600%) hue-rotate(325deg);
          }
          75% {
            transform: rotate(270deg) scale(1.18);
            filter: drop-shadow(0 0 12px #966EA3) invert(56%) sepia(34%) saturate(600%) hue-rotate(240deg);
          }
          100% {
            transform: rotate(360deg) scale(1);
            filter: brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.8));
          }
        }
        .animate-pasta-spin {
          animation: pastaSpinDance 0.85s infinite ease-in-out !important;
        }
      `}</style>

      {/* NAVBAR FIXE */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full select-none px-6 sm:px-10 lg:px-12 py-4 sm:py-5">
        <div className="w-full flex items-center justify-between text-white font-sans text-xs lg:text-[13px] tracking-[0.08em] font-semibold uppercase">
          
          {/* SECTION GAUCHE : LIENS */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-start drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <a
              href="/a-propos"
              onClick={(e) => handleLinkClick(e, '/a-propos')}
              className={`transition-opacity duration-200 hover:opacity-70 ${
                currentPath === '/a-propos' ? 'opacity-100 underline underline-offset-4' : 'opacity-90'
              }`}
            >
              ABOUT
            </a>

            <a
              href="/menu"
              onClick={(e) => handleLinkClick(e, '/menu')}
              className={`transition-opacity duration-200 hover:opacity-70 ${
                currentPath === '/menu' ? 'opacity-100 underline underline-offset-4' : 'opacity-90'
              }`}
            >
              MENU
            </a>

            <a
              href={ZENCHEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-70 transition-opacity whitespace-nowrap"
              title="Réserver une table sur Zenchef"
            >
              BOOK A TABLE
            </a>

          </nav>

          {/* SECTION MILIEU : LE PERSONNAGE QUI DANSE (REMPLACE LE LOGO) */}
          <div className="flex-1 md:flex-initial flex justify-start md:justify-center items-center">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              onMouseEnter={() => setIsDancing(true)}
              onMouseLeave={() => setIsDancing(false)}
              onTouchStart={() => setIsDancing(!isDancing)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              aria-label="Accueil ABBY"
              title="Rituel des pâtes"
            >
              <img
                src={svgChar1}
                alt="Personnage rituel ABBY"
                className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 ${
                  isDancing ? 'animate-pasta-spin' : 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] group-hover:animate-pasta-spin'
                }`}
              />
            </a>
          </div>

          {/* SECTION DROITE : CONTACT & INSTAGRAM */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-end drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <button
              type="button"
              onClick={onOpenContact}
              className="opacity-90 hover:opacity-70 transition-opacity cursor-pointer uppercase"
            >
              CONTACT
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-70 transition-opacity flex items-center"
              aria-label="Instagram @abbypastaparis"
            >
              <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          </div>

          {/* BOUTON MOBILE */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={ZENCHEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-wider uppercase border border-white/50 px-3 py-1 rounded bg-black/30 backdrop-blur-sm"
            >
              RÉSERVER
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MENU TIROIR MOBILE */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1e1e1e]/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 text-white animate-fadeIn">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <img
              src={svgChar1}
              alt="Personnage rituel ABBY"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-6 font-sans text-sm tracking-[0.15em] uppercase font-semibold">
            <a
              href="/a-propos"
              onClick={(e) => handleLinkClick(e, '/a-propos')}
              className={`py-1 ${currentPath === '/a-propos' ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              ABOUT
            </a>

            <a
              href="/menu"
              onClick={(e) => handleLinkClick(e, '/menu')}
              className={`py-1 ${currentPath === '/menu' ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              MENU
            </a>

            <a
              href={ZENCHEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-white/70 hover:text-white"
            >
              BOOK A TABLE
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="py-1 text-left text-white/70 hover:text-white uppercase cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4 text-xs font-sans tracking-widest text-white/60">
            <div className="flex items-center justify-between">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-white/80"
              >
                <Instagram className="w-4 h-4" />
                <span>@abbypastaparis</span>
              </a>
            </div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50">
              36 RUE CONDORCET, 75009 PARIS
            </p>
          </div>
        </div>
      )}
    </>
  );
};