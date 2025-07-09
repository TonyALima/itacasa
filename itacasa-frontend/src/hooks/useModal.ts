import { useState, createElement } from 'react';
import type { ReactElement, ComponentType } from 'react';

export const useModal = () => {
  const [modalComponent, setModalComponent] = useState<ReactElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const setModal = <T extends object>(
    DialogComponent: ComponentType<T & { open: boolean; onClose: () => void }>,
    props?: Omit<T, 'open' | 'onClose'>
  ) => {
    const handleClose = () => {
      setIsOpen(false);
      setModalComponent(null);
    };

    const componentProps = {
      ...props,
      open: true,
      onClose: handleClose,
    } as T & { open: boolean; onClose: () => void };

    setModalComponent(
      createElement(DialogComponent, componentProps)
    );
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalComponent(null);
  };

  return {
    setModal,
    closeModal,
    modalComponent,
    isOpen
  };
};