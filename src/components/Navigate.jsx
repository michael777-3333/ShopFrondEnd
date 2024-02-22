import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import Drawer from "react-modern-drawer";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { orderRequest } from "../api/auth";
import "react-modern-drawer/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Navigate() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const {
    logout,
    car,
    handleAddCarRest,
    handleAddCar,
    products,
    errors,
    verifyShop,
  } = useAuth();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  function setHandleAddCar(params, data) {
    if (params === "addCard") {
      dataCar = window.localStorage.getItem("car");
      dataCar = JSON.parse(dataCar);
      console.log(dataCar);

      handleAddCar(product);
    } else if (params === "sumProduct") {
      const findProduct = products.find((item) => item.id === data);
      handleAddCar(findProduct);
    } else {
      const findProduct = products.find((item) => item.id === data);
      handleAddCarRest(findProduct);
    }
  }

  async function doBuy() {
    let token = window.localStorage.getItem("token");

    if (token) {
      verifyShop(token);
    } else {
      navigate("/login");
    }
  }

  function handdleLogout() {
    logout();
  }
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary position-sticky fixed-top"
      style={{ backgroundColor: "purple" }}
    >
      {errors.map((error, i) => (
            <div
              className="error-message"
              key={i}
              style={{
                color: "white",
                backgroundColor: "black",
                height: "50px",
              }}
            >
              <p>{error}</p>
            </div>
          ))}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        style={{ width: "400px" }}
        direction="right"
        className="bla bla bla"
      >
        {car &&
          car.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
               
              <button
                name="sumProduct"
                onClick={(e) => {
                  const buttonName = e.target.name;
                  setHandleAddCar(buttonName, item.id);
                }}
                className="btn btn m-1"
                style={{
                  color: "white",
                  backgroundColor: "purple",
                  width: "40px",
                }}
              >
                +
              </button>
              <img
                src={item.img}
                style={{ width: "60px", marginRight: "10px" }}
                alt=""
              />
              <div style={{ flex: 1 }}>Quantity: {item.quantity}</div>
              <button
                className="btn btn"
                name="restProduc"
                onClick={(e) => {
                  const buttonName = e.target.name;
                  setHandleAddCar(buttonName, item.id);
                }}
                style={{
                  color: "white",
                  backgroundColor: "purple",
                  width: "40px",
                }}
              >
                -
              </button>
            </div>
          ))}
        <button
          onClick={doBuy}
          className="btn btn m-1"
          style={{
            color: "white",
            backgroundColor: "purple",
            width: "50px",
          }}
        >
          Buy
        </button>
      </Drawer>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          LaptopShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LogIn
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handdleLogout}>
                LogOut
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                style={{ color: "black" }}
                to="/register"
                onClick={() => {
                  toggleDrawer();
                  console.log("dsadads");
                }}
              >
                <Cart2 style={{ color: "purple", fontSize: "30px" }}></Cart2>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navigate;
