import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/auths/authSlice";
import LoginForm from "../components/auth/Login/login_form";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = async (email: string, password: string) => {
    try {
      const action = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(action)) {
        console.log("Login successful");
        const { role } = action.payload.user;
        if (role === 1) {
          navigate("/members-dashboard"); 
        } else if (role === 0) {
          navigate("/testers-dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      {authError && <p style={{ color: "red" }}>{authError}</p>}{" "}
    </div>
  );
};

export default LoginPage;
