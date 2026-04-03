import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import useUIStore from '../store/uiStore';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useUIStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-surface text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
