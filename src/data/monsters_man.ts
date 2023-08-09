import type { Monster } from "types";

export const MONSTER: Monster[] = [
    {
        name: "",
        climate_terrain: "",
        frequency: "",
        activity_cycle: "",
        diet: "",
        intelligence: "",
        treasure: "",
        alignment: "",
        no_appearing: "",
        ac: 0,
        hp: 0,
        movement: "",
        hit_dice: "",
        thac0: 0,
        no_of_attacks: 0,
        damage_attack: "",
        special_attacks: "",
        special_defenses: "",
        magic_resistance: "",
        size: "",
        morale: "",
        xp_value: 0,
        description: "",
        combat: "",
        habbitat_society: "",
        ecology: "",
    },
];

/* Monster template
{
        name: "",
        climate_terrain: "",
        frequency: "",
        activity_cycle: "",
        diet: "",
        intelligence: "",
        treasure: "",
        alignment: "",
        no_appearing: "",
        ac: 0,
        hp: 0,
        movement: "",
        hit_dice: "",
        thac0: 0,
        no_of_attacks: 0,
        damage_attack: "",
        special_attacks: "",
        special_defenses: "",
        magic_resistance: "",
        size: "",
        morale: "",
        xp_value: 0,
        description: "",
        combat: "",
        habbitat_society: "",
        ecology: "",
    },
*/

/* export const MONSTER_BY_NAME = Object.fromEntries(
    BESTIARY.map((monster) => [monster.name, monster])
); */

export function getMonsterByName (disableSRD: boolean) {
    return !disableSRD ? MONSTER_BY_NAME : new Map();
}

const MONSTER_BY_NAME: Map<string, Monster> = new Map(
    MONSTER.map((monster) => {
        /*         const statblock: StatblockMonster = Object.assign({}, monster, {
            traits: new Map(),
            actions: new Map(),
            reactions: new Map(),
            legendary_actions: new Map()
        });
        statblock.traits = traitMapFrom(monster.traits);
        statblock.actions = traitMapFrom(monster.actions);
        statblock.reactions = traitMapFrom(monster.reactions);
        statblock.legendary_actions = traitMapFrom(monster.legendary_actions); */

        return [monster.name, monster];
    })
);
