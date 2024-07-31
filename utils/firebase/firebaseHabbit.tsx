import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig";

export const editHabbitProgress = async (
    id: string,
    today: string,
    targetOrnewValue: number
  ) => {
    const ref = doc(FIRESTORE_DB, `habbits/${id}`);
    const heroDoc = await getDoc(ref);
    if (heroDoc.exists()) {
      const currentDates = heroDoc.data()?.dates || [];
      currentDates[today] = targetOrnewValue;
      await updateDoc(ref, {
        dates: currentDates,
      });
    }
  };