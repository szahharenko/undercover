import { createContext, useContext } from 'react';

export interface RegistrationModalContextShape {
  openModal: (source?: string) => void;
  closeModal: () => void;
  isOpen: boolean;
}

export const RegistrationModalContext = createContext<RegistrationModalContextShape | null>(null);

export const useRegistrationModal = (): RegistrationModalContextShape => {
  const ctx = useContext(RegistrationModalContext);
  if (!ctx) {
    throw new Error('useRegistrationModal must be used within RegistrationModalProvider');
  }
  return ctx;
};
