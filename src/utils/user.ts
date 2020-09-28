import type { User as FirebaseUser } from "firebase/app";
import type User from "../typings/User";

export function toUser(user: Partial<FirebaseUser>): User {
  return {
    uid: user.uid ?? "",
    name: user.displayName ?? "",
    email: user.email ?? "",
    photoUrl: user.photoURL ?? "/assets/images/profile.png",
  };
}
