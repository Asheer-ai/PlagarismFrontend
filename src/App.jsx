import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SignIn from "./components/SignIn"; // Ensure you're importing this
import Login from "./components/Login";


function App() {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Routes>
        {/* Default route for the main app */}
        <Route
          path="/"
          element={
            <>
              <Header/>
              <Hero/>
              <Benefits/>
              <Collaboration/>
              <Services/>
              <SignIn/>
              <Footer/>
            </>
          }
        />
        {/* Route for the login page */}
        <Route path="/Login" element={<Login />} />
      </Routes>
      <ButtonGradient />
    </div>
  );
}

export default App;
