import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen = false, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '9fb736ef-d776-4615-bc77-ecc6d19747f5',
          subject: `Nouveau message ABBY de ${formData.name}`,
          from_name: 'ABBY FORMULAIRE',
          ...formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          handleClose();
        }, 3200);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Fond flouté sombre (fermeture au clic extérieur) */}
      <div 
        className="absolute inset-0 bg-[#1e1e1e]/85 backdrop-blur-md cursor-pointer"
        onClick={handleClose}
      />

      {/* Conteneur de la modale */}
      <div 
        className="relative w-full max-w-lg bg-[#2E2E2E] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Fermer */}
        <button 
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-white/60 hover:text-white transition-colors z-50 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* En-tête */}
        <div className="px-8 pt-10 pb-6 text-center border-b border-white/5 relative">
          <div className="flex justify-center mb-3 text-white/80">
            <svg width="40" height="28" viewBox="0 0 44 28" fill="none" className="text-white drop-shadow-md">
              <circle cx="22" cy="14" r="2.5" fill="currentColor" />
              <path d="M16 14 C12 6, 4 6, 2 14 C4 22, 12 22, 16 14 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M28 14 C32 6, 40 6, 42 14 C40 22, 32 22, 28 14 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.75" />
              <circle cx="22" cy="24" r="1.5" fill="currentColor" opacity="0.75" />
            </svg>
          </div>
          <h2 className="font-sans font-bold text-lg sm:text-xl tracking-[0.16em] uppercase text-[#FA6755]">
            CONFESSIONS &amp; REQUÊTES
          </h2>
          <p className="mt-3 font-serif text-[#D9D9D9]/80 text-sm sm:text-base">
            Une question, une privatisation, une déclaration d'amour à notre carbonara ? Laissez-nous un message.
          </p>
        </div>

        {/* Corps du formulaire */}
        <div className="p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#966EA3]/20 flex items-center justify-center mb-4 text-[#966EA3]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-lg tracking-[0.1em] uppercase text-white mb-2">
                MESSAGE ENVOYÉ
              </h3>
              <p className="font-serif text-[#D9D9D9]/80 mb-6">
                Vos prières ont bien été transmises au temple.<br />Nous vous répondrons très vite.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg border border-white/20 text-white font-sans text-xs tracking-[0.15em] uppercase hover:bg-white/10 transition-colors cursor-pointer"
              >
                Retour au sanctuaire
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-sans text-xs tracking-[0.15em] uppercase text-white/60 mb-1.5">
                  Nom / Prénom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white font-serif text-base focus:outline-none focus:border-[#FA6755] focus:ring-1 focus:ring-[#FA6755] transition-all placeholder:text-white/20"
                  placeholder="Luigi Rossi"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-sans text-xs tracking-[0.15em] uppercase text-white/60 mb-1.5">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white font-serif text-base focus:outline-none focus:border-[#FA6755] focus:ring-1 focus:ring-[#FA6755] transition-all placeholder:text-white/20"
                  placeholder="luigi@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-sans text-xs tracking-[0.15em] uppercase text-white/60 mb-1.5">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white font-serif text-base focus:outline-none focus:border-[#FA6755] focus:ring-1 focus:ring-[#FA6755] transition-all placeholder:text-white/20"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-sans text-xs tracking-[0.15em] uppercase text-white/60 mb-1.5">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white font-serif text-base focus:outline-none focus:border-[#FA6755] focus:ring-1 focus:ring-[#FA6755] transition-all resize-none placeholder:text-white/20"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              {status === 'error' && (
                <p className="text-[#FA6755] text-xs font-sans tracking-wide text-center">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-3 bg-[#FA6755] hover:bg-[#e14e3b] text-white font-sans font-bold text-sm tracking-[0.15em] uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;