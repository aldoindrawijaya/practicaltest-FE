import logo from './logo.svg';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Addproduct from './pages/Addproduct';
import Login from './pages/Login';
import Guard from './guard/guard'
import Register from './pages/Register'

function App() {
  const isLogin = localStorage.getItem('user_token');

  return (
    <div>
      <Navbar/>
  <Routes>
    <Route path ="/" element={<Guard isLogin={isLogin}> <Home/></Guard>} />
    <Route path ="/addproduct" element={<Addproduct/>} />
    <Route path ="/login" element={<Login/>} />
    <Route path ="/register" element={<Register/>} />
  </Routes>
    </div>
  );
}

export default App;
