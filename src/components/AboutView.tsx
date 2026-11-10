import React, { useState, useEffect, useRef } from 'react';

// @ts-ignore
import svgRibambelle from '../assets/14.svg';
// @ts-ignore
import char1 from '../assets/1.svg';
// @ts-ignore
import char2 from '../assets/2.svg';
// @ts-ignore
import char3 from '../assets/3.svg';
// @ts-ignore
import char4 from '../assets/4.svg';
// @ts-ignore
import char5 from '../assets/5.svg';

interface AboutViewProps {
  navigate?: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  });

  useEffect(() => {
    const el = orbitRef.current;
    if (el) {
      el.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
    }

    const updateOrbit = () => {
      if (el) {
        el.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = null;
    };

    const handleMove = (clientX: number, clientY: number) => {
      targetPos.current.x = clientX;
      targetPos.current.y = clientY;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateOrbit);
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Déclenchement de l'entrée progressive après 300 ms
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 300);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      clearTimeout(timer);
    };
  }, []);

  // 5 adorateurs répartis à 72° d'intervalle
  const disciples = [
    { src: char1, angle: 0, delay: '0s', enterDelay: '0ms' },
    { src: char2, angle: 72, delay: '-0.8s', enterDelay: '180ms' },
    { src: char3, angle: 144, delay: '-1.6s', enterDelay: '360ms' },
    { src: char4, angle: 216, delay: '-2.4s', enterDelay: '540ms' },
    { src: char5, angle: 288, delay: '-3.2s', enterDelay: '720ms' },
  ];

  // Rayon : démarre hors écran puis se stabilise à 235px (~6 cm) de la penne
  const currentRadius = hasEntered ? 235 : 1600;

  return (
    <main className="relative min-h-screen bg-[#2E2E2E] text-[#D9D9D9] flex flex-col justify-between px-6 sm:px-14 lg:px-24 pt-28 md:pt-36 pb-12 select-none overflow-x-hidden cursor-none">
      
      {/* ================= STYLES D'ANIMATION ================= */}
      <style>{`
        /* 1. Ronde globale lente dans le sens horaire */
        @keyframes ritualFireOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* 2. Contre-rotation inverse exacte pour maintenir les personnages strictement verticaux */
        @keyframes counterFireOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* 3. Halètement et flottement vertical pur (aucune inclinaison latérale) */
        @keyframes gentleRitualDance {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) scale(1.06);
          }
        }

        .animate-slow-orbit {
          animation: ritualFireOrbit 55s linear infinite;
        }

        .animate-counter-orbit {
          animation: counterFireOrbit 55s linear infinite;
        }

        .animate-gentle-dance {
          animation: gentleRitualDance 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* ================= LA RONDE DES ADORATEURS STRICTEMENT DROITS ================= */}
      <div
        ref={orbitRef}
        className="fixed top-0 left-0 pointer-events-none z-40 will-change-transform"
        style={{
          transform: `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`,
          transition: 'transform 0.45s cubic-bezier(0.18, 0.9, 0.25, 1)',
        }}
      >
        {/* Conteneur rotatif (ronde horaire) */}
        <div className="relative w-1 h-1 animate-slow-orbit">
          {disciples.map((disciple, index) => (
            <div
              key={index}
              className="absolute top-0 left-0 will-change-transform"
              style={{
                // Positionne l'adorateur sur le rayon tout en annulant son angle d'implantation
                transform: `rotate(${disciple.angle}deg) translateY(-${currentRadius}px) rotate(-${disciple.angle}deg)`,
                transition: 'transform 4.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: hasEntered ? disciple.enterDelay : '0ms',
              }}
            >
              {/* Contre-rotation anti-horaire : maintient le personnage tête en haut en permanence */}
              <div className="animate-counter-orbit">
                {/* Lévitation verticale pure */}
                <div
                  className="animate-gentle-dance"
                  style={{ animationDelay: disciple.delay }}
                >
                  <img
                    src={disciple.src}
                    alt="Adorateur de la pâte"
                    style={{ width: '130px', height: '130px', minWidth: '130px', minHeight: '130px' }}
                    className="object-contain brightness-0 invert opacity-95 drop-shadow-[0_6px_22px_rgba(0,0,0,0.95)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. CONTENU ÉDITORIAL ================= */}
      <div className="max-w-3xl w-full mx-auto space-y-9 text-left z-10 py-6">
        
        <section>
          <h2 className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#FA6755] mb-2.5">
            LE TEMPLE DES PÂTES FRAÎCHES
          </h2>
          <p className="font-serif text-[#D9D9D9]/90 text-sm sm:text-base md:text-[17px] leading-[1.75]">
            Fondé par Geoffroy et Jacques, ABBY est né d’un rituel immuable : et si on poussait l’amour de la pâte fraîche jusqu’à la dévotion ? Loin du cérémonial guindé, nous célébrons une cuisine vibrante, solaire et décomplexée, où chaque assiette est pensée comme un petit acte de foi gustative.
          </p>
        </section>

        <section>
          <h2 className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#FA6755] mb-2.5">
            L'ARTISANAT DU GESTE
          </h2>
          <p className="font-serif text-[#D9D9D9]/90 text-sm sm:text-base md:text-[17px] leading-[1.75]">
            Nos pâtes sont façonnées à la main chaque matin sous vos yeux dans notre cuisine ouverte. Semoule de blé dur sélectionnée, tréfilage au bronze pour une texture rugueuse qui s'imprègne amoureusement des sauces, et œufs frais bio cassés un à un au comptoir.
          </p>
        </section>

        <section>
          <h2 className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#FA6755] mb-2.5">
            LES INGRÉDIENTS SACRÉS
          </h2>
          <p className="font-serif text-[#D9D9D9]/90 text-sm sm:text-base md:text-[17px] leading-[1.75]">
            Ici, le parmesan Reggiano affiné est sacré et nos sauces mijotent des heures avec patience. Nos matières premières proviennent de terroirs d'exception, sans artifice : la pureté du produit brut et la générosité des grandes tablées de partage.
          </p>
        </section>

        <section>
          <h2 className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#FA6755] mb-2.5">
            POUR TOUS LES CONVERTIS
          </h2>
          <p className="font-serif text-[#D9D9D9]/90 text-sm sm:text-base md:text-[17px] leading-[1.75]">
            Un sanctuaire chaleureux et accessible au 36 Rue Condorcet, dans le 9e arrondissement de Paris. Que ce soit pour un déjeuner réconfortant ou une célébration nocturne à la lueur des bougies, notre temple vous ouvre ses portes.
          </p>
        </section>

        <div className="pt-3">
          <p className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#FA6755]">
            VENEZ AFFAMÉ. REPARTEZ CONVERTI.
          </p>
        </div>

      </div>

      {/* ================= 4. FRISE LINOGRAVURE BAS DE PAGE (14.SVG) ================= */}
      <footer className="w-full max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col items-center z-10">
        <div className="w-full overflow-hidden opacity-40 hover:opacity-80 transition-opacity duration-500">
          <img
            src={svgRibambelle}
            alt="Frise rituelle des pâtes ABBY"
            className="w-full h-12 sm:h-16 md:h-20 object-cover object-center brightness-0 invert"
          />
        </div>
        <p className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">
          ABBY PARIS — 36 RUE CONDORCET, 75009
        </p>
      </footer>

    </main>
  );
};

export default AboutView;