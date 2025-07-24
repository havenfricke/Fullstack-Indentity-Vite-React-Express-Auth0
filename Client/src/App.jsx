import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { registerOrSyncUser } from "./Services/AuthService";
import { Navbar } from "./Components/Navbar";
import { Outlet } from "react-router-dom";

export function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      registerOrSyncUser(user);
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
