import { getDownloadURL, listAll, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "./firebaseConfig";
const locations = ['bengars_farm','down_town','sekobs_farm','lobarts_farm','port_district','xardas_tower']

export const getLocationImages = async (folder: string) => {
  try {
    const imageUrls: string[] = [];
    const storageRef = ref(FIREBASE_STORAGE, `${folder}`);
    const result = await listAll(storageRef);
    await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        console.log(itemRef.fullPath);
        // if (itemRef.fullPath.includes('lobarts_farm')) {
            imageUrls.push(url);

        // }
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
};
