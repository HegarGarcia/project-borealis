import { auth } from "firebase/app";
import "firebase/auth";
import app from "./firebase";

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

export function signOut() {
  return auth(app).signOut();
}

export async function signInEmailAndPassword({
  email,
  password,
}: SignInCredentials) {
  return void (await auth(app).signInWithEmailAndPassword(email, password));
}

export async function signInWithGoogle() {
  return void (await auth(app).signInWithPopup(GoogleProvider));
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  confirmPassword,
}: SignUpCredentials) {
  if (password !== confirmPassword) {
    throw new AuthError("Passwords do not match");
  }

  return void (await auth(app).createUserWithEmailAndPassword(email, password));
}

export async function recoverPassword({ email }: RecoverCredentials) {
  await auth(app).sendPasswordResetEmail(email);
}
