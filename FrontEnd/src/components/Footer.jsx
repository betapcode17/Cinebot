const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-2">
        <p className="text-sm">&copy; 2025 Cinebot. All rights reserved.</p>
        <div className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
