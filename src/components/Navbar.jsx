import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeContext'

export default function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-[#1B1A55] dark:text-white text-lg">
          Panny
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive}) => `hover:opacity-80 ${isActive ? 'opacity-100' : 'opacity-70'} text-[#1B1A55] dark:text-white`}>
            Home
          </NavLink>
          <NavLink to="/chat" className={({isActive}) => `hover:opacity-80 ${isActive ? 'opacity-100' : 'opacity-70'} text-[#1B1A55] dark:text-white`}>
            Chat
          </NavLink>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur hover:scale-105 transition"
        >
          {theme === 'dark' ? <Sun size={18} className="text-white"/> : <Moon size={18} className="text-[#1B1A55]"/>}
        </button>
      </div>
    </header>
  )
}
