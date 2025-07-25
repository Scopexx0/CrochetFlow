"use client"
import emailjs from 'emailjs-com'

// ⚠️ Reemplazá estos con tus datos de EmailJS
const SERVICE_ID = 'service_wrrlzbs'
const TEMPLATE_ID = 'template_q946j7e'
const PUBLIC_KEY = 'fJBMventz8cUyRXA8'

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send, Star, Bug, Lightbulb, Heart } from "lucide-react"
import { useTranslation, type Language } from "@/lib/translations"

interface FeedbackButtonProps {
  language: Language
}

export function FeedbackButton({ language }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"bug" | "feature" | "general" | "love">("general")
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const t = useTranslation(language)

  const feedbackTypes = [
    {
      id: "bug" as const,
      label: t.reportBug || "Report Bug",
      icon: Bug,
      color: "text-red-600 bg-red-50 border-red-200",
      description: t.reportBugDesc || "Found something that's not working?",
    },
    {
      id: "feature" as const,
      label: t.requestFeature || "Request Feature",
      icon: Lightbulb,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description: t.requestFeatureDesc || "Have an idea for improvement?",
    },
    {
      id: "general" as const,
      label: t.generalFeedback || "General Feedback",
      icon: MessageSquare,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description: t.generalFeedbackDesc || "Share your thoughts with us",
    },
    {
      id: "love" as const,
      label: t.showLove || "Show Love",
      icon: Heart,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      description: t.showLoveDesc || "Tell us what you love about the app!",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const templateParams = {
      type: feedbackType,
      feedback,
      email: email || 'No proporcionado',
      rating: rating.toString(),
      language,
      userAgent: navigator.userAgent,
    }

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      console.log("Email enviado:", result.text)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar feedback:", error)
      alert("Error al enviar feedback. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)

      setTimeout(() => {
        setIsSubmitted(false)
        setIsOpen(false)
        setFeedback("")
        setEmail("")
        setRating(0)
        setFeedbackType("general")
      }, 3000)
    }
  }

  const selectedType = feedbackTypes.find((type) => type.id === feedbackType)

  if (isSubmitted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="bg-green-50 border-green-200 shadow-lg max-w-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">{t.thankYou || "Thank you!"}</p>
                <p className="text-sm text-green-600">{t.feedbackReceived || "Your feedback helps us improve!"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0"
        aria-label={t.giveFeedback || "Give Feedback"}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      {/* Feedback Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

          {/* Modal */}
          <div className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50">
            <Card className="bg-white/95 backdrop-blur-md border shadow-2xl h-full sm:h-auto overflow-y-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <MessageSquare className="w-5 h-5" />
                      {t.feedback || "Feedback"}
                    </CardTitle>
                    <CardDescription>
                      {t.feedbackDesc || "Help us make CrochetCraft better for everyone!"}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback Type Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      {t.feedbackType || "What type of feedback do you have?"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFeedbackType(type.id)}
                            className={`p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                              feedbackType === type.id
                                ? type.color
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-4 h-4" />
                              <span className="font-medium text-sm">{type.label}</span>
                            </div>
                            <p className="text-xs opacity-80">{type.description}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Rating (for general feedback and love) */}
                  {(feedbackType === "general" || feedbackType === "love") && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        {t.rateExperience || "How would you rate your experience?"}
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`p-1 rounded transition-colors ${
                              star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                            }`}
                          >
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback Text */}
                  <div className="space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium text-gray-700">
                      {selectedType?.label}
                    </label>
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder={
                        feedbackType === "bug"
                          ? t.bugPlaceholder || "Describe the bug you encountered..."
                          : feedbackType === "feature"
                            ? t.featurePlaceholder || "Describe the feature you'd like to see..."
                            : feedbackType === "love"
                              ? t.lovePlaceholder || "Tell us what you love about CrochetCraft..."
                              : t.generalPlaceholder || "Share your thoughts..."
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Email (optional) */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t.emailOptional || "Email (optional)"}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder || "your@email.com"}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      {t.emailNote || "We'll only use this to follow up on your feedback if needed."}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {t.cancel || "Cancel"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={!feedback.trim() || isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t.sending || "Sending..."}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          {t.sendFeedback || "Send Feedback"}
                        </div>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Heart className="w-3 h-3" />
                    <span>{t.madeWithLove || "Made with love for the crochet community"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
