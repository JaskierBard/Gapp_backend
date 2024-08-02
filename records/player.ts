import { PlayerEntity } from "../types/player";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../utils/firebase/firebaseConfig";

// type PlayerRecordResults = [PlayerRecords[], FieldPacket[]];

export class PlayerRecords implements PlayerEntity {
  player_id: string;
  name: string;
  color: string;
  position: number;
  level: number;
  magic_circle: number;
  experience: number;
  learning_points: string;
  strength: string;
  dexterity: string;
  mana: number;
  max_mana: number;
  hitpoints: number;
  max_hitpoints: number;
  one_handed: string;
  two_handed: string;
  bow: number;
  crossbow: number;
  sneak: number;
  pick_locks: string;
  pickpocket: string;
  create_runes: string;
  alchemy: number;
  forge_weapons: number;
  take_trophies: number;

  constructor(obj: PlayerEntity) {
    this.player_id = obj.player_id;
    this.name = obj.name;
    this.color = obj.color;
    this.position = obj.position;
    this.level = obj.level;
    this.magic_circle = obj.magic_circle;
    this.experience = obj.experience;
    this.learning_points = obj.learning_points;
    this.strength = obj.strength;
    this.dexterity = obj.dexterity;
    this.mana = obj.mana;
    this.max_mana = obj.max_mana;
    this.hitpoints = obj.hitpoints;
    this.max_hitpoints = obj.max_hitpoints;
    this.alchemy = obj.alchemy;
    this.one_handed = obj.one_handed;
    this.two_handed = obj.two_handed;
    this.bow = obj.bow;
    this.crossbow = obj.crossbow;
    this.sneak = obj.sneak;
    this.pick_locks = obj.pick_locks;
    this.pickpocket = obj.pickpocket;
    this.create_runes = obj.create_runes;
    this.alchemy = obj.alchemy;
    this.forge_weapons = obj.forge_weapons;
    this.take_trophies = obj.take_trophies;
  }

  static async addHero(player_id: string) {
    await setDoc(doc(collection(FIRESTORE_DB, "hero"), player_id), {
      destination: {},
      missions: {},
      equipment: {},
      parameters: {
        healthPoints: 55,
        manaPoints: 10,
        maxHealthPoints: 122,
        maxManaPoints: 10,
        maxStaminaPoints: 10,
        staminaPoints: 100,
      },
    });
  }

  static async getStatistics(player_id: string) {
    const heroRef = doc(FIRESTORE_DB, `hero/${player_id}`);
    const heroDoc = await getDoc(heroRef);
    const currentData: any = heroDoc.data() || [];
    return currentData;
  }
}
