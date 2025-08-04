import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

// main app component
function App() {
    // render the app
    return (
        <ErrorBoundary>
            <AuthProvider>
                <div className="min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
