// RequireAuth.jsx
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
