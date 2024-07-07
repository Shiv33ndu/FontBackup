import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Barometer from "./components/Barometer";
import Newest from "./pages/Newest";
import Category from "./pages/Category";
import Trending from "./pages/Trending";
import Hindi from "./pages/Hindi";
import Sanskrit from "./pages/Sanskrit";
import FontPage from "./pages/FontPage";
import IndiCategory from "./pages/IndiCategory";
import TrialPage from "./pages/TrialPage";
import ContactUs from "./pages/ContactUs";
import ReportProblem from "./pages/ReportProblem";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


export default function App() {
  return (
    <>
      <Container>
        <Header/>
        {/* <Barometer/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/newest' element={<Newest/>}/>
          <Route path='/trending' element={<Trending/>}/>
          <Route path='/hindi' element={<Hindi/>}/>
          <Route path='/sanskrit' element={<Sanskrit/>}/>
          <Route path='/fonts/:fontname/:id' element={<FontPage/>}/>
          <Route path='/category/:categoryName' element={<IndiCategory/>}/>
          <Route path='/trial-page' element={<TrialPage/>}/>
          <Route path='/contact-us' element={<ContactUs/>}/>
          <Route path='/report-problem' element={<ReportProblem/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          
        </Routes>
        <Footer/>
      </Container>
    </>
  )
}