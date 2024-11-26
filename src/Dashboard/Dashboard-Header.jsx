// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { BsShop } from "react-icons/bs";
import { MdShoppingCartCheckout, MdOutlineSettings } from "react-icons/md";
// import { IoIosNotifications } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { FaThemeisle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   console.log("Fetched user data:", storedUser);

  //   if (storedUser && storedUser.name && storedUser.email) {
  //     setUser(storedUser);
  //   } else {
  //     console.error("User data not found or incomplete.");
  //   }
  // }, []);
  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      localStorage.removeItem("user");
      alert("You have been logged out.");
      navigate("/login"); // Redirect to the login page
    }
  };

  return (
    <>
      {/* <Header /> */}
      <section className="flex flex-row fixed">
        <main className="flex flex-col gap-20 bg-yellow-50 lg:w-[400px] md:w-[300px] h-[100vh] lg:px-20 md:px-10 py-5">
          <Link to="/dashboard" className="flex items-center">
            <img
              src="images/logo2.png"
              alt=""
              className="md:w-[22%] lg:w-1/6 w-1/3 -ml-5"
            />
            <h2 className="text-[18px] md:text-[24px] lg:text-[30px] font-[500] text-Heading1">
              Quad Harvest
            </h2>
          </Link>
          <main className="flex flex-col gap-5">
            <Link to="/dashboard" className="flex items-center gap-5 text-Heading2 hover:text-Heading1">
              <MdSpaceDashboard className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Dashboard
              </h1>
            </Link>
            <div className="flex items-center gap-5 text-Heading2">
              <IoChatboxEllipsesSharp className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Chat
              </h1>
            </div>
            <div className="flex items-center gap-5 text-Heading2">
              <BsShop className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Market
              </h1>
            </div>
            <div className="flex items-center gap-5 text-Heading2">
              <MdShoppingCartCheckout className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                My order
              </h1>
            </div>
          </main>
          <main className="flex flex-col gap-5">
            <h1 className="uppercase text-[18px] md:text-[24px] lg:text-[30px] font-[500]  text-Heading1">
              Settings
            </h1>

            <div className="flex items-center gap-5 text-Heading2">
              <MdOutlineSettings className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Settings
              </h1>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-5 text-Heading2 cursor-pointer hover:text-red-500 transition duration-200"
            >
              <GrLogout className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500]">
                Logout
              </h1>
            </div>
            <div className="flex items-center gap-5 text-Heading2">
              <FaThemeisle className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Themes
              </h1>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-5 text-Heading2"
            >
              <CgProfile className="w-7 h-7" />
              <h1 className="text-[15px] md:text-[18px] lg:text-[23px] font-[500] ">
                Profile
              </h1>
            </Link>
          </main>
        </main>

        {/* header */}
        
      </section>
    </>
  );
};

export default Header;




