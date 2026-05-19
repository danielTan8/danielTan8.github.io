"use client";

import Logo from "../logo";
import { getImgPath } from "@/utils/image";

const Header = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = getImgPath("/CV.pdf");
    link.download = "Daniel_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <header className="navbar top-0 left-0 z-999 w-full absolute">
      <div className="container">
        <nav className="py-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-8">
            <div className="flex items-center justify-center sm:justify-start">
              <Logo />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-8 w-full sm:w-auto">
              <button
                  onClick={handleDownloadPDF}
                  className="relative overflow-hidden cursor-pointer w-full sm:w-fit py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group text-center"
              >
                <span className="relative z-10 text-lg md:text-xl font-medium text-black group-hover:text-white transition-colors duration-300">
                  Download PDF Resume
                </span>
              </button>

              <a
                href="https://calendly.com/danieltan8/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden cursor-pointer w-full sm:w-fit py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-orange-500 bg-orange-500 rounded-full group hover:bg-orange-600 hover:border-orange-600 transition-colors duration-300 text-center"
              >
                <span className="relative z-10 text-lg md:text-xl font-medium text-white">
                  Schedule a Call
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
