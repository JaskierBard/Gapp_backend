import { collection, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebaseConfig";

export const getAllItemsCategory = async (category: string) => {
  const conversationRef = doc(collection(FIRESTORE_DB, "items"), category);
  const data = await getDoc(conversationRef);
  return data.data();
};
