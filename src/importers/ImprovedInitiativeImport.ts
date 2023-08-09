import type { Monster } from "types";
const SAVES: Record<
    string,
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma"
> = {
    STR: "strength",
    DEX: "dexterity",
    CON: "constitution",
    INT: "intelligence",
    WIS: "wisdom",
    CHA: "charisma"
};

export async function buildMonsterFromImprovedInitiativeFile(
    file: File
): Promise<Monster[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const monsterMap: Monster[] = [];
        reader.onload = async (event: any) => {
            try {
                let json = JSON.parse(event.target.result);
                const monsters = Object.keys(json).filter((key) =>
                    /^Creatures\./.test(key)
                );
                for (let key of monsters) {
                    try {
                        const monster = json[key];
                        const importedMonster: Monster = {
                            name: monster.Name,
                            source: monster.Source?.trim().length
                                ? monster.Source?.trim()
                                : "Unknown",
                            type: monster.Type?.split(/,\s?/)?.[0]?.trim(),
                            subtype: "",
                            size: "",
                            alignment: monster.Type?.split(/,\s?/)?.[1]?.trim(),
                            hp: monster.HP?.Value,
                            hit_dice: monster.HP?.Notes?.replace(
                                /([()])/g,
                                ""
                            )?.trim(),
                            ac: monster.AC.Value,
                            speed: monster.Speed?.join(", ")?.trim(),
                            stats: Object.values(monster.Abilities ?? {}) as [
                                number,
                                number,
                                number,
                                number,
                                number,
                                number
                            ],
                            damage_immunities:
                                monster.DamageImmunities?.join("; ")
                                    ?.toLowerCase()
                                    ?.trim() ?? "",
                            damage_resistances:
                                monster.DamageResistances?.join(", ")
                                    ?.toLowerCase()
                                    ?.trim() ?? "",
                            damage_vulnerabilities:
                                monster.DamageVulnerabilities?.join(", ")
                                    ?.toLowerCase()
                                    ?.trim() ?? "",
                            condition_immunities:
                                monster.ConditionImmunities?.join(", ")
                                    ?.toLowerCase()
                                    ?.trim() ?? "",
                            saves:
                                monster.Saves?.map(
                                    ({
                                        Name,
                                        Modifier
                                    }: {
                                        Name: string;
                                        Modifier: number;
                                    }) => {
                                        return {
                                            [SAVES[Name]]: Modifier
                                        };
                                    }
                                ) ?? [],
                            skillsaves:
                                monster.Skills?.map(
                                    ({
                                        Name,
                                        Modifier
                                    }: {
                                        Name: string;
                                        Modifier: number;
                                    }) => {
                                        return {
                                            [Name]: Modifier
                                        };
                                    }
                                ) ?? [],
                            senses: monster.Senses?.join(", ")?.trim() ?? "",
                            languages:
                                monster.Languages?.join(", ")?.trim() ?? "",
                            cr: monster.Challenge?.trim() ?? "",
                            traits:
                                monster.Traits?.map(
                                    (trait: {
                                        Name: string;
                                        Content: string;
                                    }) => {
                                        return {
                                            name: trait.Name,
                                            desc: trait.Content
                                        };
                                    }
                                ) ?? [],
                            actions:
                                monster.Actions?.map(
                                    (trait: {
                                        Name: string;
                                        Content: string;
                                    }) => {
                                        return {
                                            name: trait.Name,
                                            desc: trait.Content
                                        };
                                    }
                                ) ?? [],
                            bonus_actions:
                                monster.BonusActions?.map(
                                (trait: {
                                    Name: string;
                                    Content: string;
                                }) => {
                                    return {
                                        name: trait.Name,
                                        desc: trait.Content
                                    };
                                }
                            ) ?? [],
                            reactions:
                                monster.Reactions?.map(
                                    (trait: {
                                        Name: string;
                                        Content: string;
                                    }) => {
                                        return {
                                            name: trait.Name,
                                            desc: trait.Content
                                        };
                                    }
                                ) ?? [],
                            legendary_actions:
                                monster.LegendaryActions?.map(
                                    (trait: {
                                        Name: string;
                                        Content: string;
                                    }) => {
                                        return {
                                            name: trait.Name,
                                            desc: trait.Content
                                        };
                                    }
                                ) ?? [],
                            image: null
                        };
                        monsterMap.push(importedMonster);
                    } catch (e) {
                        continue;
                    }
                }
                resolve(monsterMap);
            } catch (e) {
                reject();
            }
        };

        reader.readAsText(file);
    });
}
