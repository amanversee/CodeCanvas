import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="relative z-50 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={user ? '/dashboard' : '/'} className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                                C
                            </div>
                            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">CodeCanvas</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Welcome, {user.name}</span>
                                <Button to="/dashboard" variant="ghost" size="sm">Dashboard</Button>
                                <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button to="/login" variant="ghost" size="sm">Log in</Button>
                                <Button to="/register" variant="primary" size="sm">Sign up</Button>
                            </>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
