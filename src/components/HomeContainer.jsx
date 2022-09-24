import React from "react";
import delivery from "../asset/img/delivery.png";
import herob from "../asset/img/heroBg.png";

import { heroData } from "../utils/data";
function homeContainer() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex  flex-col items-start  justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-yellow-300 p-2 px-2 py-2 rounded-full">
          <p className="text-base  text-white font-sans">Bike Delivery</p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem]  font-bold md:text-[4.5rem]  tracking-wide  text-headingColor ">
          Making every Day better.
          <span className=" text-yellowPrimary text-[4rem] md:text-[3.5rem]">
            CHiCKEN PLUS+
          </span>
        </p>
        <p className="text-base text-textColor font-sans text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aperiam
          unde labore beatae nemo, id doloremque quidem possimus molestiae
          voluptatibus, voluptates quam quaerat sint reprehenderit a aspernatur,
          placeat consectetur quia.
        </p>
        <button
          type="button"
          className="  bg-gradient-to-br  w-full  duration-100 px-4 py-1 rounded-2xl md:w-auto 
        bg-yellow-400 hover:bg-yellow-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300 "
        >
          <p className="text-textColorWhite">Oder Now</p>
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={herob}
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="herob"
        />
      </div>
    </section>
  );
}

export default homeContainer;
