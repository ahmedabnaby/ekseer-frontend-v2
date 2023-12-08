import React from "react";
import { Header } from "./includes/header";
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./includes/footer";
import { Register } from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" name="Home" index element={<Home />} />
        <Route exact path="/login" name="Login" element={<Login />} />
        <Route exact path="/register" name="Login" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
