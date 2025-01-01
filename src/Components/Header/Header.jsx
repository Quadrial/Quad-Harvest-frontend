import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border- border-gray-400 py-10 px-[50px] md:px-[50px] lg:px-[100px]">
      <Link className="lg:w-[5%] md:w-[10%] w-1/6">
        <img src="images/logo2.png" alt="logo" />
      </Link>

      <nav>
        <section className="MOBILE-MENU flex md:hidden lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-green-700"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-green-800"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-green-700"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/about">About</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/portfolio">Portfolio</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 md:flex lg:flex items-center">
          <li>
            <a href="/about">Home</a>
          </li>
          <li>
            <a href="/contact">Services</a>
          </li>
          <li>
            <Link href="/contact">Marketplace</Link>
          </li>
          <li>
            <a href="/portfolio">About Us</a>
          </li>
          <li className="bg-green-500 w-[100px] h-[40px] text-white rounded-md flex items-center justify-center">
            <Link to="/login">Get Started</Link>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
