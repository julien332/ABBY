export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface MenuSection {
  title: string;
  subtitle?: string;
  categories: MenuCategory[];
}

export interface FullMenu {
  midi: MenuSection;
  soir: MenuSection;
  boissons: MenuSection;
  vins: MenuSection;
}

export const DEFAULT_MENU_DATA: FullMenu = {
  midi: {
    title: 'FORMULE DÉJEUNER DU TEMPLE',
    subtitle: 'Du mardi au vendredi midi · Plat + Café ou Boisson 19 €',
    categories: [
      {
        id: 'midi-invocations',
        title: 'INVOCATIONS DU MIDI',
        items: [
          {
            id: 'midi-focaccia',
            name: 'FOCACCIA À L’HUILE D’OLIVE',
            description: 'Focaccia maison au romarin et fleur de sel de Guérande',
            price: '6',
          },
          {
            id: 'midi-burrata',
            name: 'BURRATA DES POUILLES',
            description: 'Tomates confites, basilic frais et réduction balsamique',
            price: '9',
          },
        ],
      },
      {
        id: 'midi-offrandes',
        title: 'PÂTES DU JOUR',
        items: [
          {
            id: 'midi-rigatoni-carbonara',
            name: 'RIGATONI ALLA CARBONARA',
            description: "Guanciale croustillant du Latium, pecorino romano, jaunes d'œufs bio, poivre concassé",
            price: '18',
          },
          {
            id: 'midi-tagliatelles-bolognese',
            name: 'TAGLIATELLES À LA BOLOGNESE',
            description: 'Ragoût de bœuf mijoté 6 heures, vin rouge, parmesan 24 mois',
            price: '18',
          },
          {
            id: 'midi-penne-arrabbiata',
            name: 'PENNE ALL’ARRABBIATA',
            description: 'Sauce tomate San Marzano ardente, piment calabrais, ail doux et persil plat',
            price: '16',
          },
        ],
      },
    ],
  },
  soir: {
    title: 'LE GRIMOIRE DU SOIR',
    subtitle: 'Chaque plat est un petit acte de dévotion',
    categories: [
      {
        id: 'soir-invocations',
        title: 'INVOCATIONS',
        items: [
          {
            id: 'soir-bruschette',
            name: 'BRUSCHETTE CLASSICHE',
            description: "Pain rustique grillé, concassé de tomates de saison, ail frais, huile d'olive fruitée",
            price: '11',
          },
          {
            id: 'soir-focaccia',
            name: 'FOCACCIA À L’HUILE D’OLIVE',
            description: 'Focaccia pétrie au levain, fleur de sel et romarin frais',
            price: '12',
          },
          {
            id: 'soir-arancini',
            name: 'ARANCINI AU SAFRAN',
            description: 'Croquettes de riz safrané, cœur coulant mozzarella fior di latte, parmesan',
            price: '13',
          },
          {
            id: 'soir-antipasti',
            name: 'ANTIPASTI DELLA CASA',
            description: 'Charcuteries sélectionnées du Latium, légumes confits, olives taggiasche, parmesan affiné',
            price: '20',
          },
        ],
      },
      {
        id: 'soir-offrandes',
        title: 'OFFRANDES (PÂTES FRAÎCHES FAÇONNÉES LE JOUR MÊME)',
        items: [
          {
            id: 'soir-spaghetti-carbonara',
            name: 'SPAGHETTI ALLA CARBONARA',
            description: "Spaghetti au bronze, guanciale poivré croustillant, pecorino romano, jaunes d'œufs bio",
            price: '20',
          },
          {
            id: 'soir-tagliatelles-bolognese',
            name: 'TAGLIATELLES À LA BOLOGNESE',
            description: 'Mijoté traditionnel de bœuf et porc au vin rouge et lait entier, parmesan 24 mois',
            price: '20',
          },
          {
            id: 'soir-penne-arrabbiata',
            name: 'PENNE ARRABBIATA',
            description: 'Tomates San Marzano ardentes, piments frais, ail infusé et parmesan',
            price: '20',
          },
          {
            id: 'soir-fettuccine-alfredo',
            name: 'FETTUCCINE ALFREDO',
            description: 'Beurre doux de baratte, crème double, émulsion de parmesan affiné et poivre blanc',
            price: '20',
          },
          {
            id: 'soir-figadelu',
            name: 'FIGADELU',
            description: "Compotée d'oignons fondants, saucisse corse figatelle, fior di latte, huile au romarin",
            price: '19',
          },
          {
            id: 'soir-linguine-mer',
            name: 'LINGUINE AUX FRUITS DE MER',
            description: 'Moules de bouchot, gambas saisies, calamars dorés, vin blanc et persillade vive',
            price: '20',
          },
        ],
      },
      {
        id: 'soir-enchantements',
        title: 'ENCHANTEMENTS',
        items: [
          {
            id: 'soir-tiramisu',
            name: 'BOOZY TIRAMISU',
            description: "Biscuits imbibés d'espresso corsé, pointe d'amaretto di Saronno, crème mascarpone aérienne",
            price: '10',
          },
          {
            id: 'soir-affogato',
            name: 'AFFOGATO AL CAFFÈ',
            description: 'Glace vanille de Madagascar noyée sous un double expresso brûlant et amandes grillées',
            price: '7',
          },
          {
            id: 'soir-cannoli',
            name: 'CANNOLI SICILIANI',
            description: "Croustillant frit, ricotta fraîche sucrée, pépites de chocolat noir et zestes d'orange",
            price: '13',
          },
        ],
      },
    ],
  },
  boissons: {
    title: 'APERITIVO & BOISSONS',
    subtitle: 'Élixirs de dévotion et rafraîchissements du sanctuaire',
    categories: [
      {
        id: 'boissons-cocktails',
        title: 'APERITIVO & COCKTAILS SIGNATURE',
        items: [
          {
            id: 'boissons-spritz',
            name: 'ABBY SPRITZ',
            description: 'Aperol ou Campari, prosecco bio, trait de soda, orange fraîche',
            price: '10',
          },
          {
            id: 'boissons-negroni',
            name: 'NEGRONI RITUEL',
            description: 'Gin London Dry, Campari bitter, vermouth rouge Carpano',
            price: '11',
          },
          {
            id: 'boissons-espresso-martini',
            name: 'ESPRESSO MARTINI',
            description: "Vodka, liqueur de café Kahlúa, shot d'espresso fraîchement extrait",
            price: '11',
          },
        ],
      },
      {
        id: 'boissons-bieres-softs',
        title: 'BIÈRES & SOFTS',
        items: [
          {
            id: 'boissons-peroni',
            name: 'PERONI NASTRO AZZURRO (PRESSION 33CL)',
            description: '',
            price: '6',
          },
          {
            id: 'boissons-limonata',
            name: 'LIMONATA MAISON AU CITRON JAUNE & ROMARIN',
            description: '',
            price: '5,5',
          },
          {
            id: 'boissons-san-pellegrino',
            name: 'EAU MINÉRALE SAN PELLEGRINO (75CL)',
            description: '',
            price: '5',
          },
        ],
      },
    ],
  },
  vins: {
    title: 'VINS NATURELS & DE TERROIR',
    subtitle: 'Sélectionnés auprès de vignerons passionnés',
    categories: [
      {
        id: 'vins-blancs',
        title: 'VINS BLANCS',
        items: [
          {
            id: 'vins-pinot-grigio',
            name: 'PINOT GRIGIO DELLE VENEZIE DOC',
            description: 'Frais, floral et minéral · Verre ou Bouteille',
            price: '7 / 32',
          },
          {
            id: 'vins-gavi',
            name: 'GAVI DI GAVI, PIÉMONT',
            description: 'Cépage Cortese, vif, agrumes mûrs et finale saline',
            price: '8 / 38',
          },
        ],
      },
      {
        id: 'vins-rouges',
        title: 'VINS ROUGES',
        items: [
          {
            id: 'vins-chianti',
            name: 'CHIANTI CLASSICO DOCG, TOSCANE',
            description: 'Sangiovese dominant, cerise noire, épices douces',
            price: '7,5 / 35',
          },
          {
            id: 'vins-montepulciano',
            name: 'MONTEPULCIANO D’ABRUZZO',
            description: 'Rond, gorgé de soleil, tanins soyeux',
            price: '6,5 / 29',
          },
        ],
      },
    ],
  },
};

export const MENU_STORAGE_KEY = 'abby_menu_data';
export const MENU_UPDATED_EVENT = 'abby_menu_updated';

/**
 * Charge les données depuis le localStorage ou renvoie la carte par défaut
 */
export function getMenuData(): FullMenu {
  if (typeof window === 'undefined') {
    return DEFAULT_MENU_DATA;
  }

  try {
    const raw = localStorage.getItem(MENU_STORAGE_KEY);
    if (!raw) return DEFAULT_MENU_DATA;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.midi && parsed.soir && parsed.boissons && parsed.vins) {
      return parsed as FullMenu;
    }
  } catch (err) {
    console.error('Erreur lecture localStorage menu:', err);
  }

  return DEFAULT_MENU_DATA;
}

/**
 * Enregistre les données dans le localStorage et notifie l'application en direct
 */
export function saveMenuData(data: FullMenu): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(MENU_UPDATED_EVENT, { detail: data }));
  } catch (err) {
    console.error('Erreur sauvegarde localStorage menu:', err);
  }
}

/**
 * Réinitialise la carte avec les valeurs par défaut
 */
export function resetMenuData(): FullMenu {
  if (typeof window === 'undefined') return DEFAULT_MENU_DATA;

  try {
    localStorage.removeItem(MENU_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(MENU_UPDATED_EVENT, { detail: DEFAULT_MENU_DATA }));
  } catch (err) {
    console.error('Erreur réinitialisation localStorage menu:', err);
  }

  return DEFAULT_MENU_DATA;
}
