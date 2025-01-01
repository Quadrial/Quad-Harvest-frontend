import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
// import OurService from "./components/Our-service";
import AboutUs from "./components/AboutUs";

const Landingpage = () => {
  return (
    <>
      <div className="top-0 "><Header /></div>
      <main className="flex flex-col gap-5 font-serif">
        <figure className="hbg bg-cover h-[350px] md:h-[550px] lg:h-[650px] -mt-5 flex">
          <div className="flex flex-col gap-5 justify-center lg:w-[600px] md:w-[600px] w-[400px] px-[50px] text-white font-serif">
            <h1 className="md:text-[32px] text-[20px] font-[600]">
              Agriculture Made Smarter With Digital Infrastructure.
            </h1>
            <h2>
              We aim to revolutionize how agriculture product are grown, traed,
              financed, and delivered in Africa through innovative technology.
            </h2>
            <li className="bg-green-500 w-[100px] h-[40px] text-white rounded-md flex items-center justify-center">
              <Link to="/login">Get Started</Link>
            </li>
          </div>
        </figure>
        <figure className="flex flex-col items-center text-center gap-3 px-3">
          <h2 className="flex text-2xl md:text-3xl lg:text-4xl font-[600] gap-2">
            Welcome to <span className="text-green-500">Quad Harvest</span>
          </h2>
          <h3 className="max-w-2xl md:max-w-3xl lg:max-w-6xl">
            At Quad Harvest, we are redefining agriculture by connecting
            communities with innovative solutions. Whether you need to rent
            land, hire skilled farmers, access modern agro tools, or trade fresh
            produce, we are here to make farming smarter, more accessible, and
            sustainable for everyone.
          </h3>
        </figure>
        <div className="overflow-hidden bg-green-500 text-white text-[22px] w-full h-[70px] flex items-center">
          <span className="inline-block whitespace-nowrap animate-move-text">
            🌾 Discover the Future of Agriculture! | 🚜 Rent Land for Farming |
            👨‍🌾 Hire Skilled Farmers | 🛠️ Access Modern Agro Tools | 🥕 Trade
            Fresh Produce Seamlessly | 🌍 Empowering Communities Through
            Innovation in Agriculture!
          </span>
        </div>

        <div className="">
          <AboutUs />
        </div>
      </main>
    </>
  );
};

export default Landingpage;
