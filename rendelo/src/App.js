import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Komponensek/Navbar/Navbar";
import Fooldal from "./Komponensek/Oldalak/Fooldal";
import Signup from "./Komponensek/Oldalak/Signup";
import Kapcsolat from "./Komponensek/Oldalak/Kapcsolat";
import Login from "./Komponensek/Oldalak/Login";
import Logout from "./Komponensek/Oldalak/Logout";
import { ShopContextProvider } from "./context/shop-context";
import Shop from './Komponensek/Oldalak/shop';
import Cart from './Komponensek/Oldalak/cart';
import { FooterContainer } from './containers/footer';

function App()
{
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<><Fooldal /><FooterContainer /></>} />
            <Route path="/fooldal" element={<><Fooldal /><FooterContainer /></>} />
            <Route path="/shop" element={<><Shop /><FooterContainer /></>} />
            <Route path="/cart" element={<><Cart /><FooterContainer /></>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/kapcsolat" element={<><Kapcsolat /><FooterContainer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;