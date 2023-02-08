import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import Menu from "./Components/Menu.jsx";

function App() {

  return (
      <BrowserRouter>
          <Menu />
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path={"/signup"} element={<Signup />} />
              <Route path={'/'} element={<Home/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
