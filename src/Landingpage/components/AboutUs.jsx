import { motion } from "framer-motion";

const AboutUs = () => {
  const letters = "About Us".split("");

  return (
    <figure className="mt-5 flex flex-col px-[50px] lg:px-[110px]">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-4">
        About Us
      </h2>
      <div className="flex flex-row gap-5 max-w-x">
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-[400px] lg:max-w-3xl">
          At Quad Harvest, we believe in empowering farmers, landowners, and
          consumers by transforming how agriculture is managed and sustained.
          Our platform bridges the gap between technology and traditional
          farming, offering solutions for land rentals, skilled farmer hiring,
          agro-tool access, and produce trading. With a vision to make
          agriculture smarter and more sustainable, we are on a mission to
          revolutionize farming in Africa and beyond.
        </p>
        {/* <picture className=""><img src="images/image5.jpg" alt="" className="rounded-md" /></picture> */}
        <video playsInline autoPlay muted className="w-1/2 rounded-md">
          <source src="videos/video2.mp4" type="video/mp4" />
        </video>
      </div>
    </figure>
  );
};

export default AboutUs;

// import { motion } from "framer-motion";

// const AboutUs = () => {
//   const letters = "About Us".split(""); // Split heading into individual letters

//   return (
//     <figure className="flex flex-col py-12 px-6 sm:px-12 lg:px-20 gap-5">
//       {/* Animated Heading */}
//       <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 flex justify-cente space-x-2">
//         {letters.map((letter, index) => (
//           <motion.span
//             key={index}
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2, duration: 0.5 }}
//             viewport={{ once: false, amount: 0.5 }} // Ensures animation happens only once when in view
//           >
//             {letter === " " ? "\u00A0" : letter} {/* Add non-breaking space */}
//           </motion.span>
//         ))}
//       </h2>
//       <div className="flex flex-row gap-5 max-w-xl">
//         {/* Animated Paragraph */}
//         <motion.p
//           className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: letters.length * 0.1, duration: 0.5 }}
//           viewport={{ once: false, amount: 0.5 }}
//         >
//           At Quad Harvest, we believe in empowering farmers, landowners, and
//           consumers by transforming how agriculture is managed and sustained.
//           Our platform bridges the gap between technology and traditional
//           farming, offering solutions for land rentals, skilled farmer hiring,
//           agro-tool access, and produce trading. With a vision to make
//           agriculture smarter and more sustainable, we are on a mission to
//           revolutionize farming in Africa and beyond.
//         </motion.p>

//         <picture className="">
//           <img src="images/image5.jpg" alt="" className="" />
//         </picture>
//       </div>
//     </figure>
//   );
// };

// export default AboutUs;
