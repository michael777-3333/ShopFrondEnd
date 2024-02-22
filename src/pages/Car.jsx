import { useAuth } from "../context/authcontext";
import Drawer from "react-modern-drawer";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "react-modern-drawer/dist/index.css";
import { orderRequest } from "../api/auth";
import { Cart2 } from "react-bootstrap-icons";
function Carrito() {
  const stripePromise = loadStripe(
    "pk_test_51OgU4IBgqdyiErOwulw3J8pwiQfdQ5u1TbGYSdZvzQZxtFAOtxsgKsrn2CioZxrun2C2EzpcWJH5eixfpMtttu2w0061P6r4Di"
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { products, handleAddCar, car, handleAddCarRest, errors, verifyShop } =
    useAuth();

  let shop = window.sessionStorage.getItem("shop");
  let product = JSON.parse(shop);

  useEffect(() => {
    shop = window.sessionStorage.getItem("shop");
    product = JSON.parse(shop);
  }, [car]);

  function setHandleAddCar(params, data) {
    if (params === "addCard") {
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
  //

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-md-6">
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
          <div className="d-flex justify-content-center">
            <img
              style={{
                width: "600px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              src={product && product.img}
              alt=""
            />
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{product && product.title}</h1>
          </div>

          <div style={{ textAlign: "center" }}>
            <p>{product && product.description}</p>
          </div>

          {/* <div>{product.qty}</div> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className=" btn btn"
              name="addCard"
              style={{
                color: "white",
                backgroundColor: "purple",
                width: "90px",
              }}
              onClick={(e) => {
                const buttonName = "addCard";
                toggleDrawer(), setHandleAddCar(buttonName);
              }}
            >
              <Cart2 style={{ fontSize: "30px" }}></Cart2>
            </button>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              style={{ width: "400px", marginTop: "55px" }}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
