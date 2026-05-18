import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(user);

  // Register User
  const registerUser = (email, password) => {
    setLoading(true);
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setLoading(false);
    }
  };

  // Login User
  const loginUser = (email, password) => {
    setLoading(true);
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoading(false);
    }
  };

  // Logout User
  const logOutUser = () => {
    return signOut(auth);
  };

  // Update User
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Google login
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Managing User
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authData = {
    user,
    loading,
    loginUser,
    logOutUser,
    registerUser,
    loginWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
