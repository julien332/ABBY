import React, { useEffect } from 'react';
import { Clock, MapPin, Navigation, Calendar, ArrowUp } from 'lucide-react';

// @ts-ignore
import bgVideo from '../assets/abbyshort.mp4';
// @ts-ignore
import logoAbbyWhite from '../assets/Logo_Abby_White.svg';

interface HomeViewProps {
  navigate?: (path: string) => void;
  onOpenContact?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenContact }) => {
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

  const scrollToHoursAndMap = () => {
    const target = document.getElementById('section-hours-map');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    const target = document.getElementById('section-hero');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ZENCHEF_URL = 'https://module.zenchef.com/fr/restaurant/abby-paris';
  const MAPS_DIR_URL = 'https://www.google.com/maps/dir/?api=1&destination=ABBY+36+Rue+Condorcet+75009+Paris';

  // Calcul du statut en temps réel selon le fuseau de Paris (Europe/Paris) comme sur Google Maps
  const getGoogleMapsStatus = () => {
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).formatToParts(now);

      const weekday = (parts.find((p) => p.type === 'weekday')?.value || '').toLowerCase();
      const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
      const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
      const totalMinutes = hour * 60 + minute;

      // Lundi = fermé toute la journée
      if (weekday.startsWith('lun')) {
        return { isOpen: false, text: 'Fermé ⋅ Ouvre mardi à 12:00' };
      }

      // Mardi à Dimanche :
      // Service midi : 12:00 (720 min) à 14:30 (870 min)
      // Service soir : 19:30 (1170 min) à 23:00 (1380 min)
      if (totalMinutes < 720) {
        return { isOpen: false, text: 'Fermé ⋅ Ouvre à 12:00' };
      }
      if (totalMinutes >= 720 && totalMinutes < 870) {
        return { isOpen: true, text: 'Ouvert ⋅ Ferme à 14:30' };
      }
      if (totalMinutes >= 870 && totalMinutes < 1170) {
        return { isOpen: false, text: 'Fermé ⋅ Ouvre à 19:30' };
      }
      if (totalMinutes >= 1170 && totalMinutes < 1380) {
        return { isOpen: true, text: 'Ouvert ⋅ Ferme à 23:00' };
      }
      // Après 23:00
      if (weekday.startsWith('dim')) {
        return { isOpen: false, text: 'Fermé ⋅ Ouvre mardi à 12:00' };
      }
      return { isOpen: false, text: 'Fermé ⋅ Ouvre demain à 12:00' };
    } catch {
      return { isOpen: true, text: 'Ouvert ⋅ Ferme à 23:00' };
    }
  };

  const statusInfo = getGoogleMapsStatus();
  const currentDayIndex = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi

  const SCHEDULE_DAYS = [
    { day: 'Lundi', hours: 'Fermé', dayIndex: 1 },
    { day: 'Mardi', hours: '12:00–14:30, 19:30–23:00', dayIndex: 2 },
    { day: 'Mercredi', hours: '12:00–14:30, 19:30–23:00', dayIndex: 3 },
    { day: 'Jeudi', hours: '12:00–14:30, 19:30–23:00', dayIndex: 4 },
    { day: 'Vendredi', hours: '12:00–14:30, 19:30–23:00', dayIndex: 5 },
    { day: 'Samedi', hours: '12:00–14:30, 19:30–23:00', dayIndex: 6 },
    { day: 'Dimanche', hours: '12:00–14:30, 19:30–23:00', dayIndex: 0 },
  ];

  return (
    <>
      {/* Styles de l'animation de défilement épurée */}
      <style>{`
        @keyframes scrollLineTravel {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
        .animate-scroll-line {
          animation: scrollLineTravel 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Fond vidéo plein écran ralenti persistant */}
      <div
        className="fixed inset-0 w-full h-[100dvh] z-0 overflow-hidden pointer-events-none"
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
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none"></div>
          `
        }}
      />

      {/* Conteneur principal avec Scroll Snap direct 2026 */}
      <main
        id="main-home-container"
        className="relative z-10 w-full h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth select-none focus:outline-none overscroll-y-contain"
        tabIndex={-1}
      >
        {/* ============================================================ */}
        {/* SECTION 1 : HERO PRINCIPAL (100dvh snap-start) */}
        {/* ============================================================ */}
        <section
          id="section-hero"
          className="relative w-full h-[100dvh] min-h-[100dvh] snap-start snap-always flex flex-col justify-between items-center px-4 sm:px-8 py-5 md:py-7 pointer-events-none"
        >
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
              href={ZENCHEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 sm:mt-7 px-8 py-3 rounded-full bg-transparent border border-white/60 text-white font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase transition-all duration-300 hover:border-[#966EA3] hover:text-white hover:bg-[#966EA3]/20 active:bg-[#966EA3] active:border-[#966EA3] active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.5)] active:shadow-[0_0_20px_rgba(150,110,163,0.6)] cursor-pointer pointer-events-auto backdrop-blur-sm"
            >
              Réserver une table
            </a>
          </div>

          {/* Footer Hero avec Logo officiel & Indicateur épuré */}
          <footer className="w-full flex flex-col items-center justify-end pb-1 sm:pb-2 text-center pointer-events-auto">
            <div className="w-full flex justify-center mb-1.5">
              <img
                src={logoAbbyWhite}
                alt="Logo ABBY"
                className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[75vw] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-md px-4 mb-2">
              <div className="h-[1px] bg-white/40 flex-1 hidden sm:block" />
              <p className="font-sans font-light text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] whitespace-nowrap">
                36 RUE CONDORCET, 75009 PARIS
              </p>
              <div className="h-[1px] bg-white/40 flex-1 hidden sm:block" />
            </div>

            {/* INDICATEUR ÉPURÉ : SANS CADRE, SANS BOUTON CLIGNOTANT, SANS FLÈCHE */}
            <button
              type="button"
              onClick={scrollToHoursAndMap}
              className="group flex flex-col items-center justify-center gap-1.5 mt-1 text-white/75 hover:text-white transition-all cursor-pointer pointer-events-auto select-none focus:outline-none"
              aria-label="Faire défiler vers les horaires d'ouverture et le plan d'accès"
            >
              <span className="font-sans font-light text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/80 group-hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] transition-colors">
                Horaires &amp; Plan
              </span>
              <div className="relative w-[1px] h-5 sm:h-6 bg-white/25 overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent animate-scroll-line" />
              </div>
            </button>
          </footer>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2 : HORAIRES (GOOGLE MAPS) & CARTE INTERACTIVE */}
        {/* ============================================================ */}
        <section
          id="section-hours-map"
          className="relative z-20 w-full min-h-[100dvh] snap-start snap-always flex flex-col justify-between items-center px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-6 bg-[#161616]/96 backdrop-blur-2xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] text-white"
        >
          {/* Header de la section sans couleur vive */}
          <div className="w-full max-w-6xl mx-auto text-center mb-4 sm:mb-6">
            <h2 className="font-sans font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.14em] uppercase text-white drop-shadow-md">
              HORAIRES &amp; ACCÈS
            </h2>
            <p className="mt-1 font-serif text-[#D9D9D9]/75 text-xs sm:text-sm tracking-wide">
              36 Rue Condorcet, 75009 Paris · Façonné chaque matin sous vos yeux
            </p>
          </div>

          {/* Grille principale : Horaires style Google Maps (Gauche) & Carte Interactive (Droite) */}
          <div className="w-full max-w-6xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch my-auto">
            
            {/* CARTE 1 : HORAIRES EXACTS STYLE GOOGLE MAPS (MONOCHROME & NEUTRE) */}
            <div className="lg:col-span-5 bg-[#202020]/90 border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div>
                {/* En-tête Google Maps */}
                <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-white/10">
                  <Clock className="w-4 h-4 text-white/80 shrink-0" />
                  <h3 className="font-sans font-bold text-sm sm:text-base tracking-[0.16em] uppercase text-white">
                    Horaires d'ouverture
                  </h3>
                </div>

                {/* Statut dynamique Google Maps (ex: Ouvert ⋅ Ferme à 14:30) */}
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      statusInfo.isOpen ? 'bg-emerald-400' : 'bg-white/40'
                    }`}
                  />
                  <span
                    className={`font-sans text-xs sm:text-[13px] tracking-wide ${
                      statusInfo.isOpen ? 'text-emerald-400 font-semibold' : 'text-white/80'
                    }`}
                  >
                    {statusInfo.text}
                  </span>
                </div>

                {/* Liste des 7 jours style Google Maps (sans orange ni violet) */}
                <div className="space-y-1 text-xs sm:text-[13px] font-sans">
                  {SCHEDULE_DAYS.map((item) => {
                    const isToday = currentDayIndex === item.dayIndex;
                    return (
                      <div
                        key={item.day}
                        className={`flex justify-between items-center py-1.5 px-2.5 rounded-lg transition-colors ${
                          isToday
                            ? 'bg-white/10 font-bold text-white'
                            : 'text-white/70 hover:text-white/90'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{item.day}</span>
                          {isToday && (
                            <span className="text-[10px] font-normal tracking-wider text-white/50 uppercase">
                              (Aujourd'hui)
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-xs sm:text-[13px] text-right text-white/90">
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Métro & Transport sans couleurs vives */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                  <div className="text-[11px] sm:text-xs leading-relaxed text-white/80">
                    <p className="font-sans font-semibold tracking-wide uppercase text-white">
                      36 Rue Condorcet, 75009 Paris
                    </p>
                    <p className="font-serif text-white/60 mt-0.5">
                      Métro Anvers (Ligne 2) · Cadet &amp; Poissonnière (Ligne 7)
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action épurés */}
              <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={ZENCHEF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black hover:bg-white/90 font-sans font-bold text-xs tracking-[0.14em] uppercase text-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>Réserver</span>
                </a>

                {onOpenContact && (
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="py-2.5 px-4 rounded-xl border border-white/20 hover:border-white/50 text-white/90 hover:text-white font-sans font-medium text-xs tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer"
                  >
                    Contact
                  </button>
                )}
              </div>
            </div>

            {/* CARTE 2 : CARTE INTERACTIVE SOMBRE AVEC ITINÉRAIRE */}
            <div className="lg:col-span-7 bg-[#202020]/90 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Barre supérieure de la carte */}
              <div className="px-5 py-3.5 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-white/80 shrink-0" />
                  <span className="font-sans font-semibold text-xs tracking-wider uppercase truncate">
                    ABBY · Paris 9e
                  </span>
                </div>

                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-white/80" />
                  <span>Itinéraire Google</span>
                </a>
              </div>

              {/* Vue de la carte interactive en mode sombre */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] lg:min-h-[360px] w-full bg-[#1e1e1e]">
                <iframe
                  title="Plan d'accès interactif au restaurant ABBY 36 Rue Condorcet Paris 9"
                  src="https://maps.google.com/maps?q=36+Rue+Condorcet,+75009+Paris&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full absolute inset-0 border-0"
                  style={{
                    filter: 'invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.92)',
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                {/* Badge d'adresse flottant sobre */}
                <div className="absolute bottom-3 left-3 pointer-events-none z-10 px-3 py-1.5 rounded-lg bg-black/85 border border-white/20 backdrop-blur-md shadow-lg">
                  <p className="font-sans font-bold text-[10px] tracking-[0.14em] uppercase text-white">
                    36 RUE CONDORCET, 75009 PARIS
                  </p>
                  <p className="font-serif text-[9px] text-white/70">
                    Pâtes fraîches chaque matin
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Section 2 & Bouton Remonter */}
          <div className="w-full max-w-6xl mx-auto pt-4 mt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-sans font-light text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/50">
              ABBY PARIS · 36 RUE CONDORCET 75009 PARIS · RESTAURANT DE PÂTES FRAÎCHES
            </p>

            <button
              type="button"
              onClick={scrollToHero}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white font-sans text-[10px] tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer"
            >
              <ArrowUp className="w-3 h-3 text-white/80" />
              <span>Retour en haut</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeView;