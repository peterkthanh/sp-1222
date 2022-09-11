import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../asset/img/logo.png";
import Avatar from "../asset/img/avatar.png";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const login = async () => {
    const response = await signInWithPopup(firebaseAuth, provider);
  };

  return (
    <header className="fixed z-50  w-screen  p-2 px-16 bg-yellowPrimary">
      {/* desktop & Table */}
      <div className="hidden md:flex w-full h-full p-1">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-blod ">CHICKEN PLUS+</p>
        </Link>
        <ul className="flex item-center  gap-8 ml-auto  items-center">
          <li className=" text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 translate-all ease-in-out ">
            Trang Chủ
          </li>
          <li className="text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 translate-all ease-in-out ">
            Menu
          </li>
          <li className="text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 translate-all ease-in-out ">
            Giới Thiệu
          </li>
          <li className="text-lg text-textColor  hover: text-headingColorcursor-pointer duration-100 translate-all ease-in-out ">
            Liên Hệ
          </li>
        </ul>
        <div className="relative flex items-center justify-center ml-5 mr-5">
          <MdShoppingCart className="text-textColor text-2xl w-8 h-8 cursor-pointer" />
          <div
            className=" absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex 
          item-center justify-center"
          >
            <p className="text-xs text-white font-semibold"> 2</p>
          </div>
        </div>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[36px]  h-10 min-h-[36px] drop-shadow-xl cursor-pointer"
            src={Avatar}
            alt="userprofile"
          />
        </div>
      </div>
      {/* mobile */}
      <div className=" flex md:hidden w-full h-full  p-4"></div>
    </header>
  );
}

export default Header;
