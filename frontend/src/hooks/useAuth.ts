import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  return auth;
};
