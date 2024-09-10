import { WeaponEntity } from "../types/weapon";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../utils/firebase/firebaseConfig";
import { getImage } from "../utils/services/getImage";

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
    const items: any = [];

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
            const item = docSnapshot.get(itemId);
            console.log(item);
            const selectedData = {
              id: parseInt(itemId, 10),
              image: await getImage(itemId),
            };

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
    // console.log(items)
    return items;
  }

  static async equip(creature: string, player_id: string, action: string, itemType: string, itemId: string): Promise<string>{
    const getType = (itemType: string): string => {
      const typeMap: { [key: string]: string } = {
        one_handed: "melee",
        two_handed: "melee",
        bow: "distance",
        crossbow: "distance",
        ring:"ring1"
      };
    
      return typeMap[itemType] || itemType;
    };
    const type = getType(itemType)

    const heroRef = doc(FIRESTORE_DB, `${creature}/${player_id}`);
    const heroDoc = await getDoc(heroRef);
    const currentData: any = heroDoc.data() || [];

    
    const equipped = { 
      ...currentData.equipped, 
      [type]: action === 'equip' ? itemId : null 
    };

    await updateDoc(heroRef, { equipped });

    console.log(currentData.equipped[type]);
    return currentData;
  }
}
