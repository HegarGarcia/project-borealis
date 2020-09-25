import { auth } from "firebase/app";
import "firebase/auth";
import { readable } from "svelte/store";
import { toUser } from "../utils/user";

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RecoverCredentials {
  email: string;
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const GoogleProvider = new auth.GoogleAuthProvider();

const initialUser = toUser({
  uid: localStorage.getItem("user"),
});

export const user = readable(initialUser, (set) => {
  auth().onAuthStateChanged((credentials) => {
    if (credentials) {
      localStorage.setItem("user", credentials.uid);
    } else {
      localStorage.removeItem("user");
    }

    set(toUser(credentials ?? {}));
  });
});

export function signOut() {
  return auth().signOut();
}

export async function signInEmailAndPassword({
  email,
  password,
}: SignInCredentials) {
  return void (await auth().signInWithEmailAndPassword(email, password));
}

export async function signInWithGoogle() {
  return void (await auth().signInWithPopup(GoogleProvider));
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  confirmPassword,
}: SignUpCredentials) {
  if (password !== confirmPassword) {
    throw new AuthError("Passwords do not match");
  }

  return void (await auth().createUserWithEmailAndPassword(email, password));
}

export async function recoverPassword({ email }: RecoverCredentials) {
  await auth().sendPasswordResetEmail(email);
}
