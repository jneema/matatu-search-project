import React from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-4 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Matatu Route Finder
        </p>
      </div>
    </footer>
  );
}

export default Footer;
