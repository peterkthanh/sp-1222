import React from "react";
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { Headers, MainContainer, CreateContainer } from "./components"

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-auto h-auto flex flex-col bg-primary">
        <Headers />
        <main className=" mt-14 md:mt-20 px-4 md:px-16 py-4 h-full  ">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/CreatItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div >
    </AnimatePresence>
  );
}

export default App;
