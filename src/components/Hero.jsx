import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F1F1]/70 to-[#F6F1F1] dark:from-[#070F2B]/40 dark:to-[#070F2B] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#1B1A55] via-[#19A7CE] to-[#AFD3E2] dark:from-white dark:via-[#AFD3E2] dark:to-[#19A7CE]"
        >
          Panny — a gentle space to talk and feel heard
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg md:text-xl text-[#1B1A55]/70 dark:text-white/70"
        >
          Thoughtfully designed for calm, clarity, and care — with a soft 3D aura that keeps the vibe serene.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-white bg-[#19A7CE] hover:bg-[#1596b8] transition-colors shadow-lg"
          >
            Start a conversation
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[#1B1A55] bg-white/70 backdrop-blur border border-[#AFD3E2]/60 hover:bg-white transition-colors dark:text-white dark:bg-[#1B1A55]/70 dark:border-white/10"
          >
            Learn more
          </a>
        </motion.div>
      </div>
    </section>
  )
}
