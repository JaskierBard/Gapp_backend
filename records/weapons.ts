import { WeaponEntity } from "../types/weapon";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../utils/firebase/firebaseConfig";
import { getImages } from "../utils/services/getImages";

export class WeaponRecords implements WeaponEntity {
  id: number;
  name: string;
  type: string;
  attributes: {
    strength: number;
    dexterity: number;
  };
  damage: {
    hit: number;
    cut: number;
    stab: number;
    arrow: number;
  };
  price: number;
  stack: boolean;

  constructor(obj: WeaponEntity) {
    this.id = obj.id;
    this.name = obj.name;
    this.type = obj.type;
    this.attributes = obj.attributes;
    this.damage = obj.damage;
    this.price = obj.price;
    this.stack = obj.stack;
  }

  static async getEqItems(itemsRequest: any) {
    const items: WeaponEntity[] = [];

    const images = await getImages("weapons");

    for (const category in itemsRequest) {
      const categoryItems = itemsRequest[category];
      const itemPromises = Object.entries(categoryItems).map(
        async ([itemId, value]) => {
          try {
            const conversationRef = doc(
              collection(FIRESTORE_DB, "items"),
              category
            );
            const docSnapshot = await getDoc(conversationRef);
            const item: WeaponEntity = docSnapshot.get(itemId);

            const selectedData = Object.entries(images)
              .filter(([key]) => key.includes(itemId))
              .map(([key, value]) => ({
                id: parseInt(key.slice(0, 3), 10),
                image: value,
              }))[0];

            const updatedItem = {
              ...item,
              quantity: value,
              ...selectedData,
            };

            if (updatedItem) {
              items.push(updatedItem);
            } else {
              console.log("error przy pobierniu itemu");
            }
          } catch (error) {
            console.error("Error getting document:", error);
          }
        }
      );

      await Promise.all(itemPromises);
    }
    return items;
  }
}
