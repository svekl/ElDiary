import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// функция добавления нового поста в коллекцию
export const addPost = async (data) => {
  const result = addDoc(collection(db, "posts"), data);
  console.log(result);
};

export const getAllPosts = async () => {
  const response = await getDocs(collection(db, "posts"));
  console.log(response);
  const arr = response.docs.map((e) => e.data());
  return arr;
};
