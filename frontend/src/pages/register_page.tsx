import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/auths/authSlice";
import RegisterForm from "../components/auth/Register/register_form";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (
    email: string,
    password: string,
    role: number,
    teamID: number | null
  ) => {
    dispatch(registerUser({ email, password, role, teamID }))
      .then((action) => {
        if (registerUser.fulfilled.match(action)) {
          console.log("Registration successful");
          navigate("/login");
        }
      })
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} authError={authError} />
    </div>
  );
};

export default RegisterPage;
