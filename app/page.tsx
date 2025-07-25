"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  Clock,
  DollarSign,
  Sparkles,
  Camera,
  FileImage,
  Palette,
  Calendar,
  Target,
  History,
} from "lucide-react"
import { detectUserLanguage, useTranslation, formatCurrency, type Language } from "@/lib/translations"
import { LanguageSelector } from "@/components/language-selector"
import { FeedbackButton } from "@/components/feedback-button"

export default function CrochetCalculatorApp() {
  const [language, setLanguage] = useState<Language>("en")
  const [isLanguageDetected, setIsLanguageDetected] = useState(false)

  useEffect(() => {
    const detectedLang = detectUserLanguage()
    setLanguage(detectedLang)
    setIsLanguageDetected(true)
  }, [])

  const t = useTranslation(language)

  const [projectData, setProjectData] = useState({
    projectName: "",
    yarnCost: "",
    additionalMaterials: "",
    estimatedHours: "",
    hourlyRate: "",
    difficultyLevel: "beginner",
    projectType: "accessories",
    stitchComplexity: "basic",
    projectSize: "small",
    marketPosition: "standard",
    customPattern: false,
  })

  const [timeData, setTimeData] = useState({
    projectName: "",
    projectType: "accessories",
    projectSize: "small",
    difficultyLevel: "beginner",
    stitchComplexity: "basic",
    estimatedStitches: "",
    userSkillLevel: "intermediate",
    crochetsPerMinute: "",
    hoursPerDay: "",
    daysPerWeek: "",
    includeBreaks: true,
    breakPercentage: "20",
  })

  const [results, setResults] = useState<{
    totalTime: number
    adjustedTime: number
    materialCost: number
    laborCost: number
    totalCost: number
    suggestedPrice: number
    breakdown: {
      difficultyMultiplier: number
      complexityMultiplier: number
      sizeMultiplier: number
      marketMultiplier: number
      patternMultiplier: number
    }
  } | null>(null)

  const [timeResults, setTimeResults] = useState<{
    totalStitches: number
    baseTimeHours: number
    adjustedTimeHours: number
    dailyProgress: number
    estimatedDays: number
    estimatedWeeks: number
    completionDate: string
  } | null>(null)

  const [stitchCounter, setStitchCounter] = useState({
    currentCount: 0,
    targetCount: 0,
    isActive: false,
    startTime: null as Date | null,
    sessionTime: 0,
    stitchesPerMinute: 0,
  })

  const [projectHistory, setProjectHistory] = useState<
    Array<{
      id: string
      timestamp: Date
      type: "pricing" | "time"
      projectName: string
      data: any
      results: any
    }>
  >([])

  // Difficulty multipliers
  const difficultyMultipliers = {
    beginner: 1.0,
    intermediate: 1.3,
    advanced: 1.6,
    expert: 2.0,
  }

  // Project type multipliers
  const projectTypeMultipliers = {
    accessories: 1.0,
    clothing: 1.2,
    home_decor: 1.1,
    toys_amigurumi: 1.4,
    blankets: 1.3,
    bags_purses: 1.2,
  }

  // Stitch complexity multipliers
  const stitchComplexityMultipliers = {
    basic: 1.0,
    intermediate: 1.2,
    advanced: 1.5,
    intricate: 1.8,
  }

  // Project size multipliers
  const projectSizeMultipliers = {
    small: 1.0,
    medium: 1.2,
    large: 1.4,
    extra_large: 1.6,
  }

  // Market positioning multipliers
  const marketPositionMultipliers = {
    budget: 1.2,
    standard: 1.5,
    premium: 2.0,
    luxury: 2.5,
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTimeInputChange = (field: string, value: string | boolean) => {
    setTimeData((prev) => ({ ...prev, [field]: value }))
  }

  const saveToHistory = (type: "pricing" | "time", data: any, results: any) => {
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      projectName: type === "pricing" ? projectData.projectName : timeData.projectName,
      data: { ...data },
      results: { ...results },
    }

    setProjectHistory((prev) => [historyItem, ...prev].slice(0, 20)) // Keep last 20 projects
  }

  const calculateProject = () => {
    const yarnCost = Number.parseFloat(projectData.yarnCost) || 0
    const materialsCost = Number.parseFloat(projectData.additionalMaterials) || 0
    const baseHours = Number.parseFloat(projectData.estimatedHours) || 0
    const hourlyRate = Number.parseFloat(projectData.hourlyRate) || 0

    // Get all multipliers
    const difficultyMultiplier =
      difficultyMultipliers[projectData.difficultyLevel as keyof typeof difficultyMultipliers]
    const projectMultiplier = projectTypeMultipliers[projectData.projectType as keyof typeof projectTypeMultipliers]
    const complexityMultiplier =
      stitchComplexityMultipliers[projectData.stitchComplexity as keyof typeof stitchComplexityMultipliers]
    const sizeMultiplier = projectSizeMultipliers[projectData.projectSize as keyof typeof projectSizeMultipliers]
    const marketMultiplier =
      marketPositionMultipliers[projectData.marketPosition as keyof typeof marketPositionMultipliers]
    const patternMultiplier = projectData.customPattern ? 1.3 : 1.0

    // Calculate adjusted time with all complexity factors
    const timeMultiplier =
      difficultyMultiplier * projectMultiplier * complexityMultiplier * sizeMultiplier * patternMultiplier
    const adjustedTime = baseHours * timeMultiplier

    // Calculate costs
    const materialCost = yarnCost + materialsCost
    const laborCost = adjustedTime * hourlyRate
    const totalCost = materialCost + laborCost

    // Calculate suggested price with market positioning
    const suggestedPrice = totalCost * marketMultiplier

    const newResults = {
      totalTime: baseHours,
      adjustedTime: adjustedTime,
      materialCost: materialCost,
      laborCost: laborCost,
      totalCost: totalCost,
      suggestedPrice: suggestedPrice,
      breakdown: {
        difficultyMultiplier,
        complexityMultiplier: projectMultiplier * complexityMultiplier,
        sizeMultiplier,
        marketMultiplier,
        patternMultiplier,
      },
    }

    setResults(newResults)

    // Save to history
    if (projectData.projectName.trim()) {
      saveToHistory("pricing", projectData, newResults)
    }
  }

  const calculateTime = () => {
    const stitches = Number.parseFloat(timeData.estimatedStitches) || 0
    const stitchesPerMinute = Number.parseFloat(timeData.crochetsPerMinute) || 10
    const hoursPerDay = Number.parseFloat(timeData.hoursPerDay) || 1
    const daysPerWeek = Number.parseFloat(timeData.daysPerWeek) || 5
    const breakPercentage = timeData.includeBreaks ? Number.parseFloat(timeData.breakPercentage) / 100 : 0

    // Get complexity multipliers (reuse existing ones)
    const difficultyMultiplier = difficultyMultipliers[timeData.difficultyLevel as keyof typeof difficultyMultipliers]
    const projectMultiplier = projectTypeMultipliers[timeData.projectType as keyof typeof projectTypeMultipliers]
    const complexityMultiplier =
      stitchComplexityMultipliers[timeData.stitchComplexity as keyof typeof stitchComplexityMultipliers]
    const sizeMultiplier = projectSizeMultipliers[timeData.projectSize as keyof typeof projectSizeMultipliers]

    // Skill level multipliers (faster for experienced crocheters)
    const skillMultipliers = {
      beginner: 1.5,
      intermediate: 1.0,
      advanced: 0.8,
      expert: 0.6,
    }
    const skillMultiplier = skillMultipliers[timeData.userSkillLevel as keyof typeof skillMultipliers]

    // Calculate base time
    const baseTimeMinutes = stitches / stitchesPerMinute
    const baseTimeHours = baseTimeMinutes / 60

    // Apply all multipliers
    const complexityFactor = difficultyMultiplier * projectMultiplier * complexityMultiplier * sizeMultiplier
    const adjustedTimeHours = baseTimeHours * complexityFactor * skillMultiplier

    // Add break time
    const finalTimeHours = adjustedTimeHours * (1 + breakPercentage)

    // Calculate completion timeline - fix the logic here
    const estimatedDays = Math.max(1, Math.ceil(finalTimeHours / hoursPerDay))
    const estimatedWeeks = estimatedDays / 7

    // Calculate daily progress - cap at total stitches
    const dailyProgress = Math.min(stitches, stitches / estimatedDays)

    // Calculate completion date
    const today = new Date()
    const completionDate = new Date(today.getTime() + estimatedDays * 24 * 60 * 60 * 1000)

    const newTimeResults = {
      totalStitches: stitches,
      baseTimeHours: baseTimeHours,
      adjustedTimeHours: finalTimeHours,
      dailyProgress: dailyProgress,
      estimatedDays: estimatedDays,
      estimatedWeeks: estimatedWeeks,
      completionDate: completionDate.toLocaleDateString(),
    }

    setTimeResults(newTimeResults)

    // Save to history
    if (timeData.projectName.trim()) {
      saveToHistory("time", timeData, newTimeResults)
    }
  }

  const incrementStitch = () => {
    setStitchCounter((prev) => {
      const newCount = prev.currentCount + 1
      const now = new Date()

      if (prev.startTime && newCount > 0) {
        const elapsedMinutes = (now.getTime() - prev.startTime.getTime()) / (1000 * 60)
        const stitchesPerMinute = elapsedMinutes > 0 ? newCount / elapsedMinutes : 0

        return {
          ...prev,
          currentCount: newCount,
          stitchesPerMinute: Math.round(stitchesPerMinute * 10) / 10,
        }
      }

      return { ...prev, currentCount: newCount }
    })
  }

  const decrementStitch = () => {
    setStitchCounter((prev) => ({
      ...prev,
      currentCount: Math.max(0, prev.currentCount - 1),
    }))
  }

  const resetCounter = () => {
    setStitchCounter((prev) => ({
      ...prev,
      currentCount: 0,
      startTime: null,
      sessionTime: 0,
      stitchesPerMinute: 0,
    }))
  }

  const startCounter = () => {
    setStitchCounter((prev) => ({
      ...prev,
      isActive: true,
      startTime: new Date(),
      currentCount: 0,
      stitchesPerMinute: 0,
    }))
  }

  const stopCounter = () => {
    setStitchCounter((prev) => ({
      ...prev,
      isActive: false,
    }))
  }

  const setTargetCount = (target: number) => {
    setStitchCounter((prev) => ({
      ...prev,
      targetCount: target,
    }))
  }

  const useCounterForEstimate = () => {
    if (stitchCounter.stitchesPerMinute > 0) {
      handleTimeInputChange("crochetsPerMinute", stitchCounter.stitchesPerMinute.toString())
    }
  }

  const add10Stitches = () => {
    setStitchCounter((prev) => {
      const newCount = prev.currentCount + 10
      const now = new Date()

      if (prev.startTime && newCount > 0) {
        const elapsedMinutes = (now.getTime() - prev.startTime.getTime()) / (1000 * 60)
        const stitchesPerMinute = elapsedMinutes > 0 ? newCount / elapsedMinutes : 0

        return {
          ...prev,
          currentCount: newCount,
          stitchesPerMinute: Math.round(stitchesPerMinute * 10) / 10,
        }
      }

      return { ...prev, currentCount: newCount }
    })
  }

  // Don't render until language is detected to prevent flash
  if (!isLanguageDetected) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
          }}
        ></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(236, 72, 153, 0.1) 40%, rgba(236, 72, 153, 0.1) 60%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(251, 146, 60, 0.1) 40%, rgba(251, 146, 60, 0.1) 60%, transparent 60%)
          `,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating yarn-like elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-32 bg-gradient-to-b from-rose-400/20 to-transparent rounded-full transform rotate-45 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-24 bg-gradient-to-b from-orange-400/20 to-transparent rounded-full transform -rotate-45 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-28 bg-gradient-to-b from-purple-400/20 to-transparent rounded-full transform rotate-12 animate-pulse delay-500"></div>
      </div>

      {/* Circuit-like connecting lines */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#circuitGrad)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M200,400 Q400,300 600,400 T1000,400"
            stroke="url(#circuitGrad)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,600 Q200,500 400,600 T800,600"
            stroke="url(#circuitGrad)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <circle cx="300" cy="200" r="4" fill="#ec4899" opacity="0.4" />
          <circle cx="600" cy="400" r="4" fill="#fb923c" opacity="0.4" />
          <circle cx="400" cy="600" r="4" fill="#a855f7" opacity="0.4" />
        </svg>
      </div>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 via-orange-400 to-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/25">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile-optimized Language Selector */}
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                {t.mvp}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 backdrop-blur-md border border-white/10">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">{t.pricing}</span>
            </TabsTrigger>
            <TabsTrigger value="time-calculator" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">{t.time}</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">{t.history}</span>
            </TabsTrigger>
            <TabsTrigger value="ai-generate" className="flex items-center gap-2" disabled>
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t.aiGenerate}</span>
            </TabsTrigger>
            <TabsTrigger value="photo-to-chart" className="flex items-center gap-2" disabled>
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">{t.photoToChart}</span>
            </TabsTrigger>
            <TabsTrigger value="chart-to-image" className="flex items-center gap-2" disabled>
              <FileImage className="w-4 h-4" />
              <span className="hidden sm:inline">{t.chartToImage}</span>
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Form */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-rose-800">
                    <Calculator className="w-5 h-5" />
                    {t.projectCalculator}
                  </CardTitle>
                  <CardDescription>{t.projectCalculatorDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">{t.projectName}</Label>
                    <Input
                      id="projectName"
                      placeholder={t.projectNamePlaceholder}
                      value={projectData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yarnCost">
                        {t.yarnCost} ({t.currency})
                      </Label>
                      <Input
                        id="yarnCost"
                        type="number"
                        step="0.01"
                        placeholder="25.00"
                        value={projectData.yarnCost}
                        onChange={(e) => handleInputChange("yarnCost", e.target.value)}
                        className="border-rose-200 focus:border-rose-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalMaterials">
                        {t.otherMaterials} ({t.currency})
                      </Label>
                      <Input
                        id="additionalMaterials"
                        type="number"
                        step="0.01"
                        placeholder="5.00"
                        value={projectData.additionalMaterials}
                        onChange={(e) => handleInputChange("additionalMaterials", e.target.value)}
                        className="border-rose-200 focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedHours">{t.baseHoursEstimate}</Label>
                      <Input
                        id="estimatedHours"
                        type="number"
                        step="0.5"
                        placeholder="12"
                        value={projectData.estimatedHours}
                        onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                        className="border-rose-200 focus:border-rose-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">
                        {t.hourlyRate} ({t.currency})
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        step="0.01"
                        placeholder="15.00"
                        value={projectData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        className="border-rose-200 focus:border-rose-400"
                      />
                    </div>
                  </div>

                  {/* Difficulty and Complexity Section */}
                  <div className="space-y-4 p-4 bg-rose-50 rounded-lg border border-rose-200">
                    <h4 className="font-medium text-rose-800">{t.projectComplexity}</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="difficultyLevel">{t.difficultyLevel}</Label>
                        <select
                          id="difficultyLevel"
                          value={projectData.difficultyLevel}
                          onChange={(e) => handleInputChange("difficultyLevel", e.target.value)}
                          className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                        >
                          <option value="beginner">{t.beginner} (1.0x)</option>
                          <option value="intermediate">{t.intermediate} (1.3x)</option>
                          <option value="advanced">{t.advanced} (1.6x)</option>
                          <option value="expert">{t.expert} (2.0x)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectType">{t.projectType}</Label>
                        <select
                          id="projectType"
                          value={projectData.projectType}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                        >
                          <option value="accessories">{t.accessories} (1.0x)</option>
                          <option value="clothing">{t.clothing} (1.2x)</option>
                          <option value="home_decor">{t.homeDecor} (1.1x)</option>
                          <option value="toys_amigurumi">{t.toysAmigurumi} (1.4x)</option>
                          <option value="blankets">{t.blankets} (1.3x)</option>
                          <option value="bags_purses">{t.bagsPurses} (1.2x)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stitchComplexity">{t.stitchComplexity}</Label>
                        <select
                          id="stitchComplexity"
                          value={projectData.stitchComplexity}
                          onChange={(e) => handleInputChange("stitchComplexity", e.target.value)}
                          className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                        >
                          <option value="basic">{t.basicStitches} (1.0x)</option>
                          <option value="intermediate">{t.intermediate} (1.2x)</option>
                          <option value="advanced">{t.advanced} (1.5x)</option>
                          <option value="intricate">{t.intricate} (1.8x)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectSize">{t.projectSize}</Label>
                        <select
                          id="projectSize"
                          value={projectData.projectSize}
                          onChange={(e) => handleInputChange("projectSize", e.target.value)}
                          className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                        >
                          <option value="small">{t.small} (1.0x)</option>
                          <option value="medium">{t.medium} (1.2x)</option>
                          <option value="large">{t.large} (1.4x)</option>
                          <option value="extra_large">{t.extraLarge} (1.6x)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="marketPosition">{t.marketPosition}</Label>
                        <select
                          id="marketPosition"
                          value={projectData.marketPosition}
                          onChange={(e) => handleInputChange("marketPosition", e.target.value)}
                          className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                        >
                          <option value="budget">{t.budgetMarket} (1.2x)</option>
                          <option value="standard">{t.standardMarket} (1.5x)</option>
                          <option value="premium">{t.premiumMarket} (2.0x)</option>
                          <option value="luxury">{t.luxuryMarket} (2.5x)</option>
                        </select>
                      </div>

                      <div className="space-y-2 flex items-end">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={projectData.customPattern}
                            onChange={(e) => handleInputChange("customPattern", e.target.checked)}
                            className="rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                          />
                          <span className="text-sm">{t.customPattern} (+30%)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateProject}
                    className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                  >
                    {t.calculateAdvancedPricing}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <DollarSign className="w-5 h-5" />
                    {t.projectResults}
                  </CardTitle>
                  <CardDescription>{t.projectResultsDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-4">
                      {/* Main Results */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-blue-800">{t.timeEstimate}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg text-blue-700">
                              {t.base}: {results.totalTime} {t.hours}
                            </p>
                            <p className="text-2xl font-bold text-blue-900">
                              {t.adjusted}: {results.adjustedTime.toFixed(1)} {t.hours}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800">{t.costBreakdown}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-green-700">
                              {t.materials}: {formatCurrency(results.materialCost, language)}
                            </p>
                            <p className="text-sm text-green-700">
                              {t.labor}: {formatCurrency(results.laborCost, language)}
                            </p>
                            <p className="text-xl font-bold text-green-900">
                              {t.totalCost}: {formatCurrency(results.totalCost, language)}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-purple-800">{t.suggestedSellingPrice}</span>
                          </div>
                          <p className="text-3xl font-bold text-purple-900">
                            {formatCurrency(results.suggestedPrice, language)}
                          </p>
                          <p className="text-sm text-purple-600 mt-1">
                            {t.profit}: {formatCurrency(results.suggestedPrice - results.totalCost, language)}
                          </p>
                        </div>
                      </div>

                      {/* Multiplier Breakdown */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-medium text-amber-800 mb-3">{t.complexityMultipliers}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-amber-700">{t.difficulty}:</span>
                            <span className="font-medium">{results.breakdown.difficultyMultiplier.toFixed(1)}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-700">{t.projectType}:</span>
                            <span className="font-medium">{results.breakdown.complexityMultiplier.toFixed(1)}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-700">{t.size}:</span>
                            <span className="font-medium">{results.breakdown.sizeMultiplier.toFixed(1)}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-700">{t.market}:</span>
                            <span className="font-medium">{results.breakdown.marketMultiplier.toFixed(1)}x</span>
                          </div>
                          {projectData.customPattern && (
                            <div className="flex justify-between col-span-2">
                              <span className="text-amber-700">{t.customPattern}:</span>
                              <span className="font-medium">{results.breakdown.patternMultiplier.toFixed(1)}x</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {projectData.projectName && (
                        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                          <p className="text-sm text-rose-800">
                            <strong>{projectData.projectName}</strong> - {t.pricedCompetitively}{" "}
                            {projectData.marketPosition} {t.marketSuffix}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>{t.fillFormMessage}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Time Calculator Tab */}
          <TabsContent value="time-calculator" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Time Input Form */}
              <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Clock className="w-5 h-5" />
                    {t.timeCalculator}
                  </CardTitle>
                  <CardDescription>{t.timeCalculatorDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeProjectName">{t.projectName}</Label>
                    <Input
                      id="timeProjectName"
                      placeholder={t.projectNamePlaceholder}
                      value={timeData.projectName}
                      onChange={(e) => handleTimeInputChange("projectName", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeProjectType">{t.projectType}</Label>
                      <select
                        id="timeProjectType"
                        value={timeData.projectType}
                        onChange={(e) => handleTimeInputChange("projectType", e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                      >
                        <option value="accessories">{t.accessories}</option>
                        <option value="clothing">{t.clothing}</option>
                        <option value="home_decor">{t.homeDecor}</option>
                        <option value="toys_amigurumi">{t.toysAmigurumi}</option>
                        <option value="blankets">{t.blankets}</option>
                        <option value="bags_purses">{t.bagsPurses}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeProjectSize">{t.projectSize}</Label>
                      <select
                        id="timeProjectSize"
                        value={timeData.projectSize}
                        onChange={(e) => handleTimeInputChange("projectSize", e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                      >
                        <option value="small">{t.small}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="large">{t.large}</option>
                        <option value="extra_large">{t.extraLarge}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeDifficultyLevel">{t.patternDifficulty}</Label>
                      <select
                        id="timeDifficultyLevel"
                        value={timeData.difficultyLevel}
                        onChange={(e) => handleTimeInputChange("difficultyLevel", e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                      >
                        <option value="beginner">{t.beginner}</option>
                        <option value="intermediate">{t.intermediate}</option>
                        <option value="advanced">{t.advanced}</option>
                        <option value="expert">{t.expert}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeStitchComplexity">{t.stitchComplexity}</Label>
                      <select
                        id="timeStitchComplexity"
                        value={timeData.stitchComplexity}
                        onChange={(e) => handleTimeInputChange("stitchComplexity", e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                      >
                        <option value="basic">{t.basicStitches}</option>
                        <option value="intermediate">{t.intermediate}</option>
                        <option value="advanced">{t.advanced}</option>
                        <option value="intricate">{t.intricate}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedStitches">{t.estimatedTotalStitches}</Label>
                    <Input
                      id="estimatedStitches"
                      type="number"
                      placeholder="5000"
                      value={timeData.estimatedStitches}
                      onChange={(e) => handleTimeInputChange("estimatedStitches", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <p className="text-xs text-gray-600">{t.stitchTip}</p>
                  </div>

                  {/* Personal Speed Section */}
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">{t.yourCrochetingSpeed}</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userSkillLevel">{t.yourSkillLevel}</Label>
                        <select
                          id="userSkillLevel"
                          value={timeData.userSkillLevel}
                          onChange={(e) => handleTimeInputChange("userSkillLevel", e.target.value)}
                          className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                        >
                          <option value="beginner">{t.beginnerSlower}</option>
                          <option value="intermediate">{t.intermediate}</option>
                          <option value="advanced">{t.advanced}</option>
                          <option value="expert">{t.expertFaster}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crochetsPerMinute">{t.stitchesPerMinute}</Label>
                        <Input
                          id="crochetsPerMinute"
                          type="number"
                          placeholder="15"
                          value={timeData.crochetsPerMinute}
                          onChange={(e) => handleTimeInputChange("crochetsPerMinute", e.target.value)}
                          className="border-blue-200 focus:border-blue-400"
                        />
                        <p className="text-xs text-gray-600">{t.averageSpeed}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hoursPerDay">{t.hoursPerDay}</Label>
                        <Input
                          id="hoursPerDay"
                          type="number"
                          step="0.5"
                          placeholder="2"
                          value={timeData.hoursPerDay}
                          onChange={(e) => handleTimeInputChange("hoursPerDay", e.target.value)}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="daysPerWeek">{t.daysPerWeek}</Label>
                        <Input
                          id="daysPerWeek"
                          type="number"
                          placeholder="5"
                          value={timeData.daysPerWeek}
                          onChange={(e) => handleTimeInputChange("daysPerWeek", e.target.value)}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={timeData.includeBreaks}
                          onChange={(e) => handleTimeInputChange("includeBreaks", e.target.checked)}
                          className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{t.includeBreaks}</span>
                      </label>
                      {timeData.includeBreaks && (
                        <div className="ml-6 space-y-2">
                          <Label htmlFor="breakPercentage">{t.breakTime}</Label>
                          <Input
                            id="breakPercentage"
                            type="number"
                            placeholder="20"
                            value={timeData.breakPercentage}
                            onChange={(e) => handleTimeInputChange("breakPercentage", e.target.value)}
                            className="border-blue-200 focus:border-blue-400 w-20"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stitch Counter Section */}
                  <div className="space-y-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-indigo-800">{t.builtInStitchCounter}</h4>
                      <Badge variant="outline" className="border-indigo-300 text-indigo-600">
                        {t.liveCounter}
                      </Badge>
                    </div>

                    <div className="text-center space-y-4">
                      <div className="bg-white rounded-lg p-6 border border-indigo-200">
                        <div className="text-6xl font-bold text-indigo-900 mb-2">{stitchCounter.currentCount}</div>
                        {stitchCounter.targetCount > 0 && (
                          <div className="text-sm text-indigo-600">
                            of {stitchCounter.targetCount} {t.stitches}
                            <div className="w-full bg-indigo-100 rounded-full h-2 mt-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min(100, (stitchCounter.currentCount / stitchCounter.targetCount) * 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {stitchCounter.stitchesPerMinute > 0 && (
                          <div className="text-sm text-indigo-600 mt-2">
                            {t.speed}: {stitchCounter.stitchesPerMinute} {t.stitches}/min
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          onClick={decrementStitch}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          disabled={stitchCounter.currentCount === 0}
                        >
                          -1
                        </Button>
                        <Button
                          onClick={incrementStitch}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-3"
                        >
                          +1
                        </Button>
                        <Button
                          onClick={add10Stitches}
                          variant="outline"
                          className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          +10
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {!stitchCounter.isActive ? (
                          <Button
                            onClick={startCounter}
                            variant="outline"
                            className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
                          >
                            {t.startTimer}
                          </Button>
                        ) : (
                          <Button
                            onClick={stopCounter}
                            variant="outline"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            {t.stopTimer}
                          </Button>
                        )}
                        <Button
                          onClick={resetCounter}
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                        >
                          {t.reset}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="targetStitches" className="text-sm">
                            {t.target}:
                          </Label>
                          <Input
                            id="targetStitches"
                            type="number"
                            placeholder="100"
                            className="w-20 h-8 text-sm border-indigo-200"
                            onChange={(e) => setTargetCount(Number.parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm text-gray-600">{t.stitches}</span>
                        </div>

                        {stitchCounter.stitchesPerMinute > 0 && (
                          <Button
                            onClick={useCounterForEstimate}
                            variant="outline"
                            className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50 text-sm bg-transparent"
                          >
                            {t.useThisSpeed} ({stitchCounter.stitchesPerMinute}/min)
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded">{t.counterTip}</div>
                  </div>

                  <Button
                    onClick={calculateTime}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    {t.calculateProjectTime}
                  </Button>
                </CardContent>
              </Card>

              {/* Time Results */}
              <Card className="bg-white/70 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-800">
                    <Clock className="w-5 h-5" />
                    {t.timeEstimateTitle}
                  </CardTitle>
                  <CardDescription>{t.timeEstimateDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  {timeResults ? (
                    <div className="space-y-4">
                      {/* Main Time Results */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            <span className="font-medium text-cyan-800">{t.totalProjectTime}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg text-cyan-700">
                              {t.base}: {timeResults.baseTimeHours.toFixed(1)} {t.hours}
                            </p>
                            <p className="text-2xl font-bold text-cyan-900">
                              {t.adjusted}: {timeResults.adjustedTimeHours.toFixed(1)} {t.hours}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-emerald-800">{t.timeline}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg text-emerald-700">
                              {timeResults.estimatedWeeks.toFixed(1)} {t.weeks}
                            </p>
                            <p className="text-lg text-emerald-700">
                              {Math.ceil(timeResults.estimatedDays)} {t.days}
                            </p>
                            <p className="text-sm text-emerald-600">
                              {t.estimatedCompletion}: {timeResults.completionDate}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-4 rounded-lg border border-violet-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-violet-600" />
                            <span className="font-medium text-violet-800">{t.dailyProgress}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-violet-900">
                              {Math.round(timeResults.dailyProgress)} {t.stitchesPerDay}
                            </p>
                            <p className="text-sm text-violet-600">{t.stayOnSchedule}</p>
                          </div>
                        </div>
                      </div>

                      {timeData.projectName && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>{timeData.projectName}</strong> - {t.doneBy} {timeResults.completionDate}!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>{t.fillTimeFormMessage}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <History className="w-5 h-5" />
                  {t.projectHistory}
                </CardTitle>
                <CardDescription>{t.projectHistoryDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                {projectHistory.length > 0 ? (
                  <div className="space-y-4">
                    {projectHistory.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border-2 ${
                          item.type === "pricing"
                            ? "bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200"
                            : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3
                              className={`font-semibold text-lg ${
                                item.type === "pricing" ? "text-rose-800" : "text-blue-800"
                              }`}
                            >
                              {item.projectName || t.unnamedProject}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {item.type === "pricing" ? (
                                <DollarSign className="w-4 h-4" />
                              ) : (
                                <Clock className="w-4 h-4" />
                              )}
                              <span className="capitalize">
                                {item.type === "pricing" ? t.pricingCalculation : t.timeCalculation}
                              </span>
                              <span>•</span>
                              <span>{item.timestamp.toLocaleDateString()}</span>
                              <span>
                                {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              item.type === "pricing"
                                ? "border-rose-300 text-rose-600"
                                : "border-blue-300 text-blue-600"
                            }
                          >
                            {item.type === "pricing" ? t.pricing : t.time}
                          </Badge>
                        </div>

                        {item.type === "pricing" ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/50 p-3 rounded border border-rose-200">
                              <div className="text-sm text-rose-600 mb-1">{t.adjustedTime}</div>
                              <div className="text-lg font-bold text-rose-800">
                                {item.results.adjustedTime.toFixed(1)} {t.hours}
                              </div>
                            </div>
                            <div className="bg-white/50 p-3 rounded border border-rose-200">
                              <div className="text-sm text-rose-600 mb-1">{t.totalCost}</div>
                              <div className="text-lg font-bold text-rose-800">
                                {formatCurrency(item.results.totalCost, language)}
                              </div>
                            </div>
                            <div className="bg-white/50 p-3 rounded border border-rose-200">
                              <div className="text-sm text-rose-600 mb-1">{t.suggestedSellingPrice}</div>
                              <div className="text-lg font-bold text-rose-800">
                                {formatCurrency(item.results.suggestedPrice, language)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/50 p-3 rounded border border-blue-200">
                              <div className="text-sm text-blue-600 mb-1">{t.totalTime}</div>
                              <div className="text-lg font-bold text-blue-800">
                                {item.results.adjustedTimeHours.toFixed(1)} {t.hours}
                              </div>
                            </div>
                            <div className="bg-white/50 p-3 rounded border border-blue-200">
                              <div className="text-sm text-blue-600 mb-1">{t.estimatedDays}</div>
                              <div className="text-lg font-bold text-blue-800">
                                {Math.ceil(item.results.estimatedDays)} {t.days}
                              </div>
                            </div>
                            <div className="bg-white/50 p-3 rounded border border-blue-200">
                              <div className="text-sm text-blue-600 mb-1">{t.completionDate}</div>
                              <div className="text-lg font-bold text-blue-800">{item.results.completionDate}</div>
                            </div>
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded ${
                              item.type === "pricing" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.data.projectType?.replace("_", " ")} • {item.data.projectSize}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              item.type === "pricing" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.data.difficultyLevel} {t.difficulty.toLowerCase()}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              item.type === "pricing" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.data.stitchComplexity} {t.stitches.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">{t.noHistoryYet}</h3>
                    <p className="text-sm">{t.noHistoryDesc}</p>
                    <p className="text-xs mt-2 text-gray-400">{t.historyTip}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Generate Tab (Coming Soon) */}
          <TabsContent value="ai-generate">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Sparkles className="w-5 h-5" />
                  {t.aiPatternGenerator}
                </CardTitle>
                <CardDescription>{t.aiPatternDesc}</CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{t.comingSoon}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{t.aiPatternFeature}</p>
                  <Badge variant="outline" className="border-rose-300 text-rose-600">
                    {t.featureInDevelopment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photo to Chart Tab (Coming Soon) */}
          <TabsContent value="photo-to-chart">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Camera className="w-5 h-5" />
                  {t.photoToChartConverter}
                </CardTitle>
                <CardDescription>{t.photoToChartDesc}</CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{t.comingSoon}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{t.photoToChartFeature}</p>
                  <Badge variant="outline" className="border-blue-300 text-blue-600">
                    {t.featureInDevelopment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chart to Image Tab (Coming Soon) */}
          <TabsContent value="chart-to-image">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <FileImage className="w-5 h-5" />
                  {t.chartToImagePreview}
                </CardTitle>
                <CardDescription>{t.chartToImageDesc}</CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto">
                    <FileImage className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{t.comingSoon}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{t.chartToImageFeature}</p>
                  <Badge variant="outline" className="border-green-300 text-green-600">
                    {t.featureInDevelopment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feedback Button */}
        <FeedbackButton language={language} />
      </div>
    </div>
  )
}
