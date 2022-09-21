import React, { useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { useEffect } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
function MainContainer() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />
      <section className="w-full  my-6  ">
        <div className=" w-full flex items-center justify-between  ">
          <p
            className="text-2xl font-serif capitalize relative text-headingColor 
          before:absolute before:rounded-lg before:content  before:w-32 before:h-1 
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-yellow-200 to-yellow-400
          transition-all ease-in-out duration-100"
          >
            CÁC MÓN ĂN NỔI BẬT
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-400 hover:bg-yellow-300  flex items-center
           cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg  justify-center"
              onClick={() => setScrollValue(-550)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-yellow-400 hover:bg-yellow-300  flex items-center 
           cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg justify-center"
              onClick={() => setScrollValue(550)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.hot == "true")}
        />
      </section>
      <MenuContainer />
      <CartContainer />
    </div>
  );
}

export default MainContainer;
