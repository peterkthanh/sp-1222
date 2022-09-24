import React, { useState } from "react";
import { MdShoppingCart, MdAdd, MdLogout, MdOutlineMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../asset/img/logo.png";
import Avatar from "../asset/img/avatar.png";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const handleSideNav = () => {
    return <div></div>;
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header className="fixed z-50 max-h[80px] w-screen p-3 px-4 md:p-6 md:px-16 bg-yellowPrimary">
      {/* desktop & Table */}
      <div className="hidden md:flex w-full h-full items-center justify-between ">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-blod ">CHICKEN PLUS+</p>
        </Link>
        <div className="flex items-center gap-8"></div>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-16 "
          >
            <li className="text-base font-bold text-textColor hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              TRANG CHỦ
            </li>
            <li className="text-base font-bold text-textColor hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              MENU
            </li>
            <li className="text-base font-bold text-textColor hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              GIỚI THIỆU
            </li>
            <li className="text-base font-bold backdrop: text-textColor hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              LIÊN HỆ
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center ml-5 mr-5">
            <MdShoppingCart
              className="text-textColor text-2xl w-8 h-8 cursor-pointer"
              onClick={showCart}
            />
            {cartItems && cartItems.length > 0 && (
              <div
                className=" absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex 
             item-center justify-center"
              >
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {isMenu && (
                  <Link to={"/CreatItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className=" flex items-center min-h-[80px] justify-between md:hidden   ">
        <div className="relative flex items-center justify-center ml-5 mr-5">
          <MdOutlineMenu
            className="w-10 min-w-[36px]  h-10 min-h-[36px] rounded-lg drop-shadow-xl cursor-pointer bg-slate-50"
            onClick={handleSideNav}
          />
          <div className="relative">
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {isMenu && (
                  <Link to={"/CreatItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
        <div className="relative flex items-center justify-center ml-5 mr-5">
          <Link to={"/"} className="flex items-center">
            <img src={Logo} className="w-10 object-cover" alt="logo" />
            <p className="text-headingColor text-xl font-blod ">
              CHICKEN PLUS+
            </p>
          </Link>
        </div>
        <div className="relative flex items-center justify-center ml-5 mr-5">
          <MdShoppingCart className="text-textColor text-2xl w-8 h-8 cursor-pointer" />

          <div
            className=" absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex 
          item-center justify-center"
          >
            <p className="text-xs text-white font-semibold"> 2</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
