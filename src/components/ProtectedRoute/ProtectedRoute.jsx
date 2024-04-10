import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { useEffect } from "react";

export default function ProtectedRoute({ children, isProtected = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === 0) {
      navigate("/login", { replace: true });
      return null;
    } else if (user !== null && isProtected && !user?.isAdmin) {
      navigate("/", { replace: true });
      return null;
    }
  }, [navigate, user, isProtected]);

  return children;
}
