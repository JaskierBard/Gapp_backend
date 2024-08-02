import { FIREBASE_STORAGE } from "../firebase/firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const getImages = async (folder: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}`);
    const result = await listAll(storageRef);

    const imageUrls: Record<string, string> = {};

    await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        imageUrls[itemRef.name] = url;
      })
    );

    return imageUrls;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return {};
  }
};
