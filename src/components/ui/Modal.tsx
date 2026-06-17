'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  hideCloseButton?: boolean;
}

export default function Modal({ isOpen, onClose, title, footer, children, maxWidth = 'max-w-[500px]', hideCloseButton = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#171717]/40 z-[100] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white rounded-[12px] shadow-xl w-full ${maxWidth} flex flex-col pointer-events-auto max-h-[90vh] overflow-hidden relative`}
            >
              {title && !hideCloseButton && (
                <div className="flex items-start justify-between p-[24px] border-b border-[#f1f3f5]">
                  <div className="flex-1">{title}</div>
                  <button
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100 shrink-0 ml-4"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              {title && hideCloseButton && (
                <div className="p-[24px] border-b border-[#f1f3f5]">
                  {title}
                </div>
              )}
              {!title && !hideCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100 z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {children}
              </div>
              {footer && (
                <div className="shrink-0 bg-white">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}