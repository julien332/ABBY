import React, { useState, useEffect } from 'react';
import {
  FullMenu,
  MenuItem,
  MenuCategory,
  getMenuData,
  saveMenuData,
  resetMenuData,
} from '../data/menuData';
import {
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Copy,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
} from 'lucide-react';

interface AdminViewProps {
  onClose: () => void;
}

type TabKey = 'midi' | 'soir' | 'boissons' | 'vins';

const ADMIN_PASSWORD = 'inpastawetrust';
const SESSION_AUTH_KEY = 'abby_admin_authenticated';

export const AdminView: React.FC<AdminViewProps> = ({ onClose }) => {
  // 1. Authentification
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // 2. Données du menu
  const [menu, setMenu] = useState<FullMenu>(() => getMenuData());
  const [activeTab, setActiveTab] = useState<TabKey>('soir');

  // 3. Feedbacks visuels
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Synchronisation initiale
  useEffect(() => {
    setMenu(getMenuData());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Mettre à jour un champ d'un plat
  const handleItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string
  ) => {
    setMenu((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as FullMenu;
      const currentSection = updated[activeTab];
      const targetCategory = currentSection.categories[categoryIndex];
      if (targetCategory && targetCategory.items[itemIndex]) {
        targetCategory.items[itemIndex][field] = value;
      }
      return updated;
    });
    setSaveSuccess(false);
  };

  // Supprimer un plat
  const handleDeleteItem = (categoryIndex: number, itemIndex: number) => {
    setMenu((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as FullMenu;
      const currentSection = updated[activeTab];
      const targetCategory = currentSection.categories[categoryIndex];
      if (targetCategory) {
        targetCategory.items.splice(itemIndex, 1);
      }
      return updated;
    });
    setSaveSuccess(false);
  };

  // Ajouter un plat dans une catégorie
  const handleAddItem = (categoryIndex: number) => {
    const newItem: MenuItem = {
      id: `${activeTab}-${Date.now()}`,
      name: 'NOUVEAU PLAT',
      description: 'Description des ingrédients et de la préparation...',
      price: '18',
    };

    setMenu((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as FullMenu;
      const currentSection = updated[activeTab];
      const targetCategory = currentSection.categories[categoryIndex];
      if (targetCategory) {
        targetCategory.items.push(newItem);
      }
      return updated;
    });
    setSaveSuccess(false);
  };

  // Sauvegarder dans le localStorage
  const handleSave = () => {
    saveMenuData(menu);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  // Réinitialiser la carte d'origine
  const handleConfirmReset = () => {
    const fresh = resetMenuData();
    setMenu(fresh);
    setResetModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  // Exporter en JSON
  const handleExportJson = async () => {
    try {
      const jsonStr = JSON.stringify(menu, null, 2);
      await navigator.clipboard.writeText(jsonStr);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie du JSON:', err);
    }
  };

  // ==========================================
  // ÉCRAN 1 : VERROUILLAGE / MOT DE PASSE RITUEL
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#1a1a1a] flex items-center justify-center p-4 sm:p-6 text-[#D9D9D9] select-none">
        <div className="relative w-full max-w-md bg-[#252525] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl text-center">
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
            title="Quitter et revenir au site"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#966EA3]/20 flex items-center justify-center text-[#FA6755] border border-[#FA6755]/30">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-sans font-bold text-lg sm:text-xl tracking-[0.16em] uppercase text-[#FA6755] mb-2">
            GRIMOIRE D'ADMINISTRATION
          </h2>

          <p className="font-serif text-sm text-[#D9D9D9]/80 mb-6 leading-relaxed">
            Espace réservé à l’équipe du sanctuaire ABBY pour modifier les offrandes, formules et millésimes.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Mot de passe rituel..."
                className="w-full bg-[#1c1c1c] border border-white/15 rounded-lg px-4 py-3 text-white font-mono text-center tracking-widest text-sm focus:outline-none focus:border-[#FA6755] focus:ring-1 focus:ring-[#FA6755] transition-all placeholder:text-white/25"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#FA6755] animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Mot de passe incorrect. Accès refusé.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#FA6755] hover:bg-[#e14e3b] text-white font-sans font-bold text-xs tracking-[0.18em] uppercase py-3.5 rounded-lg transition-colors cursor-pointer shadow-lg"
            >
              Déverrouiller la carte
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-sans tracking-widest uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              ← Retour au sanctuaire
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ÉCRAN 2 : DASHBOARD COMPLET D'ÉDITION
  // ==========================================
  const currentSection = menu[activeTab];

  return (
    <div className="fixed inset-0 z-[200] bg-[#1e1e1e] text-[#D9D9D9] flex flex-col overflow-hidden">
      
      {/* 1. BARRE SUPÉRIEURE DE NAVIGATION ET ACTIONS */}
      <header className="shrink-0 bg-[#252525] border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 z-20">
        
        {/* Titre & Statut */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#966EA3]/20 flex items-center justify-center text-[#FA6755]">
            <Unlock className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-white flex items-center gap-2">
              <span>ADMINISTRATION DU MENU</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FA6755]/20 text-[#FA6755] font-mono">
                LOCALSTORAGE
              </span>
            </h1>
            <p className="text-[11px] font-serif text-white/60">
              Modifications instantanées synchronisées en direct
            </p>
          </div>
        </div>

        {/* Boutons d'actions globales */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          
          {/* Enregistrer */}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FA6755] hover:bg-[#e14e3b] text-white font-sans font-bold text-xs tracking-[0.14em] uppercase transition-all shadow-md cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Enregistrer</span>
          </button>

          {/* Exporter JSON */}
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer"
            title="Copier le JSON complet dans le presse-papier"
          >
            <Copy className="w-3.5 h-3.5 text-[#966EA3]" />
            <span className="hidden sm:inline">Exporter JSON</span>
          </button>

          {/* Réinitialiser */}
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-red-500/20 hover:border-red-500/40 text-white/80 hover:text-red-400 font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer"
            title="Rétablir la carte d'origine"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Réinitialiser</span>
          </button>

          {/* Déconnexion */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Verrouiller l'accès"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Fermer et voir le site */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir le site</span>
          </button>

        </div>
      </header>

      {/* BANNIÈRE DE SUCCÈS (TOAST) */}
      {saveSuccess && (
        <div className="bg-emerald-600/90 text-white text-xs font-sans tracking-widest uppercase py-2 px-4 text-center flex items-center justify-center gap-2 animate-fadeIn z-10 shadow-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>Modifications enregistrées ! La carte en ligne est à jour.</span>
        </div>
      )}

      {copySuccess && (
        <div className="bg-[#966EA3] text-white text-xs font-sans tracking-widest uppercase py-2 px-4 text-center flex items-center justify-center gap-2 animate-fadeIn z-10 shadow-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>Structure JSON copiée dans votre presse-papier !</span>
        </div>
      )}

      {/* 2. ONGLETS DES SECTIONS DU MENU */}
      <div className="shrink-0 bg-[#202020] border-b border-white/5 px-4 sm:px-8 py-3 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
        {(['midi', 'soir', 'boissons', 'vins'] as TabKey[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSaveSuccess(false);
              }}
              className={`px-5 sm:px-7 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-[13px] tracking-[0.16em] uppercase font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FA6755] text-white shadow-md'
                  : 'border border-[#FA6755]/40 text-[#FA6755] hover:border-[#FA6755] hover:bg-[#FA6755]/10'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. ZONE PRINCIPALE ÉDITABLE DÉROULANTE */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 max-w-5xl w-full mx-auto space-y-10">
        
        {/* Titre et sous-titre de la section active */}
        <div className="bg-[#262626] border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase text-[#FA6755]">
              EN-TÊTE DE LA SECTION ({activeTab.toUpperCase()})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans tracking-wider uppercase text-white/60 mb-1">
                Titre principal
              </label>
              <input
                type="text"
                value={currentSection.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setMenu((prev) => ({
                    ...prev,
                    [activeTab]: {
                      ...prev[activeTab],
                      title: val,
                    },
                  }));
                  setSaveSuccess(false);
                }}
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-lg px-3.5 py-2 text-white font-sans text-sm focus:outline-none focus:border-[#FA6755]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans tracking-wider uppercase text-white/60 mb-1">
                Sous-titre / Description
              </label>
              <input
                type="text"
                value={currentSection.subtitle || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setMenu((prev) => ({
                    ...prev,
                    [activeTab]: {
                      ...prev[activeTab],
                      subtitle: val,
                    },
                  }));
                  setSaveSuccess(false);
                }}
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-lg px-3.5 py-2 text-white font-serif text-sm focus:outline-none focus:border-[#FA6755]"
              />
            </div>
          </div>
        </div>

        {/* Liste des catégories pour la section active */}
        {currentSection.categories.map((category: MenuCategory, catIdx: number) => (
          <section
            key={category.id || catIdx}
            className="bg-[#252525] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6"
          >
            {/* Header de la catégorie */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex-1">
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMenu((prev) => {
                      const updated = JSON.parse(JSON.stringify(prev)) as FullMenu;
                      updated[activeTab].categories[catIdx].title = val;
                      return updated;
                    });
                    setSaveSuccess(false);
                  }}
                  className="w-full max-w-lg bg-transparent text-[#FA6755] font-sans font-bold text-sm sm:text-base tracking-[0.16em] uppercase focus:outline-none focus:bg-[#1a1a1a] px-2 py-1 rounded"
                />
              </div>

              <button
                type="button"
                onClick={() => handleAddItem(catIdx)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#FA6755]/40 text-[#FA6755] hover:bg-[#FA6755] hover:text-white font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter un plat</span>
              </button>
            </div>

            {/* Liste des items éditables */}
            <div className="space-y-4">
              {category.items.length === 0 ? (
                <p className="text-center py-6 text-sm font-serif text-white/40 italic">
                  Aucun plat dans cette catégorie. Cliquez sur "+ Ajouter un plat" pour en insérer un.
                </p>
              ) : (
                category.items.map((item: MenuItem, itemIdx: number) => (
                  <div
                    key={item.id || itemIdx}
                    className="group bg-[#1e1e1e] border border-white/5 hover:border-white/20 rounded-xl p-4 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      
                      {/* Nom du plat */}
                      <div className="flex-1">
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-white/40 mb-1">
                          Nom du plat
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(catIdx, itemIdx, 'name', e.target.value.toUpperCase())
                          }
                          className="w-full bg-[#151515] border border-white/10 rounded px-3 py-1.5 text-white font-sans font-semibold text-sm tracking-wide focus:outline-none focus:border-[#FA6755]"
                          placeholder="EX: RIGATONI ALLA CARBONARA"
                        />
                      </div>

                      {/* Prix */}
                      <div className="w-28 sm:w-32 shrink-0">
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-white/40 mb-1">
                          Prix (€)
                        </label>
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(catIdx, itemIdx, 'price', e.target.value)
                          }
                          className="w-full bg-[#151515] border border-white/10 rounded px-3 py-1.5 text-white font-serif text-sm text-center focus:outline-none focus:border-[#FA6755]"
                          placeholder="18"
                        />
                      </div>

                      {/* Bouton Supprimer */}
                      <div className="pt-5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(catIdx, itemIdx)}
                          className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                          title="Supprimer ce plat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Description du plat */}
                    <div>
                      <label className="block text-[10px] font-sans tracking-widest uppercase text-white/40 mb-1">
                        Description / Ingrédients
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(catIdx, itemIdx, 'description', e.target.value)
                        }
                        className="w-full bg-[#151515] border border-white/10 rounded px-3 py-1.5 text-[#D9D9D9]/90 font-serif text-xs sm:text-sm focus:outline-none focus:border-[#FA6755] resize-y"
                        placeholder="Guanciale croustillant, pecorino romano, jaunes d'œufs bio..."
                      />
                    </div>

                  </div>
                ))
              )}
            </div>

          </section>
        ))}

        {/* BARRE D'ACTION EN BAS DE PAGE */}
        <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="font-serif text-xs text-white/50 text-center sm:text-left">
            Pensez à cliquer sur <strong>Enregistrer</strong> pour propager vos changements immédiatement.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 rounded-lg bg-[#FA6755] hover:bg-[#e14e3b] text-white font-sans font-bold text-xs tracking-[0.16em] uppercase transition-colors shadow-lg cursor-pointer"
            >
              Enregistrer les modifications
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-white/20 text-white font-sans text-xs tracking-[0.14em] uppercase hover:bg-white/10 transition-colors cursor-pointer"
            >
              Fermer l'admin
            </button>
          </div>
        </div>

      </main>

      {/* MODAL DE CONFIRMATION DE RÉINITIALISATION */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#292929] border border-white/15 rounded-2xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base tracking-[0.12em] uppercase text-white">
              Réinitialiser la carte ?
            </h3>
            <p className="font-serif text-xs text-white/70 leading-relaxed">
              Toutes les modifications apportées depuis le panneau d'administration seront effacées et remplacées par la carte d'origine par défaut.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/20 text-white font-sans text-xs tracking-wider uppercase hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-xs tracking-wider uppercase transition-colors"
              >
                Confirmer la réinitialisation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminView;
