import React from "react";
import { Header } from "./includes/header";
import { Home } from "./pages/Home"
import { Contact } from "./pages/Contact"
import { About } from "./pages/About"
import { Login } from "./pages/Login"
import { Logout } from "./includes/Logout"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./includes/footer";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ConfirmForgotPassword } from "./pages/ConfirmForgotPassword";
import { Questions } from "./pages/Questions";
import { VideoCall } from "./VideoCall";
import { Calls } from "./pages/Calls";
import { PaymentForm } from "./pages/PaymentForm";
import { Consultations } from "./pages/Consultations";
import ScrollToTop from "./helpers/helpers";
import { OurDoctors } from "./pages/OurDoctors";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route exact path="/" name="Home" index element={<Home />} />
        <Route exact path="/contact-us" name="Contact" element={<Contact />} />
        <Route exact path="/about-us" name="About" element={<About />} />
        <Route exact path="/our-doctors" name="About" element={<OurDoctors />} />
        <Route exact path="/privacy-policy" name="About" element={<PrivacyPolicy />} />

        <Route exact path="/login" name="Login" element={<Login />} />
        <Route exact path="/logout" name="Logout" element={<Logout />} />
        <Route exact path="/register" name="Register" element={<Register />} />
        <Route exact path="/reset-password" name="Reset_Password" element={<ForgotPassword />} />
        <Route exact path="/confirm-reset-password/:token" name="Confirm_Reset_Password" element={<ConfirmForgotPassword />} />

        <Route exact path="/questions" name="Questions" element={<Questions />} />
        <Route exact path="/consultations" name="Consultations" element={<Consultations />} />
        <Route exact path="/calls" name="Questions" element={<Calls />} />
        <Route exact path="/payment" name="PaymentForm" element={<PaymentForm />} />

        <Route exact path="/video-call" name="PaymentForm" element={<VideoCall />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
