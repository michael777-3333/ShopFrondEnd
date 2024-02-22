function Footer() {
  return (
    <div className="row mt-3" style={{backgroundColor:'purple'}}>
      <div
        className="col-xs-12 col-md-6  mt-4"
        style={{
          backgroundColor: "purple",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>Laptop Shop</h4>
          <div style={{ maxWidth: "200px", color: "white" }}>
            <p>
              Discover a world of cutting-edge technology and unparalleled
              performance with our selection of laptops. Whether you're a
              student, a pr.ofessional
            </p>
          </div>
        </div>

        <div>
          <h4>Contact Us</h4>
          <div>estive03@gmail.com</div>
          <div>+57 3222060545</div>
        </div>
      </div>
      <div
        className="col-xs-12 col-md-6  mt-4"
        style={{
          backgroundColor: "purple",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>Products</h4>
          <div style={{ color: "white" }}>
        
             HP
           
          </div>
          <div style={{color: "white" }}>
           MacBook
          </div>
          <div style={{color: "white" }}>
           Asus
          </div>
          <div style={{color: "white" }}>
           Lenovo
          </div>
          <div style={{color: "white" }}>
           Dell
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>Technology</h4>
          <div>
        
             React
           
          </div>
          <div >
           Node
          </div>
          <div >
           Strapi
          </div>
          <div >
           Strepi
          </div>
          <div >
           Bootstrap
          </div>
        </div>


      </div>
    </div>
  );
}

export default Footer;
