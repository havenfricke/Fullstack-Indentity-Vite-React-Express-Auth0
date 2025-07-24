import { api } from "./AxiosService";
import { AppState } from "../AppState";

export async function registerOrSyncUser(user) { 
  const { sub, email, name, picture } = user;
  try {
      const response = await api.post('/users', {
        // THESE VALUES WILL SYNC WITH AUTH0 EVERY REFRESH OR LOGIN
        // DO NOT USE ANYTHING ELSE HERE UNLESS YOU WANT IT TO SYNC
        auth0Id: sub,
        email,
        username: name,
        profilePicture: picture
      });

      AppState.user = response.data;
  } catch (error) {
      console.error('[User Sync Failed]', error);
  }
}

export async function updateUserAccount(formData, token) {
  try {
    const id = AppState.user.id;
    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    AppState.user = response.data;
  } catch (error) {
    console.error('[Update User Failed]', error.response?.data || error);
  }
}







