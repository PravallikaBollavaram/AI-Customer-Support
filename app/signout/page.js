"use client"; // Mark this file as a client component

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

// Function to sign out the user
export const signOutUser = async () => {
  if (typeof window === "undefined") {
    // Ensure this code only runs in the client environment
    return;
  }

  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Redirect the user to the login page or home page, if necessary
    // For example: window.location.href = "/login";
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

// Function to listen to authentication state changes
export const getAuthState = (callback) => {
  if (typeof window === "undefined") {
    // Ensure this code only runs in the client environment
    return;
  }

  return onAuthStateChanged(auth, callback);
};
