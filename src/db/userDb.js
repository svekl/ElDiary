import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

export const addUserDb = async (user) => {
  setDoc(doc(db, "users", user.id), user);
};
