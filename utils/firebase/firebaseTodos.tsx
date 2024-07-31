import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig";



export const addItem = async (title: string, expires: Date | null) => {
    const docRef = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: title,
      status: "undone",
    });
    return docRef.id;
  };

  export const deleteItem = async (id: string) => {
    const ref = doc(FIRESTORE_DB, `todos/${id}`);
    deleteDoc(ref);
  };

  export const editItem = async (id: string, title: string) => {
    const ref = doc(FIRESTORE_DB, `todos/${id}`);
    await updateDoc(ref, {
      title: title,
      status: "undone",
    });
  };