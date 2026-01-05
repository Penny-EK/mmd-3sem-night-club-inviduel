"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import HeaderBg2 from "@/app/assets/bg/header_bg_2.jpg";
import BottomLine from "@/app/assets/bottom_line.png";
import LogoSvg from "@/app/assets/icon/BetterLogo.svg";
import MainBg from "@/app/assets/bg/pattern_bg.jpg";
export default function HeroBanner() {
  return (
    <div className="grid place-items-center *:[grid-area:1/1]">
      <div
        className="w-full"
      >
        <Image
          src={HeaderBg2}
          alt="Hero Banner"
          className="h-[868px] w-full object-cover"
        />
      </div>
      <motion.div
        className="w-full"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
      >
        <Image
          src={MainBg}
          alt="Hero Placeholder Background"
          className="h-[868px] w-full object-cover"
        />
      </motion.div>
      <div className="grid place-items-center gap-y-4 px-8">
        <motion.div
          className="w-full max-w-[745px]"
          style={{ transformOrigin: "center bottom" }}
          initial={{ opacity: 0, rotateX: 70 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image src={LogoSvg} alt="Logo" />
        </motion.div>
        <motion.p
          className="text-3xl font-medium tracking-[100%] uppercase max-lg:text-2xl max-md:text-xl max-sm:text-xs"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }}
        >
          Have a good time
        </motion.p>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5,ease: "easeInOut" }}
        >
          <Image
            src={BottomLine}
            alt="Ornamental bottom border"
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
