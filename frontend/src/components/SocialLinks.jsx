import { useState, useEffect } from 'react';
import { MoreVertical, ExternalLink, Mail, Github, Linkedin, Globe } from 'lucide-react';

const SocialLinks = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const socialLinks = [
        {
            name: 'Portfolio',
            url: 'https://abhishek-rajoria.vercel.app/',
            icon: Globe,
            color: 'text-blue-600',
        },
        {
            name: 'GitHub',
            url: 'https://github.com/Abhishek1334',
            icon: Github,
            color: 'text-gray-800',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/abhishekrajoria/',
            icon: Linkedin,
            color: 'text-blue-700',
        },
        {
            name: 'Email',
            url: 'mailto:AbhishekRajoria24@gmail.com',
            icon: Mail,
            color: 'text-red-600',
        },
        {
            name: 'Project Repo',
            url: 'https://github.com/Abhishek1334/BastiKiPathshala-FullStackTask',
            icon: ExternalLink,
            color: 'text-green-600',
        },
    ];

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.social-dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <div className="fixed top-4 right-4 z-50 social-dropdown hidden lg:block">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-6 h-6 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
            >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                        <p className="text-xs sm:text-sm font-medium text-gray-700">
                            Abhishek Rajoria
                        </p>
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
                                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${link.color}`} />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SocialLinks;
