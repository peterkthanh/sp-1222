import React, { useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function RowContainer({ flag, data, scrollValue }) {
  const rowContainer = useRef();

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = (item) => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [...cartItems, item],
    });
  };
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth    ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center "
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 h-[175] min-w-[300px]  md:w-340 md:min-w-[340px] 
               my-12 bg-white rounded-lg p-2 backdrop-blur-lg  
             hover:drop-shadow-2xl  "
          >
            <div className="w-full flex  items-center justify-between ">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 cursor-pointer drop-shadow-xl "
              >
                <img
                  src={item?.imageURl}
                  alt=""
                  className="w-full h-full  object-contain "
                />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end truncate  ">
              <p className="text-textColor font-sans text-base md:text-lg  ">
                {item?.title}
              </p>
              <div className="flex items-center gap-8 ">
                <p className="text-lg text-headingColor font-sans">
                  <span className="text-base  text-yellowPrimary">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RowContainer;
