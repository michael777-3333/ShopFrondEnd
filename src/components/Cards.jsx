function Cards(props) {
  function letBuyProduct() {
    props.buyProducts(props);
  }

  return (
    <div className="card" style={{ width: "18rem", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    <div className="d-flex justify-content-center">
      <img
        src={props.img}
        className="card-img-top"
        style={{ width: "250px", height: "180px", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        alt="Product"
      />
    </div>
  
    <div className="card-body">
      <div style={{ display: "none" }}>{props.price}</div>
      {/* <div>{props.id}</div> */}
      <div style={{ display: "none" }}>{props.qty}</div>
      <div className="d-flex justify-content-center">
        <h5 className="card-title">{props.title}</h5>
      </div>
      <div className="d-flex justify-content-center">$: {props.price}</div>
      <div
        className="d-flex justify-content-center"
        style={{
          maxHeight: "50px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "pre-wrap",
          textAlign: "center"
        }}
      >
        <p className="card-text">{props.description}</p>
      </div>
  
      <div className="d-flex justify-content-center mt-3">
        <button
          style={{ backgroundColor: "purple", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          onClick={letBuyProduct}
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default Cards;
