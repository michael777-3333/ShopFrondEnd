import img from '../../public/fondo.jpg'
function CarouselFondo(){
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className="divclass" style={{transform: "translateY(-50%)", position: 'absolute', top:'50%',borderRadius:'10px',maxWidth:'700px',height:'100px',alignItems:'center', display:'flex'}}>
            {/* <h1 style={{color:'white',fontSize:'60px', left:'45%'}}>YOUR FAVORITE SERIES AND MOVIES</h1> */}
            </div>
            
            
            <img src={img} alt="" style={{width:'100%',height:'680px'}} />
        </div>
    );
}

export default CarouselFondo