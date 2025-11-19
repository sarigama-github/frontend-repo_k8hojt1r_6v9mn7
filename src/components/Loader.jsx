import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-live="polite"
          role="status"
        >
          <div className="absolute inset-0 bg-white/90 dark:bg-[#070F2B]/90 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-40 h-40 rounded-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#AFD3E2] via-[#19A7CE] to-[#1B1A55] opacity-80 blur-2xl pointer-events-none" />
            <div className="absolute inset-2 rounded-full bg-white dark:bg-[#1B1A55] shadow-2xl" />
            <div className="absolute inset-6 rounded-full border-2 border-[#19A7CE]/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
