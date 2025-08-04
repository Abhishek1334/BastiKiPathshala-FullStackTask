// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL + '/api';

// API service object
export const api = {
    // register new applicant
    registerApplicant: async (applicantData) => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicantData),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        return await response.json();
    },

    // get all applicants (admin only)
    getApplicants: async () => {
        const response = await fetch(`${API_BASE_URL}/applicants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch applicants');
        }

        return await response.json();
    },

    // admin login
    login: async (password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    },

    // admin logout
    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return await response.json();
    },

    // verify authentication status
    verifyAuth: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Auth verification failed');
        }

        return await response.json();
    },
};
