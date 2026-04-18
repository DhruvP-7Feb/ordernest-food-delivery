import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (localStorage.getItem('access')) {
                try {
                    const response = await api.get('auth/profile/');
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user");
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (username, password) => {
        const response = await api.post('auth/login/', { username, password });
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        const userRes = await api.get('auth/profile/');
        setUser(userRes.data);
    };

    const register = async (userData) => {
        await api.post('auth/register/', userData);
        await login(userData.username, userData.password);
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
