import type { Component } from "obsidian";
import type { Creature, HomebrewCreature } from "obsidian-overload";

export type ability =
	| "strength"
	| "dexterity"
	| "constitution"
	| "intelligence"
	| "wisdom"
	| "charisma";

export type str_mod =
    |"hit adj" // Hit point adjustment
    |"dam adj" // Damage adjustment
    |"weight allow" // Weight allowance
    |"max press" // Maximum press ability
    |"open doors" // Chance to open locked doors
    |"bend bars"; // Bend bars/lift gates

export type dex_mod =
    |"surprise adj" // Surprise adjustment
    |"missile att adj" // Missile attack adjustment
    |"def adj"; // Defensive adjustment
    
export type con_mod =
    |"hp adj" // Hit point adjustment
    |"sys shock" // System shock
    |"res survival" // Resurection survival
    |"poison save" // Poison save
    |"regen"; // Regeneration rate

export type int_mod =
    |"add prof" // Additional proficiency points
    |"spell lvl" // Spell level
    |"learn spell" // Chance to learn spell
    |"max # spells" // Maximum number of memorized spells
    |"spell immun"; // Spell immunities

export type wis_mod =
    |"mag def adj" // Magical defense adjustment
    |"bonus spells" // Bonus spells
    |"spell failure" // Chance of spell failure
    |"spell immun"; // Spell immunities

export type cha_mod =
    |"max hench" // Maxiumum number of henchmen
    |"loyalty base" // Loyalty base
    |"reac adj"; // Reaction adjustment

export type saving_throw =
	| "ppdm" // Paralization, Poison, or Death Magic
	| "rsw" // Rod, Staff, or Wand
	| "pp" // Petrification or Polymorph *
	| "brw" // Breath Weapon **
	| "spell"; // Spell ***

/*
  *Excluding polymorph wand attacks
  **Excluding those that cause petrification or polymorph
  ***Excluding those fro which another saving throw is specified, such as death, petrification,
  polymorph, etc.
*/

export interface Monster {
    image?: string;
    name: string;
    climate_terrain: string;
    frequency: string;
    activity_cycle: string;
    diet: string;
    intelligence: string;
    treasure: string;
    alignment: string;
    no_appearing: string;
    ac: number;
    hp: number;
    movement: string;
    hit_dice: string;
    thac0: number;
    no_of_attacks: number;
    damage_attack: string;
    special_attacks: string;
    special_defenses: string;
    magic_resistance: string;
    size: string;
    morale: string;
    xp_value: number;
    description: string;
    combat: string;
    habbitat_society: string;
    ecology: string;
}

export interface PlayerCharacter {
    image?: string;
    name: string;
    class_kit: string;
    level: number;
    race: string;
    alignment: string;
    diety_religion: string;
    origin: string;
    abilities:{
        strength: number;
        str_mods: { [K in str_mod]?: number } | { [K in str_mod]?: number }[];
        dexterity: number;
        dex_mods: { [K in dex_mod]?: number } | { [K in dex_mod]?: number }[];
        constitution: number;
        con_mods:{ [K in con_mod]?: number } | { [K in con_mod]?: number }[];
        intelligence: number;
        int_mods: { [K in ability]?: int_mod } | { [K in int_mod]?: number }[];
        wisdom: number;
        wis_mods: { [K in wis_mod]?: number } | { [K in wis_mod]?: number }[];
        charisma: number;
        cha_mods: { [K in cha_mod]?: number } | { [K in cha_mod]?: number }[];
    };
    combat:{
        armor_class: number;
        hp: number;
        thac0: number;
    };
    saving_throws:{
        ppdm: number;
        rsw: number;
        pp: number;
        brw: number;
        spell: number;
    };
}

export interface Npc {}
