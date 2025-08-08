import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { registerOrSyncUser } from "./Services/AuthService";
import { Navbar } from "./Components/Navbar";
import { Outlet } from "react-router-dom";

export function App() {
  const { user, isAuthenticated } = useAuth0();

useEffect(() => {
  if (isAuthenticated && user?.email_verified) { // This prevents unverified users from being saved to the DB.
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
