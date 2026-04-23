import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import RegistrationFormContent from './RegistrationFormContent';
import { logEvent } from '../servises/analytics';
import { RegistrationModalContext } from './registrationModalContext';

interface ModalState {
  open: boolean;
  source?: string;
}

export const RegistrationModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ModalState>({ open: false });

  const openModal = useCallback((source?: string) => {
    logEvent({
      category: 'user_interaction',
      action: 'open_registration_modal',
      label: `User opened the registration modal from ${source ?? 'unknown'}`,
    });
    setState({ open: true, source });
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => {
      if (prev.open) {
        logEvent({
          category: 'user_interaction',
          action: 'close_registration_modal',
          label: `User closed the registration modal (opened from ${prev.source ?? 'unknown'})`,
        });
      }
      return { open: false };
    });
  }, []);

  return (
    <RegistrationModalContext.Provider value={{ openModal, closeModal, isOpen: state.open }}>
      {children}
      <RegistrationModal isOpen={state.open} source={state.source} onClose={closeModal} />
    </RegistrationModalContext.Provider>
  );
};

interface ModalProps {
  isOpen: boolean;
  source?: string;
  onClose: () => void;
}

const RegistrationModal: React.FC<ModalProps> = ({ isOpen, source, onClose }) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  // SSR / prerender safety: only mount via portal in the browser
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-start md:items-center justify-center bg-charcoal/60 backdrop-blur-sm overflow-y-auto p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={t('form.title')}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-neutral-100 rounded-2xl shadow-2xl w-full max-w-lg my-8 p-6 md:p-8 outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('modal.close')}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-charcoal/70 hover:text-charcoal hover:bg-coffee/10 transition-colors"
            >
              <FaTimes size={16} />
            </button>
            <RegistrationFormContent variant="modal" source={source ?? 'modal'} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default RegistrationModal;
