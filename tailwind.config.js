/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // white
        foreground: "var(--color-foreground)", // gray-800
        surface: "var(--color-surface)", // slate-50
        primary: {
          DEFAULT: "var(--color-primary)", // blue-600
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // slate-800
          foreground: "var(--color-secondary-foreground)", // slate-50
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-50
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // blue-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        'text-primary': "var(--color-text-primary)", // gray-800
        'text-secondary': "var(--color-text-secondary)", // gray-500
        'trust-builder': "var(--color-trust-builder)", // slate-500
        'conversion-accent': "var(--color-conversion-accent)", // emerald-600
        'cta-urgent': "var(--color-cta-urgent)", // red-600
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        genetic: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'genetic-xs': ['0.75rem', { lineHeight: '1rem' }],
        'genetic-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'genetic-base': ['1rem', { lineHeight: '1.5rem' }],
        'genetic-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'genetic-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'genetic-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'genetic-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'genetic-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'genetic-5xl': ['3rem', { lineHeight: '1' }],
        'genetic-6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'genetic-light': '300',
        'genetic-normal': '400',
        'genetic-medium': '500',
        'genetic-semibold': '600',
        'genetic-bold': '700',
      },
      spacing: {
        'genetic-xs': 'var(--spacing-xs)', // 8px
        'genetic-sm': 'var(--spacing-sm)', // 12px
        'genetic-md': 'var(--spacing-md)', // 20px
        'genetic-lg': 'var(--spacing-lg)', // 32px
        'genetic-xl': 'var(--spacing-xl)', // 52px
      },
      borderRadius: {
        'genetic-sm': 'var(--radius-sm)', // 4px
        'genetic-md': 'var(--radius-md)', // 8px
        'genetic-lg': 'var(--radius-lg)', // 16px
        'genetic-xl': 'var(--radius-xl)', // 24px
      },
      boxShadow: {
        'organic-sm': '0 1px 3px rgba(37, 99, 235, 0.08)',
        'organic-md': '0 4px 12px rgba(37, 99, 235, 0.08)',
        'organic-lg': '0 12px 32px rgba(37, 99, 235, 0.08)',
        'genetic-elevation': '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(37, 99, 235, 0.08)',
      },
      animation: {
        'helix-rotate': 'helix-rotate 20s linear infinite',
        'genetic-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'organic-bounce': 'bounce 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'helix-rotate': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'genetic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        'genetic-fast': 'var(--animation-duration-fast)', // 150ms
        'genetic-normal': 'var(--animation-duration-normal)', // 300ms
        'genetic-slow': 'var(--animation-duration-slow)', // 600ms
        'genetic-slower': 'var(--animation-duration-slower)', // 1200ms
      },
      backdropBlur: {
        'genetic': '8px',
      },
      screens: {
        'genetic-mobile': '375px',
        'genetic-tablet': '768px',
        'genetic-desktop': '1024px',
        'genetic-wide': '1440px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}