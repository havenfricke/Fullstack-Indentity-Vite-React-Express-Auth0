import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AppState } from "../AppState";

export function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      // navigate to /dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <nav id="nav">
      <Link to=''>Home</Link>
      <Link to='stuff'>Stuff</Link>

      {!isAuthenticated ? (
        <>
          <button onClick={() => loginWithRedirect()}>Login</button>
          <button onClick={() => loginWithRedirect({ screen_hint: "signup" })}>Sign Up</button>
        </>
      ) : (
        <>
          <button onClick={handleDashboardClick}>
            {AppState.user?.username || 'Dashboard'}
          </button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </>
      )}
    </nav>
  );
}
