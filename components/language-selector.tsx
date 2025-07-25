"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"
import type { Language } from "@/lib/translations"

interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
]

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen])

  const handleLanguageSelect = (langCode: Language) => {
    onLanguageChange(langCode)
    setIsOpen(false)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent, langCode?: Language) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      if (langCode) {
        handleLanguageSelect(langCode)
      } else {
        setIsOpen(!isOpen)
      }
    } else if (event.key === "ArrowDown" && !isOpen) {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mobile-optimized trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e)}
        className="flex items-center gap-2 bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-400 hover:bg-white/20 transition-colors min-h-[44px] min-w-[120px] justify-between"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-white/70 flex-shrink-0" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="text-sm font-medium">{currentLanguage.name}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/70 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile-optimized dropdown */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden" onClick={() => setIsOpen(false)} />

          {/* Dropdown menu */}
          <div
            className={`
              absolute right-0 top-full mt-2 z-50
              bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl
              min-w-[160px] overflow-hidden
              sm:w-auto w-screen sm:max-w-none max-w-[280px] sm:right-0 right-[-12px]
            `}
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                onKeyDown={(e) => handleKeyDown(e, lang.code)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none transition-colors
                  ${language === lang.code ? "bg-white/10 text-rose-300" : ""}
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index === languages.length - 1 ? "rounded-b-lg" : ""}
                  min-h-[48px] sm:min-h-[40px]
                `}
                role="option"
                aria-selected={language === lang.code}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="text-lg flex-shrink-0" role="img" aria-label={`${lang.name} flag`}>
                  {lang.flag}
                </span>
                <span className="font-medium text-sm sm:text-base">{lang.name}</span>
                {language === lang.code && <span className="ml-auto text-rose-300 text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
