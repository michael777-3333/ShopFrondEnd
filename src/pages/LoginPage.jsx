import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { login,errors,isAuthenticate } = useAuth();
  const { register, handleSubmit } = useForm(); //me ahorra el useState()

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    login(values);
  });

  useEffect(() => {
    if (isAuthenticate) navigate("/");
  }, [isAuthenticate]);

  return (
    <div className="container-fluid">
      <div className="row" style={{ backgroundColor: "purple" }}>
        <div
          className="col d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "purple", height: "90vh" }}
        >
          {errors.map((error, i) => (
            <div
              className="error-message"
              key={i}
              style={{ color: "white", backgroundColor: "black", height: "50px" }}
            >
              <p>{error}</p>
            </div>
          ))}
          <form
            onSubmit={onSubmit}
            className="loginDiv mt-5"
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ color: "white" }}>Welcome Back</h3>
            </div>
            <div className="mb-3">
              <input
                {...register("identifier", { required: true })}
                className="input"
                type="text"
                placeholder="email"
              />
            </div>

            <div className="mb-3">
              <input
                {...register("password", { required: true })}
                className="input"
                type="password"
                placeholder="password"
              />
            </div>

            <div>
              <button style={{ color: "white" }} className="btn btn bg-black">
                {" "}
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
