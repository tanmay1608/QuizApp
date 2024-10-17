
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full py-14 relative ">
      <div className="absolute inset-0 bg-[#0b0e15] opacity-95"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
            <li className="text-white hover:text-gray-500 cursor-pointer">Products</li>
            <li className="text-white hover:text-gray-500 cursor-pointer">Resources</li>
            <li className="text-white hover:text-gray-500 cursor-pointer">Blogs</li>
            <li className="text-white hover:text-gray-500 cursor-pointer">Support</li>
          </ul>

          <div className="flex space-x-10 justify-center items-center mb-14">
            <FaTwitter className="text-white text-2xl hover:text-gray-500 cursor-pointer" />
            <FaInstagram className="text-white text-2xl hover:text-gray-500 cursor-pointer" />
            <FaFacebookF className="text-white text-2xl hover:text-gray-500 cursor-pointer" />
          </div>

          <p className="text-center text-white">
            © 2024 QuizMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
