import React, { useState, useEffect } from 'react';
import { FullMenu, getMenuData, MENU_UPDATED_EVENT } from '../data/menuData';

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

interface MenuViewProps {
  navigate?: (path: string) => void;
  onOpenContact?: () => void;
}

type TabType = 'midi' | 'soir' | 'boissons' | 'vins';

export const MenuView: React.FC<MenuViewProps> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('soir');
  const [characterBounce, setCharacterBounce] = useState(false);
  const [menuData, setMenuData] = useState<FullMenu>(() => getMenuData());

  // Écoute de l'événement personnalisé pour synchroniser la carte en direct avec l'admin
  useEffect(() => {
    const handleMenuUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<FullMenu>;
      if (customEvent && customEvent.detail) {
        setMenuData(customEvent.detail);
      } else {
        setMenuData(getMenuData());
      }
    };

    window.addEventListener(MENU_UPDATED_EVENT, handleMenuUpdate);
    window.addEventListener('storage', handleMenuUpdate);

    return () => {
      window.removeEventListener(MENU_UPDATED_EVENT, handleMenuUpdate);
      window.removeEventListener('storage', handleMenuUpdate);
    };
  }, []);

  // Déclenche une petite réaction / danse des adorateurs au changement d'onglet
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCharacterBounce(true);
    setTimeout(() => setCharacterBounce(false), 600);
  };

  // Sélectionne les personnages en fonction de l'onglet actif
  const leftChar = activeTab === 'midi' || activeTab === 'soir' ? char1 : char3;
  const rightChar = activeTab === 'midi' || activeTab === 'soir' ? char2 : char4;

  const currentSection = menuData[activeTab];

  return (
    <main className="relative min-h-screen bg-[#2E2E2E] text-[#D9D9D9] flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-28 md:pt-36 pb-16 select-none overflow-x-hidden">
      
      {/* Styles des animations de flottement et de sursaut rituel */}
      <style>{`
        @keyframes floatLeft {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50% { transform: translateY(-14px) rotate(-3deg); }
        }
        @keyframes ritualBounce {
          0% { transform: scale(1) translateY(0); }
          40% { transform: scale(1.2) translateY(-22px) rotate(8deg); filter: drop-shadow(0 0 20px #FA6755); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-float-left {
          animation: floatLeft 5s ease-in-out infinite;
        }
        .animate-float-right {
          animation: floatRight 5.4s ease-in-out infinite;
        }
        .animate-ritual-jump {
          animation: ritualBounce 0.6s cubic-bezier(0.17, 0.89, 0.32, 1.28) !important;
        }
      `}</style>

      {/* ================= 1. LES ADORATEURS FLOTTANTS SUR LES CÔTÉS ================= */}
      {/* Flanc Gauche */}
      <div className="hidden lg:block fixed left-6 xl:left-14 top-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className={`transition-all duration-300 ${characterBounce ? 'animate-ritual-jump' : 'animate-float-left'}`}>
          <img
            src={leftChar}
            alt="Adorateur de pâtes gauche"
            className="w-32 xl:w-40 h-auto object-contain brightness-0 invert opacity-80 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
          />
        </div>
      </div>

      {/* Flanc Droit */}
      <div className="hidden lg:block fixed right-6 xl:right-14 top-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className={`transition-all duration-300 ${characterBounce ? 'animate-ritual-jump' : 'animate-float-right'}`}>
          <img
            src={rightChar}
            alt="Adorateur de pâtes droit"
            className="w-32 xl:w-40 h-auto object-contain brightness-0 invert opacity-80 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] -scale-x-100"
          />
        </div>
      </div>

      {/* ================= 2. CONTENEUR CENTRAL DU MENU ================= */}
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center z-10">

        {/* BARRE D'ONGLETS PILULES */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-14 sm:mb-16">
          {(['midi', 'soir', 'boissons', 'vins'] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-5 sm:px-7 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-[13px] tracking-[0.14em] uppercase font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FA6755] text-white shadow-[0_2px_12px_rgba(250,103,85,0.4)]'
                    : 'border border-[#FA6755]/50 text-[#FA6755] hover:border-[#FA6755] hover:bg-[#FA6755]/10'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================= CONTENU DES MENUS DYNAMIQUE ================= */}
        {currentSection && (
          <div className="w-full space-y-12 sm:space-y-14 text-center animate-fadeIn">
            
            {/* Titre et sous-titre de la section */}
            {currentSection.title && (
              <div>
                <p className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#FA6755]">
                  {currentSection.title}
                </p>
                {currentSection.subtitle && (
                  <p className="font-serif text-xs sm:text-sm text-[#D9D9D9]/70 italic mt-1">
                    {currentSection.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Catégories de plats */}
            {currentSection.categories && currentSection.categories.map((category) => (
              <section key={category.id || category.title} className="space-y-5 sm:space-y-6">
                <h3 className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#FA6755]">
                  {category.title}
                </h3>
                
                <div className="space-y-4 sm:space-y-5">
                  {category.items && category.items.map((item) => (
                    <div key={item.id || item.name}>
                      <p className="font-sans font-semibold text-sm sm:text-base tracking-wide text-[#FA6755]">
                        {item.name} <span className="font-serif text-white">{item.price}</span>
                      </p>
                      {item.description && (
                        <p className="font-serif text-xs sm:text-sm text-[#D9D9D9]/80 mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

          </div>
        )}

      </div>

      {/* ================= 3. FRISE DE BAS DE PAGE ================= */}
      <footer className="w-full max-w-4xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col items-center z-10">
        <div className="w-full overflow-hidden opacity-40 hover:opacity-80 transition-opacity duration-500">
          <img
            src={svgRibambelle}
            alt="Frise rituelle ABBY"
            className="w-full h-12 sm:h-14 object-cover object-center brightness-0 invert"
          />
        </div>
        <p className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">
          36 RUE CONDORCET, 75009 PARIS · IN PASTA WE TRUST
        </p>
      </footer>

    </main>
  );
};

export default MenuView;