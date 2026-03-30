// Modal.tsx
import React, {ReactNode} from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl shadow-black/50 p-6 md:p-8 w-full max-w-md animate-[fadeIn_0.2s_ease-out]">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-zinc-500 hover:text-white hover:bg-zinc-700/50 rounded-lg p-1.5 transition-colors" onClick={onClose}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
