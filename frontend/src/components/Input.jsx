import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`flex flex-col space-y-1 mb-4 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            <input
                ref={ref}
                className={`px-3 py-2 bg-white dark:bg-slate-800 border shadow-sm border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-500 rounded-md sm:text-sm transition-colors duration-200 ${error ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
