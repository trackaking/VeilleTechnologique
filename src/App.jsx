import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Menu from "./Components/Menu.jsx";
import CarInfo from "./Pages/CarInfo.jsx";

function App() {

  return (
      <BrowserRouter>
          <Menu />
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/carInfo" element={<CarInfo/>}/>
              <Route path={"/signup"} element={<Signup />} />
              <Route path={'/'} element={<Home/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
