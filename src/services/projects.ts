import { auth, firestore } from "firebase/app";
import "firebase/firestore";
import { user } from "rxfire/auth";
import { collectionData } from "rxfire/firestore";
import { map, startWith, switchMap } from "rxjs/operators";
import app from "./firebase";

const db = firestore(app);
const root = db.collection("projects");

const projectCollection = user(auth()).pipe(
  map(({ uid }) => root.where("uid", "==", uid))
);

export const projects = projectCollection.pipe(
  startWith(root),
  switchMap((collection) =>
    collectionData(collection, "id").pipe(startWith([]))
  )
);
