import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
function CartContainer() {
  return (
    <div
      className="fixed top-0 right-0  w-full md:w-375 h-screen bg-white flex flex-col 
     drop-shadow-md z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-sans">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-2 px-2 my-2 bg-gray-200 rounded-md 
        hover:shadow-lg  cursor-pointer text-textColor
        text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        <div
          className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
        scrollbar-none"
        >
          {/* cart item */}
          <div className=" w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 ">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
