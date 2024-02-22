import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navigate from "./components/Navigate";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { AuthProvider } from "./context/authcontext";
import Carrito from "./pages/Car";
import Register from "./pages/Register";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigate />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/car" element={<Carrito />} />
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
