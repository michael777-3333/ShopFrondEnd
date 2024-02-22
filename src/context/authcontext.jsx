import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, orderRequest } from "../api/auth";
import { loadStripe } from "@stripe/stripe-js";
import { productsApi } from "../api/products";
import { json } from "react-router-dom";

export const AuthContext = createContext();
const carFronLocalSorage = JSON.parse(localStorage.getItem("car") || []);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const stripePromise = loadStripe(
    "pk_test_51OgU4IBgqdyiErOwulw3J8pwiQfdQ5u1TbGYSdZvzQZxtFAOtxsgKsrn2CioZxrun2C2EzpcWJH5eixfpMtttu2w0061P6r4Di"
  );
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [carItem, setCarItem] = useState([]);
  const [car, setCar] = useState(carFronLocalSorage);
  const [carData, setCarData] = useState();
  const [quantity, setquantity] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("car", JSON.stringify(car));
  }, [car]);

  const handleAddCar = (product) => {
    const existingProductIndex = car.findIndex(
      (item) => item.id === product.id
    );
    console.log(existingProductIndex);
    if (existingProductIndex !== -1) {
      const updatedCar = car.map((item, index) => {
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCar(updatedCar);
    } else {
      const updatedCar = [...car, { ...product, quantity: 1 }];
      setCar(updatedCar);
    }
  };
  const handleAddCarRest = (product) => {
    const existingProductIndex = car.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCar = car.map((item, index) => {
        console.log(item);
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 0), // Asegura que la cantidad no sea negativa
          };
        }
        return item;
      });
      const filteredCar = updatedCar.filter((item) => item.quantity > 0);
      setCar(filteredCar);
    }
  };
  const register = async (value) => {
    try {
      const res = await registerRequest(value);
      window.localStorage.setItem("token", res.data.jwt);
      setIsAuthenticate(true);
    } catch (error) {
      setErrors([error.response.data.error.message]);
      setIsAuthenticate(false);
    }
  };

  const verifyShop = async (token) => {
    try {
      const stripe = await stripePromise;
      const res = await orderRequest(car, token);
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      setErrors([`${error.response.data.error.message}, Log in again`]);
      console.log(error.response.data.error.message);
      setIsAuthenticate(false);
    }
  };

  const login = async (value) => {
    try {
      const res = await loginRequest(value);
      window.localStorage.setItem("token", res.data.jwt);
      setIsAuthenticate(true);
    } catch (error) {
      setErrors([error.response.data.error.message]);
      setIsAuthenticate(false);
    }
  };

  const productsRequest = async () => {
    try {
      const res = await productsApi();
      console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    productsRequest();

    // const carritoLS = JSON.parse(window.localStorage.getItem("car")) ?? [];
    // console.log(carritoLS);
    // setCar(carritoLS);
    // console.log(car);
  }, []);
  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }, [errors]);

  const logout = async () => {
    window.localStorage.removeItem("token");
    window.localStorage.setItem("car", JSON.stringify([]));
    setIsAuthenticate(false);

    window.sessionStorage.removeItem("shop");
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        productsRequest,
        products,
        car,
        carItem,
        setCarItem,
        handleAddCar,
        quantity,
        car,
        register,
        handleAddCarRest,
        logout,
        carData,
        setCarData,
        isAuthenticate,
        errors,
        verifyShop
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
