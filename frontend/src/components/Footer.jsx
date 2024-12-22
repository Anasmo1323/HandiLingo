import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t">
            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 border-b">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Stay Connected</h3>
                        <p className="text-gray-600">Subscribe to our newsletter for updates and tips</p>
                    </div>
                    <div className="flex w-full md:w-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                        />
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-r-lg transition-all duration-300 transform hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 after:content-[''] after:block after:w-12 after:h-1 after:bg-green-500 after:mt-2">
                            About HandiLingo
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Empowering communication through innovative sign language learning solutions. Join our community and start your journey today.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 after:content-[''] after:block after:w-12 after:h-1 after:bg-green-500 after:mt-2">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {["Home", "Lessons", "Dashboard"].map((item, index) => (
                                <li key={index}>
                                    <span 
                                        onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
                                        className="text-gray-600 hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                                        <span>{item}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 after:content-[''] after:block after:w-12 after:h-1 after:bg-green-500 after:mt-2">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {["Help Center", "Contact Us", "FAQs"].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href="#" 
                                        className="text-gray-600 hover:text-green-500 transition-all duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 after:content-[''] after:block after:w-12 after:h-1 after:bg-green-500 after:mt-2">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className="bg-gray-100 p-3 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-300 transform hover:scale-110"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-600">
                            © {currentYear} <span className="font-semibold">HandiLingo</span>. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {["Privacy Policy", "Terms of Service"].map((item, index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className="text-gray-600 hover:text-green-500 transition-all duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;