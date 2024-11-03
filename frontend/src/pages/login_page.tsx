import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { loginUser } from "../redux/auths/authSlice";
import LoginForm from "../components/auth/Login/login_form";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handle_login = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <LoginForm onSubmit={handle_login} />
    </div>
  );
};

export default LoginPage;
