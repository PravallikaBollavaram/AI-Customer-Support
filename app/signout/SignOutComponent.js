// app/signout/SignOutComponent.js

"use client"; // Ensure this component is treated as a client-side component

import { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Redirect the user to the login page or home page, if necessary
    // For example: window.location.href = "/login";
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const getAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default function SignOutComponent() {
  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <div>
      <p>Signing you out...</p>
    </div>
  );
}
