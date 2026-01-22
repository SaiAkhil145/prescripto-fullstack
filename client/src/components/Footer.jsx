/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
      className="bg-gray-50 border-t border-gray-200 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1.5fr_1.5fr] gap-12 text-sm text-gray-600">
          
          {/* Left */}
          <div>
            <img className="w-40 mb-5" src={assets.logo} alt="Prescripto Logo" />
            <p className="leading-relaxed max-w-md">
              Prescripto is your trusted platform to book appointments with
              verified doctors. We make healthcare simple, fast, and reliable
              with just a few clicks.
            </p>
          </div>

          {/* Center */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-5">Company</p>
            <ul className="flex flex-col gap-3">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-5">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3">
              <li className="hover:text-primary transition-colors">
                📞 +1-123-456-7890
              </li>
              <li className="hover:text-primary transition-colors">
                ✉️ support@prescripto.com
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Prescripto. All rights reserved.
          </p>

          <div className="flex gap-4 text-gray-500 text-sm">
            <span className="cursor-pointer hover:text-primary transition">
              Terms
            </span>
            <span className="cursor-pointer hover:text-primary transition">
              Privacy
            </span>
            <span className="cursor-pointer hover:text-primary transition">
              Support
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
