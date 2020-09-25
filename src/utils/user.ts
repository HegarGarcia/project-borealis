import type { User as FirebaseUser } from "firebase/app";

interface User {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
}

export function toUser(user: Partial<FirebaseUser>): User {
  return {
    uid: user.uid ?? "",
    name: user.displayName ?? "",
    email: user.email ?? "",
    photoUrl: user.photoURL ?? "",
  };
}
