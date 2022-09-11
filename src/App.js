import React from "react";
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { Headers, MainContainer, CreateContainer } from "./components"

function App() {
  return (
    <AnimatePresence>
      <div className=" w-screen h-auto flex flex-col bg-primary">
        <Headers />
        <main className="mt-24 p-8 w-full">
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
