// app/authService.js
import { signOut, onAuthStateChanged  } from "firebase/auth";
import { auth } from "@/app/firebase/config";

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Redirect the user to the login page or home page, if necessary
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
export const getAuthState= (callback) => {
    return onAuthStateChanged(auth, callback);
  };