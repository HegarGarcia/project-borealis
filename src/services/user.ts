import { auth } from "firebase/app";
import "firebase/auth";
import { readable } from "svelte/store";
import { toUser } from "../utils/user";
import app from "./firebase";

const initialUser = toUser({
  uid: localStorage.getItem("user"),
});

export default readable(initialUser, (set) => {
  auth(app).onAuthStateChanged((credentials) => {
    if (credentials) {
      localStorage.setItem("user", credentials.uid);
    } else {
      localStorage.removeItem("user");
    }

    set(toUser(credentials ?? {}));
  });
});
