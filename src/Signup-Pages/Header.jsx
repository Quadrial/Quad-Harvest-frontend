import React from "react";
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <section className="flex justify-between mt-10 lg:px-[150px] md:px-[100px] px-3 items-center">
      <Link to="/" className="flex items-center">
        <img src="images/logo2.png" alt="" className="md:w-1/6 lg:w-1/6 w-1/3" />
        <h2 className="text-[18px] md:text-[23px] lg:text-[28px] font-[500] text-Heading1">Quad Harvest</h2>
      </Link>
      <main className="flex gap-2 md:gap-5 lg:gap-5 text-[10px] md:text-[18px] lg:text-[18px]">

        <Link to="/signup" className="w-[55px] md:w-[100px] lg:w-[100px] px-2 md:px-4 lg:px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700">Sign Up</Link>
        <Link to="/login" className="w-[55px] md:w-[100px] lg:w-[100px] px-4 md:px-7 lg:px-7 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700">Login</Link>

      </main>
    </section>
  );
};

export default Header;
