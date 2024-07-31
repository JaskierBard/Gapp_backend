import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_STORAGE, FIRESTORE_DB } from "./firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

export interface NPC {}

export const getOpression = async (
  heroID: string,
  NpcName: string,
  discourse: string
) => {
  const heroRef = doc(FIRESTORE_DB, `hero/${heroID}`);
  const heroDoc = await getDoc(heroRef);
  const currentData = heroDoc.data()?.oppression || [];
  // console.log(currentData[NpcName]);
  return currentData[NpcName];
};

export const addOpression = async (
  heroID: string,
  NpcName: string,
  discourse: string
) => {
  const heroRef = doc(FIRESTORE_DB, `hero/${heroID}`);
  const heroDoc = await getDoc(heroRef);

  if (heroDoc.exists()) {
    const currentData = heroDoc.data()?.oppression || [];
    // console.log(currentData[NpcName]);
    if (currentData[NpcName] === undefined) {
      await updateDoc(heroRef, {
        oppression: {
          ...currentData,
          [NpcName]: {
            [discourse]: 1,
          },
        },
      });
    } else if (currentData[NpcName][discourse] === undefined) {
      const updatedMissions = {
        ...currentData,
        [NpcName]: {
          ...currentData[NpcName],
          [discourse]: 1,
        },
      };
      await updateDoc(heroRef, {
        oppression: updatedMissions,
      });
    } else {
      currentData[NpcName][discourse]++;
      const updatedMissions = {
        ...currentData,
        [NpcName]: {
          ...currentData[NpcName],
          [discourse]: currentData[NpcName][discourse],
        },
      };
      await updateDoc(heroRef, {
        oppression: updatedMissions,
      });
    }
  } else {
    console.log(`Dokument o ID ${heroID} nie istnieje.`);
  }
  return heroDoc.id;
};

export const getNpcList = async (): Promise<string[]> => {
  const todoRef = collection(FIRESTORE_DB, "npc");
  const snapshot = await getDocs(todoRef);
  const documentIds: string[] = [];
  snapshot.forEach((doc) => {
    documentIds.push(doc.id);
  });
  return documentIds;
};

export const getNpc = async (id: string) => {
  const heroRef = doc(FIRESTORE_DB, `npc/${id}`);
  const heroDoc = await getDoc(heroRef);
  const currentData = heroDoc.data() || [];
  console.log((currentData));
  return currentData;
};

export const addManyDev = async (title: string) => {
  await setDoc(doc(collection(FIRESTORE_DB, "npc"), title), {
    nazwa: title,
    miejsce: "",
    ekwipunek: "",
    charakter: "",
    nastawienie: "",
    opis: "",
    poziom: "",
    rola: "",
    flaga: "",
  });
  console.log(title);
};

export const getImage = async (folder: string, imageName: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}/${imageName}`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
};

export const getAudio = async (folder: string, audioName: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}/${audioName}`);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
};
