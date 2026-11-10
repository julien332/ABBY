import React, { useEffect } from 'react';

// @ts-ignore
import bgVideo from '../assets/abbyshort.mp4';
// @ts-ignore
import logoAbbyWhite from '../assets/Logo_Abby_White.svg';

interface HomeViewProps {
  navigate?: (path: string) => void;
  onOpenContact?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = () => {
  useEffect(() => {
    const video = document.getElementById('abby-bg-video') as HTMLVideoElement | null;
    if (!video) return;

    // Configuration stricte requise par le moteur WebKit (iOS Safari)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Force WebKit à initialiser l'algorithme de sélection des sources
    try {
      video.load();
    } catch {}

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('canplaythrough', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        tryPlay();
      }
    };
    const handlePageShow = () => {
      if (video.paused) {
        tryPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    // Déverrouillage tactile inconditionnel sur mobile / iPhone
    const handleInteraction = () => {
      if (video.paused) {
        tryPlay();
      }
    };
    ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { passive: true });
    });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('canplaythrough', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
      });
    };
  }, []);

  return (
    <main
      className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-black select-none"
      id="main-content"
    >
      {/* Fond vidéo plein écran ralenti */}
      <div
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
        dangerouslySetInnerHTML={{
          __html: `
            <video
              id="abby-bg-video"
              poster="/video-poster.jpg"
              autoplay
              loop
              muted
              playsinline
              webkit-playsinline
              x5-playsinline
              preload="auto"
              class="w-full h-full object-cover object-center scale-100 sm:scale-102 transition-transform duration-1000 ease-out"
              style="-webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); will-change: transform;"
            >
              <source src="/video-bg.mp4" type="video/mp4" />
              <source src="${bgVideo}" type="video/mp4" />
            </video>
            <div class="absolute inset-0 bg-black/45 pointer-events-none"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>
          `
        }}
      />

      {/* Contenu 100vh sans scroll */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-4 sm:px-8 py-6 md:py-8 pointer-events-none">
        
        {/* Dégagement pour la barre de navigation */}
        <div className="w-full h-16 sm:h-20" aria-hidden="true" />

        {/* Texte central, motif & bouton de réservation */}
        <div className="w-full max-w-3xl mx-auto px-4 text-center my-auto flex flex-col items-center pointer-events-auto">
          <div className="mb-4 sm:mb-5 opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <svg
              width="44"
              height="28"
              viewBox="0 0 44 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-9 sm:w-11 h-auto"
              aria-hidden="true"
            >
              <circle cx="22" cy="14" r="2.5" fill="currentColor" />
              <path
                d="M16 14 C12 6, 4 6, 2 14 C4 22, 12 22, 16 14 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M28 14 C32 6, 40 6, 42 14 C40 22, 32 22, 28 14 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.75" />
              <circle cx="22" cy="24" r="1.5" fill="currentColor" opacity="0.75" />
            </svg>
          </div>

          <h1 className="font-serif text-white text-sm sm:text-base md:text-lg lg:text-[21px] leading-[1.38] sm:leading-[1.42] tracking-[0.06em] uppercase text-balance max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Pâtes fraîches pétries et façonnées sur place chaque matin.<br />
            Produits d'exception, sauces explosives et recettes de saison.<br />
            Les meilleures pâtes de Paris.
          </h1>

          {/* Bouton Réserver */}
          <a
            href="https://module.zenchef.com/fr/restaurant/abby-paris"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 sm:mt-7 px-8 py-3 rounded-full bg-transparent border border-white/60 text-white font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase transition-all duration-300 hover:border-[#966EA3] hover:text-white hover:bg-[#966EA3]/20 active:bg-[#966EA3] active:border-[#966EA3] active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.5)] active:shadow-[0_0_20px_rgba(150,110,163,0.6)] cursor-pointer pointer-events-auto backdrop-blur-sm"
          >
            Réserver une table
          </a>
        </div>

        {/* Footer avec logo officiel, filets et adresse */}
        <footer className="w-full flex flex-col items-center justify-end pb-3 sm:pb-5 text-center pointer-events-auto">
          <div className="w-full flex justify-center mb-2">
            <img
              src={logoAbbyWhite}
              alt="Logo ABBY"
              className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[80vw] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-md px-4">
            <div className="h-[1px] bg-white/40 flex-1 hidden sm:block" />
            <p className="font-sans font-light text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] whitespace-nowrap">
              36 RUE CONDORCET, 75009 PARIS
            </p>
            <div className="h-[1px] bg-white/40 flex-1 hidden sm:block" />
          </div>
        </footer>

      </div>
    </main>
  );
};

export default HomeView;