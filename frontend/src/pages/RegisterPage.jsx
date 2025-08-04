import { useState } from 'react';
import { api } from '../services/api';

function RegisterPage() {
    // form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'intern',
        message: '',
    });

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // success state
    const [isSuccess, setIsSuccess] = useState(false);

    // error state
    const [error, setError] = useState('');

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // reset states
        setIsLoading(true);
        setError('');
        setIsSuccess(false);

        try {
            // validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                throw new Error('Please fill in all required fields');
            }

            if (formData.message.length < 10) {
                throw new Error('Message must be at least 10 characters long');
            }

            if (formData.message.length > 500) {
                throw new Error('Message cannot exceed 500 characters');
            }

            // submit form
            await api.registerApplicant(formData);

            // show success message
            setIsSuccess(true);

            // reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: 'intern',
                message: '',
            });
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
                    {/* Form Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-orange-100">
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="section-title text-2xl sm:text-3xl text-gray-800 mb-3 sm:mb-4">
                                Join Our Mission
                            </h1>
                            <p className="body-text text-gray-600">
                                Apply for an internship or volunteer position and help us make a
                                difference
                            </p>
                        </div>

                        {isSuccess && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-green-800 font-medium">
                                    Application submitted successfully! We&apos;ll get back to you
                                    soon.
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-800 font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="Enter your full name"
                                    required
                                    minLength="2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Role *
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="intern">Intern</option>
                                    <option value="volunteer">Volunteer</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Why do you want to join us? *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className="input-field"
                                    placeholder="Tell us about your motivation for joining our mission, your relevant experience, and why you want to make a difference..."
                                    required
                                    minLength="10"
                                    maxLength="500"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {formData.message.length}/500 characters
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full py-3 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center lg:text-left">
                            <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-4 sm:mb-6">
                                Make a Real Impact
                            </h2>
                            <p className="body-text text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                                Join our team of dedicated volunteers and interns who are committed
                                to providing quality education to underprivileged children. Your
                                skills and passion can help us create lasting change in communities.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                                <h3 className="section-title text-xl text-gray-800 mb-3">
                                    Internship Program
                                </h3>
                                <ul className="body-text text-gray-600 space-y-2">
                                    <li>• Hands-on experience in education</li>
                                    <li>• Community development skills</li>
                                    <li>• Leadership opportunities</li>
                                    <li>• Professional networking</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                                <h3 className="section-title text-xl text-gray-800 mb-3">
                                    Volunteer Program
                                </h3>
                                <ul className="body-text text-gray-600 space-y-2">
                                    <li>• Flexible commitment options</li>
                                    <li>• Direct community impact</li>
                                    <li>• Skill development</li>
                                    <li>• Personal fulfillment</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/images/teaching.jpg"
                                alt="Teaching and mentoring children"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-white text-xl font-semibold mb-2">
                                    Transform Lives Through Education
                                </h3>
                                <p className="text-white/90 text-sm">
                                    Every child deserves access to quality education
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
