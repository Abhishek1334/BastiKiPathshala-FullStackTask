import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, BookOpen, Star } from 'lucide-react';
import { useEffect } from 'react';

function HomePage() {
    // handle scroll event
    const handleScroll = () => {
        // This function can be used for scroll-based animations if needed
        // You can add scroll-based effects here
    };

    // add scroll listener when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Image - Full Screen */}
            <div className="relative h-screen overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/children.jpg"
                        alt="Children learning and growing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-amber-300 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-amber-200 rounded-full blur-2xl"></div>
                </div>

                {/* Volunteer Work Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    {/* Abstract shapes representing community */}
                    <div className="absolute top-1/4 left-1/6 w-16 h-16 border-4 border-orange-400 rounded-full"></div>
                    <div className="absolute top-1/3 right-1/4 w-12 h-12 border-4 border-amber-400 rounded-full"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-orange-300 rounded-full"></div>
                    <div className="absolute bottom-1/3 right-1/6 w-14 h-14 border-4 border-amber-300 rounded-full"></div>
                </div>

                <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
                    <div className="text-center max-w-4xl">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h1 className="hero-title text-2xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 leading-tight">
                            Lighting the Path to <span className="text-orange-300">Change</span>
                        </h1>
                        <p className="body-text text-base sm:text-xl text-gray-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                            Join us in our mission to break the barriers of education in underserved
                            communities. With your support, we can provide quality education to
                            children living in slum areas, empowering them with the knowledge and
                            skills they need to build a brighter future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <Link
                                to="/register"
                                className="btn-primary text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 inline-flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <span>Join Our Team</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link
                                to="/register"
                                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg inline-flex items-center justify-center space-x-2 transition-colors duration-200 body-text text-base sm:text-lg"
                            >
                                <span>Apply as Intern</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section with Real Images */}
            <div className="py-12 bg-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-100 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-3 sm:mb-4">
                            Why Education is Important?
                        </h2>
                        <p className="body-text text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                            Education offers underprivileged children a pathway out of poverty by
                            providing them with the knowledge and skills necessary to secure better
                            opportunities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                            {/* Card Background Pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="section-title text-xl text-gray-800 mb-3">
                                    Breaking the Cycle of Poverty
                                </h3>
                                <p className="body-text text-gray-600 leading-relaxed">
                                    Education provides children with the tools they need to break
                                    free from the cycle of poverty and create better opportunities
                                    for themselves and their families.
                                </p>
                            </div>
                        </div>

                        <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                            {/* Card Background Pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="section-title text-xl text-gray-800 mb-3">
                                    Building Strong Communities
                                </h3>
                                <p className="body-text text-gray-600 leading-relaxed">
                                    Educated individuals contribute to stronger, more resilient
                                    communities by bringing new skills, ideas, and perspectives that
                                    benefit everyone.
                                </p>
                            </div>
                        </div>

                        <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                            {/* Card Background Pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="section-title text-xl text-gray-800 mb-3">
                                    Unlocking Potential
                                </h3>
                                <p className="body-text text-gray-600 leading-relaxed">
                                    Every child has unique talents and potential. Education helps
                                    them discover and develop these abilities, leading to personal
                                    growth and success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Gallery Section */}
            <div className="py-12 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-amber-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-3 sm:mb-4">
                            Our Impact in Action
                        </h2>
                        <p className="body-text text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                            See how our programs are making a real difference in the lives of
                            children and communities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <img
                                src="/images/education.jpg"
                                alt="Children in classroom"
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="section-title text-xl mb-1">Quality Education</h3>
                                <p className="body-text text-sm">Providing access to learning</p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <img
                                src="/images/community.jpg"
                                alt="Community gathering"
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="section-title text-xl mb-1">Community Support</h3>
                                <p className="body-text text-sm">Building strong relationships</p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <img
                                src="/images/volunteer.jpg"
                                alt="Volunteers working"
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="section-title text-xl mb-1">Volunteer Work</h3>
                                <p className="body-text text-sm">Dedicated team effort</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="body-text text-base sm:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                        Join our team of dedicated volunteers and interns. Your skills and passion
                        can help us create lasting change in communities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <Link
                            to="/register"
                            className="bg-white text-orange-600 hover:bg-orange-50 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg inline-flex items-center justify-center space-x-2 transition-colors duration-200 shadow-lg text-base sm:text-lg"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                        <Link
                            to="/register"
                            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg inline-flex items-center justify-center space-x-2 transition-colors duration-200 text-base sm:text-lg"
                        >
                            <span>Learn More</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
