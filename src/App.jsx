import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Menu from "./Components/Menu.jsx";
import CarInfo from "./Pages/CarInfo.jsx";
import Profile from "./Pages/Profile.jsx";
import CarSearch from "./Pages/CarSearch.jsx";
import AddNewCar from './Pages/AddNewCar';

function App() {

  return (
      <BrowserRouter>
          <Menu />
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/carInfo/:carnumber" element={<CarInfo/>}/>
              <Route path={"/signup"} element={<Signup />} />
              <Route path={'/'} element={<Home/>} />
              <Route path={'/profile'} element={<Profile/>} />
              <Route path={'/addnewcar'} element={<AddNewCar/>} />
              <Route path={'/cars'} element={<CarSearch/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
