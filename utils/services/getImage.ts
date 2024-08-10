import { FIREBASE_STORAGE } from "../firebase/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

export const getImage = async (name: string) => {
  try {
    const fileRef = ref(FIREBASE_STORAGE, `items/${name}.png`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Błąd podczas pobierania url:", error);
    return null;
  }
};
