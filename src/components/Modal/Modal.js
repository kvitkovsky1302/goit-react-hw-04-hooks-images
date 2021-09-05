import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, bigImageUrl }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={bigImageUrl} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
