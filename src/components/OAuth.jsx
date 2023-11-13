/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  signInFalure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      dispatch(signInStart());
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFalure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFalure(err.message));
      console.log("Could not sign in with google", err);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      Continue with google
    </button>
  );
}
