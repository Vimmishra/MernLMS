import React from "react";
import { motion } from "framer-motion";


export default function AboutUs({ image1 = "/images/image1.jpg", image2 = "/images/image2.jpg" }) {
  // Framer motion variants
  const container = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
  };

  return (
    <motion.main
      className="max-w-5xl mx-auto p-6 sm:p-8"
      initial="hidden"
      animate="show"
      variants={container}
      aria-labelledby="about-heading"
    >
      <motion.h1 variants={item} id="about-heading" className="text-3xl sm:text-4xl font-bold text-sky-700 mb-4">
        About Our Library
      </motion.h1>

      <motion.p variants={item} className="text-gray-700 mb-6 leading-relaxed">
        Welcome to Guru Nanak Dev District Library — a place for learners, readers and curious minds. We offer a comfortable
        reading environment, a growing collection of books across subjects and regular events for students and local
        readers.
      </motion.p>

      <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Image card 1 */}
        <motion.div
          variants={item}
          className="rounded-2xl overflow-hidden shadow-md p-4 bg-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="h-56 sm:h-64 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={"/library1.avif"}
              alt="Library image 1"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mt-3">
            <h3 className="font-semibold">Our Reading Hall</h3>
            <p className="text-sm text-gray-500">Cozy spaces and quiet corners for focused reading.</p>
          </div>
        </motion.div>

        {/* Image card 2 */}
        <motion.div variants={item} className="rounded-2xl overflow-hidden shadow-md p-4 bg-white" whileHover={{ scale: 1.02 }}>
          <div className="h-56 sm:h-64 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={"/library2.png"}
              alt="Library image 2"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mt-3">
            <h3 className="font-semibold">Events & Programs</h3>
            <p className="text-sm text-gray-500">Workshops, reading clubs and student drives throughout the year.</p>
          </div>
        </motion.div>
      </motion.section>

      <motion.div variants={item} className="rounded-lg p-6 bg-sky-50 border border-sky-100">
        <h2 className="text-2xl font-semibold text-sky-800 mb-2">Membership / Joining Fees</h2>
        <p className="text-lg sm:text-xl font-bold">Rs 500/- <span className="font-normal">for 5 Years</span></p>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
         

          <button
            className="px-4 py-2 rounded-md border border-sky-300 bg-white text-sky-700 hover:bg-sky-50"
            onClick={() => alert("Contact library admin at admin@library.com ")}
          >
            Contact Us
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500">Fee will be collected at the library counter.</p>
      </motion.div>

      <motion.footer variants={item} className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} Guru Nanak Dev District Library</motion.footer>
    </motion.main>
  );
}