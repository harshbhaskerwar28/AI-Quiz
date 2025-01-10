'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { generateQuestions } from '../actions/generateQuestions'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

interface QuizProps {
  category: string
  level: number
  duration: number
  questionCount: number
  onComplete: (score: number, total: number) => void
  onError: (errorMessage: string) => void
  isDarkMode: boolean
}

interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

export default function Quiz({ category, level, duration, questionCount, onComplete, onError, isDarkMode }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const generatedQuestions = await generateQuestions(category, level, questionCount)
        setQuestions(generatedQuestions)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error)
        setIsLoading(false)
        onError(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    }

    fetchQuestions()
  }, [category, level, questionCount, onError])

  useEffect(() => {
    if (isLoading || selectedAnswer !== null || !questions.length) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleNextQuestion()
          return duration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLoading, currentQuestion, selectedAnswer, duration, questions])

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    if (questions[currentQuestion].options[index] === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setTimeLeft(duration)
    } else {
      onComplete(score, questions.length)
    }
  }

  if (isLoading) {
    return (
      <Card className={`w-full backdrop-blur-lg ${isDarkMode ? 'bg-gray-900/50 text-white' : 'bg-white/50 text-gray-800'} border-gray-800`}>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
          <p className="mt-4 text-xl font-bold">Loading your brain teasers...</p>
        </CardContent>
      </Card>
    )
  }

  const currentQuestionData = questions[currentQuestion]

  if (!currentQuestionData) {
    return (
      <Card className={`w-full backdrop-blur-lg ${isDarkMode ? 'bg-gray-900/50 text-white' : 'bg-white/50 text-gray-800'} border-gray-800`}>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4 text-xl font-bold">Oops! No questions available. Let's try again!</p>
          <Button onClick={() => window.location.reload()} className="mt-4 btn btn-primary animate-pulse">
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full backdrop-blur-lg ${isDarkMode ? 'bg-gray-900/50 text-white' : 'bg-white/50 text-gray-800'} border-gray-800`}>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-semibold">Time left: {timeLeft}s</div>
          <div className="w-1/2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ width: "0%" }}
              animate={{ width: `${100 - (timeLeft / duration) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.p
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-xl md:text-2xl mb-6 text-center font-bold"
        >
          {currentQuestionData.question}
        </motion.p>
        <AnimatePresence mode="wait">
          <motion.div className="space-y-4" key={currentQuestion}>
            {currentQuestionData.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full justify-start text-left text-base md:text-lg py-3 md:py-4 ${
                    selectedAnswer === index
                      ? option === currentQuestionData.correctAnswer
                        ? 'bg-green-500/50 hover:bg-green-600/50'
                        : 'bg-red-500/50 hover:bg-red-600/50'
                      : selectedAnswer !== null && option === currentQuestionData.correctAnswer
                      ? 'bg-green-500/50 hover:bg-green-600/50'
                      : 'bg-white/10 hover:bg-white/20'
                  } text-white transition-all duration-300 overflow-hidden rounded-2xl`}
                >
                  <div className="flex items-center w-full">
                    <span className="mr-2 flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-grow truncate">{option}</span>
                    {selectedAnswer === index && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 flex-shrink-0"
                      >
                        {option === currentQuestionData.correctAnswer ? (
                          <CheckCircle className="inline-block w-6 h-6 text-white animate-bounce" />
                        ) : (
                          <XCircle className="inline-block w-6 h-6 text-white animate-pulse" />
                        )}
                      </motion.span>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="overflow-hidden">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null && timeLeft > 0}
            className="w-full btn btn-tertiary rounded-full"
          >
            {currentQuestion < questions.length - 1 ? 'Next Brain Teaser! 🧠' : 'Finish Quiz! 🎉'}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

