'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

interface OnboardingProps {
  onSubmit: (name: string) => void
  isDarkMode: boolean
}

export default function Onboarding({ onSubmit, isDarkMode }: OnboardingProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
              BrainWave Quiz
            </span>
          </CardTitle>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardDescription className={`text-center text-xl ${isDarkMode ? 'text-gray-300' : 'text-white'} mt-4`}>
            Surf the waves of knowledge! 🧠🌊
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Your Awesome Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/20 border-white/30 text-white placeholder-white/50'} text-lg py-6 text-center rounded-2xl`}
          />
        </motion.form>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl py-6 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Dive In! 🏄‍♂️
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

