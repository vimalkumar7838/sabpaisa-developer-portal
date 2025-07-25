// Responsive breakpoint utilities
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

// Common responsive class patterns
export const responsiveUtils = {
  // Container classes for different page types
  containers: {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
    wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    full: 'w-full px-4 sm:px-6 lg:px-8'
  },
  
  // Grid layouts
  grids: {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    features: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8',
    stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
  },
  
  // Flex layouts
  flex: {
    between: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
    center: 'flex flex-col sm:flex-row items-center justify-center gap-4',
    wrap: 'flex flex-wrap items-center gap-2 sm:gap-4'
  },
  
  // Typography
  text: {
    hero: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
    title: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    subtitle: 'text-lg sm:text-xl md:text-2xl',
    body: 'text-sm sm:text-base',
    caption: 'text-xs sm:text-sm'
  },
  
  // Spacing
  spacing: {
    section: 'py-8 sm:py-12 md:py-16 lg:py-20',
    component: 'py-4 sm:py-6 md:py-8',
    small: 'py-2 sm:py-3 md:py-4'
  },
  
  // Common responsive patterns
  hideOnMobile: 'hidden sm:block',
  hideOnDesktop: 'block sm:hidden',
  showOnMobile: 'block sm:hidden',
  showOnDesktop: 'hidden sm:block'
}

// Media query hooks for JS
export const mediaQueries = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
}

// Responsive image sizes
export const imageSizes = {
  avatar: 'w-8 h-8 sm:w-10 sm:h-10',
  icon: 'w-4 h-4 sm:w-5 sm:h-5',
  logo: 'w-6 h-6 sm:w-8 sm:h-8',
  feature: 'w-12 h-12 sm:w-16 sm:h-16'
}

// Button sizes for different screens
export const buttonSizes = {
  responsive: 'px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base',
  small: 'px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm',
  large: 'px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg'
}