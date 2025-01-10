'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const categories = [
  { name: 'Tech', emoji: '💻' },
  { name: 'Science', emoji: '🔬' },
  { name: 'History', emoji: '📜' },
  { name: 'Geography', emoji: '🌍' },
  { name: 'Entertainment', emoji: '🎭' },
]
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
  const [duration, setDuration] = useState<number>(15)
  const [questionCount, setQuestionCount] = useState<number>(5)

  const handleStart = () => {
    onStart({ 
      category: category === 'Custom' ? customCategory : category, 
      level, 
      duration, 
      questionCount 
    })
  }

  const handleDurationChange = useCallback((value: number[]) => {
    setDuration(value[0])
  }, [])

  const handleQuestionCountChange = useCallback((value: number[]) => {
    setQuestionCount(value[0])
  }, [])

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
        {/* Category selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="block text-lg text-white font-semibold mb-2">Choose Your Arena 🏟️</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[...categories, { name: 'Custom', emoji: '✨' }].map((cat) => (
              <Button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`py-4 md:py-6 ${
                  category === cat.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/10 hover:bg-white/20'
                } text-white font-bold transition-all duration-300 transform hover:scale-105 rounded-2xl`}
              >
                <span className="mr-2">{cat.emoji}</span> {cat.name}
              </Button>
            ))}
          </div>
          {category === 'Custom' && (
            <Input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl"
            />
          )}
        </motion.div>
        
        {/* Level selection */}
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
                    : 'bg-white/10 hover:bg-white/20'
                } text-white font-bold transition-all duration-300 transform hover:scale-105 rounded-2xl`}
              >
                {l.emoji} {l.label}
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Time per Question slider */}
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
              onValueChange={handleDurationChange}
              className="flex-grow slider"
            />
            <span className="text-white font-bold text-xl bg-white/10 px-3 py-1 rounded-xl min-w-[60px] text-center">
              {duration}s
            </span>
          </div>
        </motion.div>
        
        {/* Number of Questions slider */}
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
              onValueChange={handleQuestionCountChange}
              className="flex-grow slider"
            />
            <span className="text-white font-bold text-xl bg-white/10 px-3 py-1 rounded-xl min-w-[60px] text-center">
              {questionCount}
            </span>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="overflow-hidden">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleStart}
            disabled={!category || (category === 'Custom' && !customCategory)}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl py-4 md:py-6 rounded-full font-bold transition-all duration-300 hover:shadow-lg"
          >
            Launch Your Adventure! 🚀
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

