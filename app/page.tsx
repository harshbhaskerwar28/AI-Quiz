'use client'

import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import QuizApp from './components/QuizApp'
import { Moon, Sun } from 'lucide-react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <div className="w-full max-w-4xl">
        <Suspense fallback={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Loading...
          </motion.div>
        }>
          <QuizApp isDarkMode={isDarkMode} />
        </Suspense>
      </div>
    </main>
  )
}

