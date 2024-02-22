import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useAuth } from "../context/authcontext";
import Cards from "../components/Cards";
import "react-multi-carousel/lib/styles.css";
import { json, useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import { orderRequest } from "../api/auth";
import CarouselFondo from "../components/carousel";
import Footer from "../components/Footer";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Home() {
  const navigate = useNavigate();
  const { productsRequest, products,carItem, setCarItem } = useAuth();



  const stripePromise = loadStripe('pk_test_51OgU4IBgqdyiErOwulw3J8pwiQfdQ5u1TbGYSdZvzQZxtFAOtxsgKsrn2CioZxrun2C2EzpcWJH5eixfpMtttu2w0061P6r4Di');
 async function buyProductsOrRegister (value) {

  let token = window.localStorage.getItem('token')
  if (token) {

    console.log(value);
  

    window.sessionStorage.setItem('shop', JSON.stringify(value))
    setCarItem(value)
    
    // try {
    //   const stripe = await stripePromise
    //   const res= await orderRequest(value,token)
    //   await stripe.redirectToCheckout({
    //     sessionId:res.data.stripeSession.id
    //   })
    // } catch (error) {
    //   console.log(error);
    // }
    navigate('/car')


  }else{
    navigate('/login')
  }
  
    
  }
  //   console.log(products);

  return (
    
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <CarouselFondo/>
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <Carousel  infinite={true} responsive={responsive}>
            {products &&
              products.map((product) => (
                <Cards
                  title={product.attributes.Title}
                  key={product.id}
                  id={product.id}
                  description={product.attributes.Description}
                  img={product.attributes.img.data.attributes.name}
                  buyProducts={buyProductsOrRegister}
                  price={product.attributes.price}
                  qty={product.attributes.qty}
                />
              ))}
          </Carousel>

          
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <Carousel  infinite={true} responsive={responsive}>
            {products &&
              products.map((product) => (
                <Cards
                  title={product.attributes.Title}
                  key={product.id}
                  id={product.id}
                  description={product.attributes.Description}
                  img={product.attributes.img.data.attributes.name}
                  buyProducts={buyProductsOrRegister}
                  price={product.attributes.price}
                  qty={product.attributes.qty}
                />
              ))}
          </Carousel>

          
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Home;
