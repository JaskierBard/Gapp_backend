export interface WeaponEntity {
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
}