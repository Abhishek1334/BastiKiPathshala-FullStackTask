import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// create auth context
const AuthContext = createContext();

// auth provider component
export const AuthProvider = ({ children }) => {
    // state variables
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // function to check auth status
    const checkAuthStatus = async () => {
        try {
            const response = await api.verifyAuth();
            setIsAuthenticated(response.authenticated);
            setUser(response.user || null);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // login function
    const login = async (password) => {
        try {
            const response = await api.login(password);
            setIsAuthenticated(true);
            setUser(response.user);
            return response;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    // logout function
    const logout = async () => {
        try {
            await api.logout();
        } catch (error) {
            // Handle logout error silently
        } finally {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // context value
    const value = {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuthStatus,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
