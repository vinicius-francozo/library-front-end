import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === 0) {
      navigate("/login", { replace: true });
      return null;
    }
  }, [navigate, user]);

  return children;
}
