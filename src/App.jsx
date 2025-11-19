import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { ThemeProvider } from './components/ThemeContext'

function HomePage() {
  return (
    <main>
      <Hero />
      <section id="about" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold text-[#1B1A55] dark:text-white">Why Panny?</h2>
        <p className="mt-4 text-[#1B1A55]/70 dark:text-white/70 leading-relaxed">
          A gentle companion for your inner weather. Panny blends a calm visual aura, empathetic prompts, and a privacy-first design to make self-support feel natural.
        </p>
      </section>
      <Footer />
    </main>
  )
}

function ChatPage() {
  const [conversationId, setConversationId] = useState(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setLoading(true)

    // optimistic UI
    const tempId = Date.now().toString()
    setMessages(m => [...m, { id: tempId, role: 'user', content: text }])
    setInput('')

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId, message: text })
      })
      if (!res.ok) throw new Error('Failed to send')
      const data = await res.json()
      setConversationId(data.conversation_id)
      const newMsgs = data.messages?.map((m, idx) => ({ id: `${data.conversation_id}-${idx}`, ...m })) || []
      setMessages(newMsgs)
    } catch (e) {
      setMessages(m => [...m, { id: `${tempId}-err`, role: 'assistant', content: 'Sorry, I had trouble responding. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!conversationId) return
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/conversations/${conversationId}/messages`)
        if (res.ok) {
          const arr = await res.json()
          setMessages(arr.map((m, idx) => ({ id: `${conversationId}-${idx}`, ...m })))
        }
      } catch {}
    }
    load()
  }, [conversationId])

  return (
    <div className="min-h-screen pt-20 bg-[#F6F1F1] dark:bg-[#070F2B]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-[#1B1A55] dark:text-white">Talk to Panny</h1>
          <p className="mt-1 text-[#1B1A55]/70 dark:text-white/70">A calm, private space just for you.</p>
        </div>
        <div className="rounded-2xl border border-[#AFD3E2]/50 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-sm text-[#1B1A55]/60 dark:text-white/60">Say anything — I'm here with you.</div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-[#19A7CE] text-white' : 'bg-[#AFD3E2]/40 text-[#1B1A55] dark:bg-white/10 dark:text-white'} rounded-2xl px-4 py-2 max-w-[80%]`}>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#AFD3E2]/50 dark:border-white/10">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                placeholder="Type a message"
                className="flex-1 bg-white dark:bg-white/5 border border-[#AFD3E2]/60 dark:border-white/10 rounded-xl px-3 py-3 text-[#1B1A55] dark:text-white outline-none"
              />
              <button
                onClick={send}
                className="rounded-xl px-5 py-3 bg-[#19A7CE] hover:bg-[#1596b8] text-white disabled:opacity-60"
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PageTransitions() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <>
      <Loader show={loading} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F6F1F1] dark:bg-[#070F2B]">
        <Navbar />
        <PageTransitions />
      </div>
    </ThemeProvider>
  )
}
