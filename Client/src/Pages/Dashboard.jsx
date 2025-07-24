import { observer } from "mobx-react-lite";
import { AppState } from "../AppState";
import { useState, useEffect } from "react";
import { updateUserAccount } from "../Services/AuthService";
import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard = observer(() => {
  const { getAccessTokenSilently } = useAuth0();
  const user = AppState.user;

  const [form, setForm] = useState({
    username: '',
    profilePicture: ''
  });

  // Sync form with latest AppState.user (e.g., after a refresh)
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await updateUserAccount(form, token);
    } catch (err) {
      console.error('[Update Failed]', err);
    }
  }

  if (!user) return <div>Loading...</div>;

  return (
    <section>
      <h1>Account Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Profile Picture URL:
          <input
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>

      <hr />

      <h2>Current Info</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <img src={user.profilePicture} alt="profile" height="80" />
    </section>
  );
});
