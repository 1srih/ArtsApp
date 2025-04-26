import "./SignUp.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let { register, handleSubmit, watch , formState: { errors },} = useForm();

  const password = watch("password", "");
  const confirmPasswordRef =  useRef()

  async function onSignUpFormSubmit(userObj) {
    const confirmPwd = confirmPasswordRef.current.value;

    if (password !== confirmPwd) {
      setErr("Passwords do not match");
      return;
    }
    
    if(userObj.userType ==='user'){
    const res = await axios.post(
      "http://localhost:5000/user-api/auth/signup",
      userObj
    );
    console.log(res);
    if (res.data.message === "User Account created successfully") {
      // navigate to sign in
      navigate("/SignIn");
    } else {
      setErr(res.data.message);
    }}
    else if(userObj.userType ==='admin'){
        const res = await axios.post(
          "http://localhost:5000/admin-api/auth/signup",
          userObj
        );
        console.log(res);
        if (res.data.message === "Admin Account created successfully") {
          // navigate to sign in
          navigate("/SignIn");
        } else {
          setErr(res.data.message);
        }}
  }
  return (
    <>
      

      {/* user register error message */}
      {err.length !== 0 && <p style={{ color: '#ff758f' }} > {err} </p>}

      <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <h3>Sign Up</h3>
        {/* <input
          type="radio"
          name="userType"
          value="user"
          id="user"
          required
          {...register("userType")}
        />
        <label htmlFor="User">User</label>

        <input
          type="radio"
          name="userType"
          value="admin"
          id="admin"
          {...register("userType")}
        />
        <label htmlFor="Admin">Admin</label>
        <br /> */}

<div className="radio-group">
  <div className="radio-option">
    <input
      type="radio"
      id="user"
      value="user"
      {...register("userType", { required: "Please select User or Admin" })}
      
    />
    <label htmlFor="user">User</label>
  </div>
  <div className="radio-option">
    <input
      type="radio"
      id="admin"
      value="admin" 
      {...register("userType")}
    />
    <label htmlFor="admin">Admin</label>
  </div>
</div>
{errors.userType && <span className="error">{errors.userType.message}</span>}


        <label htmlFor="Email">Email</label>
        <input type="email" required {...register("email")} />
        <br />

        <label htmlFor="Username">Username</label>
        <input type="text" required {...register("username")} />
        <br />

        <label>Password</label>
        <input type="password" required {...register("password")} /> <br />

        <label>Confirm Password</label>
        <input type="password" required ref={confirmPasswordRef} /> <br />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default SignUp;
