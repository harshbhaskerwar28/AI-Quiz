'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const categories = ['Tech', 'Science', 'History', 'Geography', 'Entertainment']
const levels = [
  { value: 1, label: 'Beginner', emoji: '🌱' },
  { value: 2, label: 'Intermediate', emoji: '🌿' },
  { value: 3, label: 'Expert', emoji: '🌳' },
  { value: 4, label: 'Master', emoji: '🌴' },
]

interface QuizSetupProps {
  onStart: (setupData: { category: string; level: number; duration: number; questionCount: number }) => void
  isDarkMode: boolean
}

export default function QuizSetup({ onStart, isDarkMode }: QuizSetupProps) {
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [level, setLevel] = useState(1)
  const [duration, setDuration] = useState(15)
  const [questionCount, setQuestionCount] = useState(5)

  const handleStart = () => {
    onStart({ 
      category: category === 'Custom' ? customCategory : category, 
      level, 
      duration, 
      questionCount 
    })
  }

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Craft Your Quest
          </CardTitle>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardDescription className={`text-center text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
            Tailor your adventure! 🎨✨
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="block text-lg text-white font-semibold mb-2">Choose Your Arena 🏟️</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[...categories, 'Custom'].map((cat) => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-4 md:py-6 ${
                  category === cat
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                } ${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold`}
              >
                {cat}
              </Button>
            ))}
          </div>
          {category === 'Custom' && (
            <Input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          )}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-lg text-white font-semibold mb-2">Select Your Power Level 💪</label>
          <div className="grid grid-cols-2 gap-2">
            {levels.map((l) => (
              <Button
                key={l.value}
                onClick={() => setLevel(l.value)}
                className={`py-4 md:py-6 ${
                  level === l.value
                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                    : 'bg-white/20 hover:bg-white/30'
                } text-white font-bold`}
              >
                {l.emoji} {l.label}
              </Button>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-lg text-white font-semibold mb-2">Time per Question ⏱️</label>
          <div className="flex items-center space-x-4">
            <Slider
              min={5}
              max={60}
              step={5}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              className="flex-grow"
            />
            <span className="text-white font-bold text-xl">{duration}s</span>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="block text-lg text-white font-semibold mb-2">Number of Questions 🧠</label>
          <div className="flex items-center space-x-4">
            <Slider
              min={5}
              max={20}
              step={5}
              value={[questionCount]}
              onValueChange={(value) => setQuestionCount(value[0])}
              className="flex-grow"
            />
            <span className="text-white font-bold text-xl">{questionCount}</span>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleStart}
            disabled={!category || (category === 'Custom' && !customCategory)}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl py-4 md:py-6 rounded-full font-bold"
          >
            Launch Your Adventure! 🚀
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

