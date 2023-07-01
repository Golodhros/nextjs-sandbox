// Basic modal component with a close button and a title prop

import React, { useEffect } from 'react';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

// TODO: Close when clicking outside
// TODO: Add a11y attributes
const Modal = ({ title, children, onClose }: ModalProps) => {
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    // TODO: Figure out how to type this properly
    const handleEsc = (event: any) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-header">
        <div className="modal-title">{title}</div>
        <button className="modal-close-btn" type="button" onClick={handleClose}>
          X
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

export { Modal };
