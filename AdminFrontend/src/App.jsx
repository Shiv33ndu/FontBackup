import { Routes, Route, useLocation } from "react-router-dom";
import Fontupload from "./pages/Fontupload";
import Header from "./components/Header";
import Fontlist from "./pages/Fontlist";
import "./index.css";

//import "preline/preline";
import { useEffect } from "react";

export default function App() {

  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <>
      <div id="mainWrapper" className="w-full">
        <Header/> 
        <Routes>
          <Route path="/" element={<Fontupload />} />
          <Route path="/fonts" element={<Fontlist/>}/>
        </Routes>
      </div>
    </>
  )
}