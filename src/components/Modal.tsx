'use client';

import { closeModal } from '@/app/features/modal/modalSlice';
import { RootState } from '@/store/store';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const modalVariants: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      duration: 0.2,
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
      bounce: 0.3,
    },
  },
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeModal());
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements?.length) {
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, dispatch]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) dispatch(closeModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-800"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Resume</h2>
              <button
                onClick={() => dispatch(closeModal())}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-700"
                aria-label="Close modal"
              >
                <MdOutlineClose className="h-5 w-5" />
              </button>
            </div>

            <div className="w-full h-full flex justify-center">
              {/* Content goes here */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

//
//
