'use client';

import { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

export const SignOutPage = () => {
  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (user) {
        console.log("User is signed in");
      } else {
        console.log("User is signed out");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Redirect the user to the login page or home page, if necessary
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <h1>Sign Out Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOutPage;
