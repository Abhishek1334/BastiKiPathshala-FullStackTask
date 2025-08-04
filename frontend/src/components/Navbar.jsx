import { Link, useLocation } from 'react-router-dom';
import { Home, UserPlus, Shield, LogOut, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            // Handle logout error silently
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100'
                    : 'bg-black/20 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span
                                className={`section-title text-xl transition-colors duration-300 ${
                                    isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                                }`}
                            >
                                Basti Ki Pathshala
                            </span>
                            <span
                                className={`block text-xs font-medium body-text transition-colors duration-300 ${
                                    isScrolled
                                        ? 'text-orange-600'
                                        : 'text-orange-200 drop-shadow-lg'
                                }`}
                            >
                                Foundation
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 body-text ${
                                isActive('/')
                                    ? isScrolled
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-orange-300 bg-white/30 drop-shadow-lg'
                                    : isScrolled
                                    ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                    : 'text-white hover:text-orange-300 hover:bg-white/30 drop-shadow-lg'
                            }`}
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/register"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 body-text ${
                                isActive('/register')
                                    ? isScrolled
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-orange-300 bg-white/30 drop-shadow-lg'
                                    : isScrolled
                                    ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                    : 'text-white hover:text-orange-300 hover:bg-white/30 drop-shadow-lg'
                            }`}
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Join Us</span>
                        </Link>
                        <Link
                            to="/admin"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 body-text ${
                                isActive('/admin')
                                    ? isScrolled
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-orange-300 bg-white/30 drop-shadow-lg'
                                    : isScrolled
                                    ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                    : 'text-white hover:text-orange-300 hover:bg-white/30 drop-shadow-lg'
                            }`}
                        >
                            <Shield className="w-4 h-4" />
                            <span>Admin</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                isScrolled
                                    ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                    : 'text-white hover:text-orange-300 hover:bg-white/30 drop-shadow-lg'
                            }`}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-100 py-4">
                        <div className="space-y-2">
                            <Link
                                to="/"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 body-text ${
                                    isActive('/')
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/register"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 body-text ${
                                    isActive('/register')
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Join Us</span>
                            </Link>
                            <Link
                                to="/admin"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 body-text ${
                                    isActive('/admin')
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Shield className="w-4 h-4" />
                                <span>Admin</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
