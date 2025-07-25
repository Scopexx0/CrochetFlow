export type Language = "en" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "ko" | "zh"

export const translations = {
  en: {
    // Header
    appName: "CrochetCraft",
    mvp: "MVP",

    // Navigation
    pricing: "Pricing",
    time: "Time",
    history: "History",
    aiGenerate: "AI Generate",
    photoToChart: "Photo→Chart",
    chartToImage: "Chart→Image",

    // Pricing Calculator
    projectCalculator: "Project Calculator",
    projectCalculatorDesc: "Calculate time and pricing for your crochet projects",
    projectName: "Project Name",
    projectNamePlaceholder: "e.g., Baby Blanket, Amigurumi Bear",
    yarnCost: "Yarn Cost",
    otherMaterials: "Other Materials",
    baseHoursEstimate: "Base Hours Estimate",
    hourlyRate: "Your Hourly Rate",
    projectComplexity: "Project Complexity",
    difficultyLevel: "Difficulty Level",
    projectType: "Project Type",
    stitchComplexity: "Stitch Complexity",
    projectSize: "Project Size",
    marketPosition: "Market Position",
    customPattern: "Custom Pattern",
    calculateAdvancedPricing: "Calculate Advanced Pricing",

    // Project Results
    projectResults: "Project Results",
    projectResultsDesc: "Time and cost breakdown for your project",
    timeEstimate: "Time Estimate",
    base: "Base",
    adjusted: "Adjusted",
    hours: "hours",
    costBreakdown: "Cost Breakdown",
    materials: "Materials",
    labor: "Labor",
    totalCost: "Total Cost",
    suggestedSellingPrice: "Suggested Selling Price",
    profit: "Profit",
    complexityMultipliers: "Complexity Multipliers Applied",
    difficulty: "Difficulty",
    size: "Size",
    market: "Market",
    pricedCompetitively: "Priced competitively for the",
    marketSuffix: "market",

    // Time Calculator
    timeCalculator: "Time Calculator",
    timeCalculatorDesc: "Estimate how long your crochet project will take to complete",
    patternDifficulty: "Pattern Difficulty",
    estimatedTotalStitches: "Estimated Total Stitches",
    stitchTip: "Tip: Count stitches in a small section and multiply by total sections",
    yourCrochetingSpeed: "Your Crocheting Speed",
    yourSkillLevel: "Your Skill Level",
    stitchesPerMinute: "Stitches per Minute",
    averageSpeed: "Average: 10-20 stitches/min",
    hoursPerDay: "Hours per Day",
    daysPerWeek: "Days per Week",
    includeBreaks: "Include breaks and interruptions",
    breakTime: "Break Time (%)",
    builtInStitchCounter: "Built-in Stitch Counter",
    liveCounter: "Live Counter",
    target: "Target",
    stitches: "stitches",
    speed: "Speed",
    startTimer: "Start Timer",
    stopTimer: "Stop Timer",
    reset: "Reset",
    useThisSpeed: "Use This Speed",
    counterTip: "💡 Tip: Start the timer and crochet for a few minutes to get your accurate stitching speed!",
    calculateProjectTime: "Calculate Project Time",

    // Time Results
    timeEstimateTitle: "Time Estimate",
    timeEstimateDesc: "Projected completion timeline for your project",
    totalProjectTime: "Total Project Time",
    timeline: "Timeline",
    weeks: "weeks",
    days: "days",
    estimatedCompletion: "Estimated completion",
    dailyProgress: "Daily Progress",
    stitchesPerDay: "stitches/day",
    stayOnSchedule: "To stay on schedule",
    doneBy: "You'll be done by",

    // History
    projectHistory: "Project History",
    projectHistoryDesc: "Your recent crochet project calculations and estimates",
    unnamedProject: "Unnamed Project",
    pricingCalculation: "Pricing Calculation",
    timeCalculation: "Time Calculation",
    adjustedTime: "Adjusted Time",
    totalTime: "Total Time",
    estimatedDays: "Estimated Days",
    completionDate: "Completion Date",
    noHistoryYet: "No Project History Yet",
    noHistoryDesc: "Complete some calculations in the Pricing or Time tabs to see your project history here.",
    historyTip: "💡 Make sure to add a project name to save it to history!",

    // Feedback
    feedback: "Feedback",
    giveFeedback: "Give Feedback",
    feedbackDesc: "Help us make CrochetCraft better for everyone!",
    feedbackType: "What type of feedback do you have?",
    reportBug: "Report Bug",
    reportBugDesc: "Found something that's not working?",
    requestFeature: "Request Feature",
    requestFeatureDesc: "Have an idea for improvement?",
    generalFeedback: "General Feedback",
    generalFeedbackDesc: "Share your thoughts with us",
    showLove: "Show Love",
    showLoveDesc: "Tell us what you love about the app!",
    rateExperience: "How would you rate your experience?",
    bugPlaceholder: "Describe the bug you encountered...",
    featurePlaceholder: "Describe the feature you'd like to see...",
    lovePlaceholder: "Tell us what you love about CrochetCraft...",
    generalPlaceholder: "Share your thoughts...",
    emailOptional: "Email (optional)",
    emailPlaceholder: "your@email.com",
    emailNote: "We'll only use this to follow up on your feedback if needed.",
    cancel: "Cancel",
    sendFeedback: "Send Feedback",
    sending: "Sending...",
    thankYou: "Thank you!",
    feedbackReceived: "Your feedback helps us improve!",
    madeWithLove: "Made with love for the crochet community",

    // Difficulty levels
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",

    // Project types
    accessories: "Accessories",
    clothing: "Clothing",
    homeDecor: "Home Decor",
    toysAmigurumi: "Toys/Amigurumi",
    blankets: "Blankets",
    bagsPurses: "Bags/Purses",

    // Stitch complexity
    basicStitches: "Basic Stitches",
    intricate: "Intricate",

    // Project sizes
    small: "Small",
    medium: "Medium",
    large: "Large",
    extraLarge: "Extra Large",

    // Market positions
    budgetMarket: "Budget Market",
    standardMarket: "Standard Market",
    premiumMarket: "Premium Market",
    luxuryMarket: "Luxury Market",

    // Skill levels
    beginnerSlower: "Beginner (slower)",
    expertFaster: "Expert (faster)",

    // Coming Soon
    comingSoon: "Coming Soon!",
    featureInDevelopment: "Feature in Development",
    aiPatternGenerator: "AI Pattern Generator",
    aiPatternDesc: "Generate crochet patterns from text descriptions (Coming Soon)",
    aiPatternFeature:
      "Describe what you want to crochet and our AI will generate patterns, charts, and preview images for you.",
    photoToChartConverter: "Photo to Chart Converter",
    photoToChartDesc: "Upload a photo and get the crochet chart (Coming Soon)",
    photoToChartFeature:
      "Take a photo of any crochet item and our AI will reverse-engineer the pattern and chart for you.",
    chartToImagePreview: "Chart to Image Preview",
    chartToImageDesc: "Upload a chart and see the finished product (Coming Soon)",
    chartToImageFeature: "Upload your crochet charts and patterns to see a realistic preview of the finished product.",

    // Form placeholders and messages
    fillFormMessage: 'Fill out the form and click "Calculate Advanced Pricing" to see your results',
    fillTimeFormMessage: 'Fill out the form and click "Calculate Project Time" to see your timeline',

    // Currency
    currency: "$",
  },

  es: {
    // Header
    appName: "CrochetCraft",
    mvp: "MVP",

    // Navigation
    pricing: "Precios",
    time: "Tiempo",
    history: "Historial",
    aiGenerate: "IA Generar",
    photoToChart: "Foto→Gráfico",
    chartToImage: "Gráfico→Imagen",

    // Pricing Calculator
    projectCalculator: "Calculadora de Proyectos",
    projectCalculatorDesc: "Calcula tiempo y precios para tus proyectos de crochet",
    projectName: "Nombre del Proyecto",
    projectNamePlaceholder: "ej., Manta de Bebé, Oso Amigurumi",
    yarnCost: "Costo del Hilo",
    otherMaterials: "Otros Materiales",
    baseHoursEstimate: "Estimación Base de Horas",
    hourlyRate: "Tu Tarifa por Hora",
    projectComplexity: "Complejidad del Proyecto",
    difficultyLevel: "Nivel de Dificultad",
    projectType: "Tipo de Proyecto",
    stitchComplexity: "Complejidad de Puntos",
    projectSize: "Tamaño del Proyecto",
    marketPosition: "Posición en el Mercado",
    customPattern: "Patrón Personalizado",
    calculateAdvancedPricing: "Calcular Precio Avanzado",

    // Project Results
    projectResults: "Resultados del Proyecto",
    projectResultsDesc: "Desglose de tiempo y costo para tu proyecto",
    timeEstimate: "Estimación de Tiempo",
    base: "Base",
    adjusted: "Ajustado",
    hours: "horas",
    costBreakdown: "Desglose de Costos",
    materials: "Materiales",
    labor: "Mano de Obra",
    totalCost: "Costo Total",
    suggestedSellingPrice: "Precio de Venta Sugerido",
    profit: "Ganancia",
    complexityMultipliers: "Multiplicadores de Complejidad Aplicados",
    difficulty: "Dificultad",
    size: "Tamaño",
    market: "Mercado",
    pricedCompetitively: "Con precio competitivo para el mercado",
    marketSuffix: "",

    // Time Calculator
    timeCalculator: "Calculadora de Tiempo",
    timeCalculatorDesc: "Estima cuánto tiempo tomará completar tu proyecto de crochet",
    patternDifficulty: "Dificultad del Patrón",
    estimatedTotalStitches: "Puntos Totales Estimados",
    stitchTip: "Consejo: Cuenta puntos en una sección pequeña y multiplica por el total de secciones",
    yourCrochetingSpeed: "Tu Velocidad de Crochet",
    yourSkillLevel: "Tu Nivel de Habilidad",
    stitchesPerMinute: "Puntos por Minuto",
    averageSpeed: "Promedio: 10-20 puntos/min",
    hoursPerDay: "Horas por Día",
    daysPerWeek: "Días por Semana",
    includeBreaks: "Incluir descansos e interrupciones",
    breakTime: "Tiempo de Descanso (%)",
    builtInStitchCounter: "Contador de Puntos Integrado",
    liveCounter: "Contador en Vivo",
    target: "Objetivo",
    stitches: "puntos",
    speed: "Velocidad",
    startTimer: "Iniciar Cronómetro",
    stopTimer: "Detener Cronómetro",
    reset: "Reiniciar",
    useThisSpeed: "Usar Esta Velocidad",
    counterTip: "💡 Consejo: ¡Inicia el cronómetro y teje por unos minutos para obtener tu velocidad exacta!",
    calculateProjectTime: "Calcular Tiempo del Proyecto",

    // Time Results
    timeEstimateTitle: "Estimación de Tiempo",
    timeEstimateDesc: "Cronograma proyectado de finalización para tu proyecto",
    totalProjectTime: "Tiempo Total del Proyecto",
    timeline: "Cronograma",
    weeks: "semanas",
    days: "días",
    estimatedCompletion: "Finalización estimada",
    dailyProgress: "Progreso Diario",
    stitchesPerDay: "puntos/día",
    stayOnSchedule: "Para mantenerse en horario",
    doneBy: "Terminarás para el",

    // History
    projectHistory: "Historial de Proyectos",
    projectHistoryDesc: "Tus cálculos y estimaciones recientes de proyectos de crochet",
    unnamedProject: "Proyecto Sin Nombre",
    pricingCalculation: "Cálculo de Precios",
    timeCalculation: "Cálculo de Tiempo",
    adjustedTime: "Tiempo Ajustado",
    totalTime: "Tiempo Total",
    estimatedDays: "Días Estimados",
    completionDate: "Fecha de Finalización",
    noHistoryYet: "Aún No Hay Historial de Proyectos",
    noHistoryDesc: "Completa algunos cálculos en las pestañas de Precios o Tiempo para ver tu historial aquí.",
    historyTip: "💡 ¡Asegúrate de agregar un nombre de proyecto para guardarlo en el historial!",

    // Feedback
    feedback: "Comentarios",
    giveFeedback: "Dar Comentarios",
    feedbackDesc: "¡Ayúdanos a hacer CrochetCraft mejor para todos!",
    feedbackType: "¿Qué tipo de comentario tienes?",
    reportBug: "Reportar Error",
    reportBugDesc: "¿Encontraste algo que no funciona?",
    requestFeature: "Solicitar Función",
    requestFeatureDesc: "¿Tienes una idea para mejorar?",
    generalFeedback: "Comentarios Generales",
    generalFeedbackDesc: "Comparte tus pensamientos con nosotros",
    showLove: "Mostrar Amor",
    showLoveDesc: "¡Dinos qué te encanta de la aplicación!",
    rateExperience: "¿Cómo calificarías tu experiencia?",
    bugPlaceholder: "Describe el error que encontraste...",
    featurePlaceholder: "Describe la función que te gustaría ver...",
    lovePlaceholder: "Dinos qué te encanta de CrochetCraft...",
    generalPlaceholder: "Comparte tus pensamientos...",
    emailOptional: "Email (opcional)",
    emailPlaceholder: "tu@email.com",
    emailNote: "Solo usaremos esto para hacer seguimiento a tus comentarios si es necesario.",
    cancel: "Cancelar",
    sendFeedback: "Enviar Comentarios",
    sending: "Enviando...",
    thankYou: "¡Gracias!",
    feedbackReceived: "¡Tus comentarios nos ayudan a mejorar!",
    madeWithLove: "Hecho con amor para la comunidad de crochet",

    // Difficulty levels
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    expert: "Experto",

    // Project types
    accessories: "Accesorios",
    clothing: "Ropa",
    homeDecor: "Decoración del Hogar",
    toysAmigurumi: "Juguetes/Amigurumi",
    blankets: "Mantas",
    bagsPurses: "Bolsos/Carteras",

    // Stitch complexity
    basicStitches: "Puntos Básicos",
    intricate: "Intrincado",

    // Project sizes
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    extraLarge: "Extra Grande",

    // Market positions
    budgetMarket: "Mercado Económico",
    standardMarket: "Mercado Estándar",
    premiumMarket: "Mercado Premium",
    luxuryMarket: "Mercado de Lujo",

    // Skill levels
    beginnerSlower: "Principiante (más lento)",
    expertFaster: "Experto (más rápido)",

    // Coming Soon
    comingSoon: "¡Próximamente!",
    featureInDevelopment: "Función en Desarrollo",
    aiPatternGenerator: "Generador de Patrones IA",
    aiPatternDesc: "Genera patrones de crochet desde descripciones de texto (Próximamente)",
    aiPatternFeature:
      "Describe lo que quieres tejer y nuestra IA generará patrones, gráficos e imágenes de vista previa para ti.",
    photoToChartConverter: "Convertidor de Foto a Gráfico",
    photoToChartDesc: "Sube una foto y obtén el gráfico de crochet (Próximamente)",
    photoToChartFeature:
      "Toma una foto de cualquier artículo de crochet y nuestra IA hará ingeniería inversa del patrón y gráfico para ti.",
    chartToImagePreview: "Vista Previa de Gráfico a Imagen",
    chartToImageDesc: "Sube un gráfico y ve el producto terminado (Próximamente)",
    chartToImageFeature:
      "Sube tus gráficos y patrones de crochet para ver una vista previa realista del producto terminado.",

    // Form placeholders and messages
    fillFormMessage: 'Completa el formulario y haz clic en "Calcular Precio Avanzado" para ver tus resultados',
    fillTimeFormMessage: 'Completa el formulario y haz clic en "Calcular Tiempo del Proyecto" para ver tu cronograma',

    // Currency
    currency: "$",
  },

  fr: {
    // Header
    appName: "CrochetCraft",
    mvp: "MVP",

    // Navigation
    pricing: "Prix",
    time: "Temps",
    history: "Historique",
    aiGenerate: "IA Générer",
    photoToChart: "Photo→Graphique",
    chartToImage: "Graphique→Image",

    // Pricing Calculator
    projectCalculator: "Calculateur de Projet",
    projectCalculatorDesc: "Calculez le temps et les prix pour vos projets de crochet",
    projectName: "Nom du Projet",
    projectNamePlaceholder: "ex., Couverture de Bébé, Ours Amigurumi",
    yarnCost: "Coût du Fil",
    otherMaterials: "Autres Matériaux",
    baseHoursEstimate: "Estimation d'Heures de Base",
    hourlyRate: "Votre Tarif Horaire",
    projectComplexity: "Complexité du Projet",
    difficultyLevel: "Niveau de Difficulté",
    projectType: "Type de Projet",
    stitchComplexity: "Complexité des Points",
    projectSize: "Taille du Projet",
    marketPosition: "Position sur le Marché",
    customPattern: "Modèle Personnalisé",
    calculateAdvancedPricing: "Calculer le Prix Avancé",

    // Project Results
    projectResults: "Résultats du Projet",
    projectResultsDesc: "Répartition du temps et des coûts pour votre projet",
    timeEstimate: "Estimation du Temps",
    base: "Base",
    adjusted: "Ajusté",
    hours: "heures",
    costBreakdown: "Répartition des Coûts",
    materials: "Matériaux",
    labor: "Main-d'œuvre",
    totalCost: "Coût Total",
    suggestedSellingPrice: "Prix de Vente Suggéré",
    profit: "Profit",
    complexityMultipliers: "Multiplicateurs de Complexité Appliqués",
    difficulty: "Difficulté",
    size: "Taille",
    market: "Marché",
    pricedCompetitively: "Prix compétitif pour le marché",
    marketSuffix: "",

    // Time Calculator
    timeCalculator: "Calculateur de Temps",
    timeCalculatorDesc: "Estimez combien de temps votre projet de crochet prendra à compléter",
    patternDifficulty: "Difficulté du Modèle",
    estimatedTotalStitches: "Points Totaux Estimés",
    stitchTip: "Astuce: Comptez les points dans une petite section et multipliez par le total des sections",
    yourCrochetingSpeed: "Votre Vitesse de Crochet",
    yourSkillLevel: "Votre Niveau de Compétence",
    stitchesPerMinute: "Points par Minute",
    averageSpeed: "Moyenne: 10-20 points/min",
    hoursPerDay: "Heures par Jour",
    daysPerWeek: "Jours par Semaine",
    includeBreaks: "Inclure les pauses et interruptions",
    breakTime: "Temps de Pause (%)",
    builtInStitchCounter: "Compteur de Points Intégré",
    liveCounter: "Compteur en Direct",
    target: "Objectif",
    stitches: "points",
    speed: "Vitesse",
    startTimer: "Démarrer le Chrono",
    stopTimer: "Arrêter le Chrono",
    reset: "Réinitialiser",
    useThisSpeed: "Utiliser Cette Vitesse",
    counterTip:
      "💡 Astuce: Démarrez le chrono et crochetez pendant quelques minutes pour obtenir votre vitesse précise!",
    calculateProjectTime: "Calculer le Temps du Projet",

    // Time Results
    timeEstimateTitle: "Estimation du Temps",
    timeEstimateDesc: "Calendrier de completion projeté pour votre projet",
    totalProjectTime: "Temps Total du Projet",
    timeline: "Calendrier",
    weeks: "semaines",
    days: "jours",
    estimatedCompletion: "Completion estimée",
    dailyProgress: "Progrès Quotidien",
    stitchesPerDay: "points/jour",
    stayOnSchedule: "Pour rester dans les temps",
    doneBy: "Vous aurez fini le",

    // History
    projectHistory: "Historique des Projets",
    projectHistoryDesc: "Vos calculs et estimations récents de projets de crochet",
    unnamedProject: "Projet Sans Nom",
    pricingCalculation: "Calcul de Prix",
    timeCalculation: "Calcul de Temps",
    adjustedTime: "Temps Ajusté",
    totalTime: "Temps Total",
    estimatedDays: "Jours Estimés",
    completionDate: "Date de Completion",
    noHistoryYet: "Pas Encore d'Historique de Projets",
    noHistoryDesc: "Complétez quelques calculs dans les onglets Prix ou Temps pour voir votre historique ici.",
    historyTip: "💡 Assurez-vous d'ajouter un nom de projet pour le sauvegarder dans l'historique!",

    // Feedback
    feedback: "Commentaires",
    giveFeedback: "Donner des Commentaires",
    feedbackDesc: "Aidez-nous à améliorer CrochetCraft pour tout le monde!",
    feedbackType: "Quel type de commentaire avez-vous?",
    reportBug: "Signaler un Bug",
    reportBugDesc: "Trouvé quelque chose qui ne fonctionne pas?",
    requestFeature: "Demander une Fonctionnalité",
    requestFeatureDesc: "Avez-vous une idée d'amélioration?",
    generalFeedback: "Commentaires Généraux",
    generalFeedbackDesc: "Partagez vos pensées avec nous",
    showLove: "Montrer de l'Amour",
    showLoveDesc: "Dites-nous ce que vous aimez dans l'application!",
    rateExperience: "Comment évalueriez-vous votre expérience?",
    bugPlaceholder: "Décrivez le bug que vous avez rencontré...",
    featurePlaceholder: "Décrivez la fonctionnalité que vous aimeriez voir...",
    lovePlaceholder: "Dites-nous ce que vous aimez dans CrochetCraft...",
    generalPlaceholder: "Partagez vos pensées...",
    emailOptional: "Email (optionnel)",
    emailPlaceholder: "votre@email.com",
    emailNote: "Nous l'utiliserons seulement pour faire un suivi sur vos commentaires si nécessaire.",
    cancel: "Annuler",
    sendFeedback: "Envoyer les Commentaires",
    sending: "Envoi en cours...",
    thankYou: "Merci!",
    feedbackReceived: "Vos commentaires nous aident à nous améliorer!",
    madeWithLove: "Fait avec amour pour la communauté de crochet",

    // Difficulty levels
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    expert: "Expert",

    // Project types
    accessories: "Accessoires",
    clothing: "Vêtements",
    homeDecor: "Décoration Maison",
    toysAmigurumi: "Jouets/Amigurumi",
    blankets: "Couvertures",
    bagsPurses: "Sacs/Bourses",

    // Stitch complexity
    basicStitches: "Points de Base",
    intricate: "Complexe",

    // Project sizes
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    extraLarge: "Très Grand",

    // Market positions
    budgetMarket: "Marché Budget",
    standardMarket: "Marché Standard",
    premiumMarket: "Marché Premium",
    luxuryMarket: "Marché de Luxe",

    // Skill levels
    beginnerSlower: "Débutant (plus lent)",
    expertFaster: "Expert (plus rapide)",

    // Coming Soon
    comingSoon: "Bientôt Disponible!",
    featureInDevelopment: "Fonctionnalité en Développement",
    aiPatternGenerator: "Générateur de Modèles IA",
    aiPatternDesc: "Générez des modèles de crochet à partir de descriptions textuelles (Bientôt)",
    aiPatternFeature:
      "Décrivez ce que vous voulez crocheter et notre IA générera des modèles, graphiques et images d'aperçu pour vous.",
    photoToChartConverter: "Convertisseur Photo vers Graphique",
    photoToChartDesc: "Téléchargez une photo et obtenez le graphique de crochet (Bientôt)",
    photoToChartFeature:
      "Prenez une photo de n'importe quel article de crochet et notre IA fera de l'ingénierie inverse du modèle et graphique pour vous.",
    chartToImagePreview: "Aperçu Graphique vers Image",
    chartToImageDesc: "Téléchargez un graphique et voyez le produit fini (Bientôt)",
    chartToImageFeature:
      "Téléchargez vos graphiques et modèles de crochet pour voir un aperçu réaliste du produit fini.",

    // Form placeholders and messages
    fillFormMessage: 'Remplissez le formulaire et cliquez sur "Calculer le Prix Avancé" pour voir vos résultats',
    fillTimeFormMessage:
      'Remplissez le formulaire et cliquez sur "Calculer le Temps du Projet" pour voir votre calendrier',

    // Currency
    currency: "€",
  },
}

export function detectUserLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.toLowerCase()
  const supportedLanguages: Language[] = ["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh"]

  // Check for exact match first
  if (supportedLanguages.includes(browserLang as Language)) {
    return browserLang as Language
  }

  // Check for language prefix (e.g., 'en-US' -> 'en')
  const langPrefix = browserLang.split("-")[0] as Language
  if (supportedLanguages.includes(langPrefix)) {
    return langPrefix
  }

  return "en" // Default fallback
}

export function useTranslation(language: Language) {
  return translations[language] || translations.en
}

export function formatCurrency(amount: number, language: Language): string {
  const currency = translations[language]?.currency || "$"

  // Format based on locale
  const localeMap: Record<Language, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
    ja: "ja-JP",
    ko: "ko-KR",
    zh: "zh-CN",
  }

  try {
    return new Intl.NumberFormat(localeMap[language] || "en-US", {
      style: "currency",
      currency: language === "fr" ? "EUR" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency}${amount.toFixed(2)}`
  }
}
