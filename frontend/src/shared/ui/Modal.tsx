import type { ReactNode } from 'react';

import { useAppDispatch } from '../../app/store';
import { closeModal } from '../../store/uiSlice';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  size?: 'default' | 'large';
}

export function Modal({ children, onClose, size = 'default' }: Props) {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      dispatch(closeModal());
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={size === 'large' ? 'modal-box-large' : 'modal-box'}>
        {children}
      </div>
    </div>
  );
}