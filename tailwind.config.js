module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.html'],
    darkMode: 'class', // 启用基于类的深色模式
    theme: {
        extend: {
            colors: {
                // 自定义颜色调色板
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: theme('colors.gray.700'),
                        p: {
                            marginTop: '0.5rem',
                            marginBottom: '0.5rem',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        code: {
                            backgroundColor: theme('colors.gray.100'),
                            color: theme('colors.gray.800'),
                            fontWeight: '500',
                            fontSize: '0.875rem',
                            padding: '0.125rem 0.375rem',
                            borderRadius: '0.25rem',
                        },
                        pre: {
                            backgroundColor: theme('colors.gray.900'),
                            color: theme('colors.gray.100'),
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            overflow: 'auto',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            padding: '0',
                            fontSize: 'inherit',
                        },
                        ul: {
                            marginTop: '0.5rem',
                            marginBottom: '0.5rem',
                        },
                        ol: {
                            marginTop: '0.5rem',
                            marginBottom: '0.5rem',
                        },
                        li: {
                            marginTop: '0.25rem',
                            marginBottom: '0.25rem',
                        },
                    },
                },
                invert: {
                    css: {
                        color: theme('colors.gray.200'),
                        code: {
                            backgroundColor: theme('colors.gray.800'),
                            color: theme('colors.gray.200'),
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            }),
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '92': '23rem',
            },
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [],
};