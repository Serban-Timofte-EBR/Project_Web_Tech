import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/auths/authSlice";
import RegisterForm from "../components/auth/Register/register_form";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authError = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (email: string, password: string, role: number) => {
    dispatch(registerUser({ email, password, role }));
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} authError={authError}/>
    </div>
  );
};

export default RegisterPage;
