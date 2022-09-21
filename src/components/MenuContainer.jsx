import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoFastFoodOutline } from "react-icons/io5";

import { categories } from "../utils/data";
import ShowMenuContainer from "./ShowMenuCotainer";
import { useStateValue } from "../context/StateProvider";

function MenuContainer() {
  const [filter, setFilter] = useState("Món Chính");
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-serif capitalize relative text-headingColor 
          before:absolute before:rounded-lg before:content  before:w-32 before:h-1 
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-yellow-300 to-yellow-500
          transition-all ease-in-out duration-100 mr-auto"
        >
          MENU CHÍNH
        </p>
        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 mt-6 overflow-x-scroll
          scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                key={category.id}
                whileTap={{ scale: 0.75 }}
                className={`group ${
                  filter === category.urlParamName
                    ? "bg-yellowPrimary"
                    : "bg-card"
                } w-36 min-w-[140px]  h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col 
                gap-3 items-center justify-center duration-150 translate-all ease-in-out hover:bg-yellowPrimary`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`  ${
                    filter === category.urlParamName
                      ? "bg-card"
                      : "bg-yellowPrimary"
                  } w-10 h-10 rounded-full shadow-lg group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFoodOutline
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor - "
                        : "text-white "
                    }text-white group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  }text-sm text-center truncate group-hover:text-card`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full ">
          <ShowMenuContainer
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
