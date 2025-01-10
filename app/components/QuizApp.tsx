'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Onboarding from './Onboarding'
import QuizSetup from './QuizSetup'
import Quiz from './Quiz'
import Results from './Results'
import { Card, CardContent } from '@/components/ui/card'

interface QuizAppProps {
  isDarkMode: boolean
}

export type QuizState = 'onboarding' | 'setup' | 'quiz' | 'results'

export default function QuizApp({ isDarkMode }: QuizAppProps) {
  const [state, setState] = useState<QuizState>('onboarding')
  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState(1)
  const [duration, setDuration] = useState(15)
  const [questionCount, setQuestionCount] = useState(5)
  const [error, setError] = useState<string | null>(null)

  const handleStateChange = (newState: QuizState) => {
    setState(newState)
  }

  const handleNameSubmit = (submittedName: string) => {
    setName(submittedName)
    setState('setup')
  }

  const handleQuizSetup = (setupData: { category: string; level: number; duration: number; questionCount: number }) => {
    setCategory(setupData.category)
    setLevel(setupData.level)
    setDuration(setupData.duration)
    setQuestionCount(setupData.questionCount)
    setState('quiz')
  }

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore)
    setTotalQuestions(total)
    setError(null)
    setState('results')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setState('setup')
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg opacity-50 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full mb-4"
          >
            <Card className="bg-red-500/10 border-red-500 text-red-500">
              <CardContent className="py-2">
                <p>{error}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`w-full backdrop-blur-lg ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-lg shadow-xl overflow-hidden`}
        >
          {state === 'onboarding' && <Onboarding onSubmit={handleNameSubmit} isDarkMode={isDarkMode} />}
          {state === 'setup' && <QuizSetup onStart={handleQuizSetup} isDarkMode={isDarkMode} />}
          {state === 'quiz' && (
            <Quiz
              category={category}
              level={level}
              duration={duration}
              questionCount={questionCount}
              onComplete={handleQuizComplete}
              onError={handleError}
              isDarkMode={isDarkMode}
            />
          )}
          {state === 'results' && (
            <Results
              name={name}
              score={score}
              totalQuestions={totalQuestions}
              onRestart={() => setState('setup')}
              isDarkMode={isDarkMode}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

