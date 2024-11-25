import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const imagesAndTexts = [
  {
    Dimage: "/images/image15.jpg",
    Timage: "/images/image15.jpg",
    Mimage: "/images/Mimage15.jpg",
    text: "HELLO1",
  },
  {
    Dimage: "/images/image12.jpg",
    Timage: "/images/image12.jpg",
    Mimage: "/images/Mimage12.jpg",
    text: "HELLO2",
  },
  {
    Dimage: "/images/image7.jpg",
    Timage: "/images/image7.jpg",
    Mimage: "/images/image7.jpg",
    text: "HELLO3",
  },
  {
    Dimage: "/images/image4.jpg",
    Timage: "/images/image4.jpg",
    Mimage: "/images/image4.jpg",
    text: "HELLO4",
  },
  {
    Dimage: "/images/image10.jpg",
    Timage: "/images/image10.jpg",
    Mimage: "/images/image5.jpg",
    text: "HELLO5",
  },
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesAndTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesAndTexts.length]);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Determine the appropriate image based on screen size
  const backgroundImage = isMobile
    ? imagesAndTexts[currentIndex].Mimage
    : isTablet
    ? imagesAndTexts[currentIndex].Timage
    : imagesAndTexts[currentIndex].Dimage;

  return (
    <section
      className="flex flex-col text-center text-white relative bg-cover bg-no-repeat h-[700px] w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        transition: "background-image 0.5s ease-in-out", // Smooth transition
      }}
    >
      <div className="flex items-center justify-between border-b border-gray-400 py-5 lg:px-[300px] md:px-[50px] px-[30px] ">
        <Link to="/" className="flex items-center my-8">
          <img
            src="images/logo2.png"
            alt=""
            className="md:w-1/6 lg:w-1/6 w-1/3"
          />
          <h2 className="text-[18px] md:text-[23px] lg:text-[28px] font-[500] text-Heading1">
            Quad Harvest
          </h2>
        </Link>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden md:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
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
                <Link to="/" className=" my-8 uppercase">
                  Home
                </Link>
                <Link to="/about" className=" my-8 uppercase">
                  About
                </Link>
                <Link to="/services" className=" my-8 uppercase">
                  Services
                </Link>
                {/* <Link className=" my-8 uppercase">Blog</Link> */}
                <Link to="/contact" className=" my-8 uppercase">
                  Contact Us
                </Link>
                <Link
                  to="/signup"
                  className="w-[55px] md:w-[100px] lg:w-[100px] px-2 md:px-4 lg:px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="w-[55px] md:w-[100px] lg:w-[100px] px-4 md:px-7 lg:px-7 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
                >
                  Login
                </Link>
                
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-[25px] lg:flex md:flex text-[15px] font-semibold text-Heading2">
          <Link to="/" className=" my-8 uppercase">
                  Home
                </Link>
                <Link to="/about" className=" my-8 uppercase">
                  About
                </Link>
                <Link to="/services" className=" my-8 uppercase">
                  Services
                </Link>
                {/* <Link className=" my-8 uppercase">Blog</Link> */}
                <Link to="/contact" className=" my-8 uppercase">
                  Contacts
                </Link>
                <Link
                  to="/signup"
                  className="my-8 uppercase"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="my-8 uppercase"
                >
                  Login
                </Link>
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
      <main>{imagesAndTexts[currentIndex].text}</main>
    </section>
  );
}
