import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { registerUser } from "../redux/auths/authSlice";
import RegisterForm from "../components/auth/Register/register_form";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = (email: string, password: string, role: number) => {
    dispatch(registerUser({ email, password, role }));
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
