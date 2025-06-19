import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <p className="text-sm text-center text-gray-400">
        <button
          onClick={() => setIsOpen(true)}
          className="hover:underline hover:text-blue-400 transition-colors text-xs"
        >
          Disclaimer
        </button>
      </p>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md backdrop-saturate-150"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                ref={modalRef}
                className="bg-gray-900 text-gray-100 rounded-xl shadow-2xl max-w-lg w-full p-6"
              >
                <h2 className="text-lg font-semibold mb-3">Disclaimer</h2>
                <div className="text-sm text-gray-300 space-y-3 leading-relaxed max-h-[70vh] overflow-y-auto">
                  <p>
                    <strong>FuelPrice SA</strong> provides fuel price
                    information for general informational purposes only. While
                    we aim to ensure accuracy, we do not guarantee that the data
                    displayed on this site is always current, complete, or free
                    of errors.
                  </p>
                  <p>
                    The prices shown are based on publicly available sources and
                    may differ slightly from prices at local filling stations.
                    Always verify with your local supplier before making
                    financial decisions.
                  </p>
                  <p>
                    FuelPrice SA is not affiliated with any fuel company,
                    government agency, or regulatory body. Use of this website
                    is at your own risk. We accept no liability for any loss,
                    damage, or inconvenience arising from the use or reliance on
                    the information provided.
                  </p>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
