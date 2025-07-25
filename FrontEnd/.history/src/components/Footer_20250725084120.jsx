// Trong file Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 Cinebot. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:underline text-sm">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline text-sm">
            Terms of Service
          </a>
          <a href="#" className="hover:underline text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
