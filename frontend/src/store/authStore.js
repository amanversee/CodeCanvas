import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null, // { id, name, email }
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true, error: null });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false, error: null });
    },

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));

export default useAuthStore;
