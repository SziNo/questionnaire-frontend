import { jwtDecode } from "jwt-decode";
import useStore from "@/store/zustandStore";

export const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Adding a buffer for expiration
      const bufferTime = 300; // 5 minutes in seconds

      // Log token and current time for debugging
      console.log("Token expiration time:", new Date(decodedToken.exp * 1000));
      console.log("Current time:", new Date(currentTime * 1000));

      if (!decodedToken.exp || decodedToken.exp - bufferTime < currentTime) {
        // Token has expired or is invalid
        console.log("Token has expired or is invalid");
        localStorage.removeItem("token");
        useStore.getState().setIsLoggedIn(false);
        useStore.getState().setIsAdmin(false);
      } else {
        // Token is valid
        console.log("Token is valid");
        useStore.getState().setIsLoggedIn(true);
        useStore.getState().setIsAdmin(decodedToken.isAdmin);
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      useStore.getState().setIsLoggedIn(false);
      useStore.getState().setIsAdmin(false);
    }
  } else {
    console.log("No token found in localStorage");
    useStore.getState().setIsLoggedIn(false);
    useStore.getState().setIsAdmin(false);
  }
};
