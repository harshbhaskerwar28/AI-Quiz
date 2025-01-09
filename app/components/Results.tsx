'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import confetti from 'canvas-confetti'

interface ResultsProps {
  name: string
  score: number
  totalQuestions: number
  onRestart: () => void
  isDarkMode: boolean
}

export default function Results({ name, score, totalQuestions, onRestart, isDarkMode }: ResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A', emoji: '🏆' }
    if (percentage >= 80) return { grade: 'B', emoji: '🎉' }
    if (percentage >= 70) return { grade: 'C', emoji: '👍' }
    if (percentage >= 60) return { grade: 'D', emoji: '😊' }
    return { grade: 'F', emoji: '💪' }
  }

  const { grade, emoji } = getGrade(percentage)

  useEffect(() => {
    if (percentage >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [percentage])

  return (
    <Card className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} border-none shadow-none`}>
      <CardHeader>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Quiz Results <span role="img" aria-label="result emoji">{emoji}</span>
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-2xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Great effort, {name}!
          </motion.p>
          <motion.div
            className={`text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {score} / {totalQuestions}
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ width: "0%" }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className={`text-3xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Grade: {grade}
          </motion.p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {percentage}%
          </motion.p>
        </motion.div>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onRestart} 
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl py-6 rounded-full font-bold"
          >
            Challenge Yourself Again! 🚀
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

