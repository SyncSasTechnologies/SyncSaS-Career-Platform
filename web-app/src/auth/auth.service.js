import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { auth } from "./firebase"

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const logoutUser = () => {
  return signOut(auth)
}
