import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import API_URL from '../config/api';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setAuth, setLoading, setError, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/auth/register`, data);

            setAuth(response.data.user, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg border border-transparent dark:border-dark-border">
                <div>
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-3 rounded-md text-sm text-center border border-red-100 dark:border-red-800">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            {...register('name', { required: 'Name is required' })}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
                            })}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' }
                            })}
                            error={errors.password?.message}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2.5"
                            isLoading={isLoading}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
