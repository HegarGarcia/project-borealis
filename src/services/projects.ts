import { firestore } from "firebase/app";
import "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { startWith } from "rxjs/operators";
import type Project from "../typings/Project";
import app from "./firebase";

const db = firestore(app);
const root = db.collection("projects");

export function getProjectsFor(uid: string) {
  const query = root.where("uid", "==", uid);
  return collectionData<Project>(query, "id").pipe(startWith<Project[]>([]));
}

export function getProject(id: string) {
  return docData<Project>(root.doc(id), "id");
}
