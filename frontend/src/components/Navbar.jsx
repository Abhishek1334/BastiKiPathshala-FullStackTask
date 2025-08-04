import { Link, useLocation } from 'react-router-dom';
import { Home, UserPlus, Shield, LogOut, Heart, MoreVertical, ExternalLink, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            // Handle logout error silently
        }
    };

    const socialLinks = [
        {
            name: 'Portfolio',
            url: 'https://abhishek-rajoria.vercel.app/',
            icon: Globe,
            color: 'text-blue-600'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/Abhishek1334',
            icon: Github,
            color: 'text-gray-800'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/abhishekrajoria/',
            icon: Linkedin,
            color: 'text-blue-700'
        },
        {
            name: 'Email',
            url: 'mailto:AbhishekRajoria24@gmail.com',
            icon: Mail,
            color: 'text-red-600'
        },
        {
            name: 'Project Repo',
            url: 'https://github.com/Abhishek1334/BastiKiPathshala-FullStackTask',
            icon: ExternalLink,
            color: 'text-green-600'
        }
    ];

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

                    {/* Social Links Dropdown */}
                    <div className="relative dropdown-container">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                isScrolled
                                    ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                    : 'text-white hover:text-orange-300 hover:bg-white/30 drop-shadow-lg'
                            }`}
                        >
                            <MoreVertical className="w-4 h-4" />
                            <span className="body-text">Connect</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">Abhishek Rajoria</p>
                                    <p className="text-xs text-gray-500">Full Stack Developer</p>
                                </div>
                                {socialLinks.map((link, index) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <IconComponent className={`w-4 h-4 ${link.color}`} />
                                            <span>{link.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden dropdown-container">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:text-orange-300 hover:bg-white/30 transition-colors duration-200"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">Abhishek Rajoria</p>
                                    <p className="text-xs text-gray-500">Full Stack Developer</p>
                                </div>
                                {socialLinks.map((link, index) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <IconComponent className={`w-4 h-4 ${link.color}`} />
                                            <span>{link.name}</span>
                                        </a>
                                    );
                                })}
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
