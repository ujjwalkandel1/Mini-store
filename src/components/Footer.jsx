import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 p-6 text-center shadow-lg border-t border-gray-200 mt-8">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
