// src/types/character.ts

// Base interface for all characters
export interface ICharacter {
    id: string;
    basicInfo: ICharacterBasicInfo;
    baseStats: ICharacterStats;
    skills: ICharacterSkill[]; // Includes Basic Attack, Skill, Ultimate, Talent, Technique
    traces: ICharacterTrace[];
    eidolons: ICharacterEidolon[];
    buildRecommendation: ICharacterBuildRecommendation;
}

// Basic information about the character
export interface ICharacterBasicInfo {
    name: string;
    slug: string; // Added slug
    rarity:  "5 Star" | "4 Star"; // Enforce specific values
    path: "Destruction" | "Hunt" | "Harmony" | "Nihility" | "Preservation" | "Abundance" | "Erudition"; // Enforce specific values
    element: "Physical" | "Fire" | "Ice" | "Lightning" | "Wind" | "Quantum" | "Imaginary"; // Enforce specific values
    gender: string;
    affiliation: string;
    releaseDate: string; // ISO 8601 string, e.g., "YYYY-MM-DD"
    description: string;
    imagePortraitUrl: string;
    imageFullBodyUrl: string;
}

// Base stats of the character at max level (e.g., Level 80)
export interface ICharacterStats {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    critRate: number; // e.g., 0.05 for 5%
    critDamage: number; // e.g., 0.50 for 50%
    breakEffect: number;
    energyRegenerationRate: number;
    effectHitRate: number;
    effectRes: number;
    healingBoost: number;
    elementalDamageBoost: { [key: string]: number }; // e.g., { "Quantum": 0.18, "Imaginary": 0.0 }
}

// Represents a character's skill (Basic Attack, Skill, Ultimate, Talent, Technique)
export interface ICharacterSkill {
    id?: number; // Optional for new creations, present for existing
    type: "Basic Attack" | "Skill" | "Ultimate" | "Talent" | "Technique";
    name: string;
    description: string;
    iconUrl: string;
    scaling: string[]; // e.g., ["ATK: 50%", "Heal: 10% of Max HP + 100"]
}

// Represents a character's trace
export interface ICharacterTrace {
    id?: number; // Optional for new creations, present for existing
    name: string;
    description: string;
    iconUrl: string;
    statBoost: string; // e.g., "ATK + 10%", "Effect RES + 4%"
}

// Represents a character's eidolon
export interface ICharacterEidolon {
    id?: number; // Optional for new creations, present for existing
    level: number; // 1 to 6
    name: string;
    description: string;
    iconUrl: string;
}

// Recommended build for the character
export interface ICharacterBuildRecommendation {
    recommendedLightCones: string[]; // List of Light Cone IDs/Names
    recommendedRelicSets: string[]; // List of Relic Set IDs/Names (e.g., "Musketeer of Wild Wheat (4)", "Genius of Brilliant Stars (2)")
    recommendedPlanarOrnaments: string[]; // List of Planar Ornament IDs/Names (e.g., "Space Sealing Station (2)")
    mainStatsPriority: { [slot: string]: string[] }; // e.g., { "Body": ["Crit Rate", "Crit Damage"], "Feet": ["Speed", "ATK%"] }
    subStatsPriority: string[]; // e.g., ["Crit Rate", "Crit Damage", "Speed", "ATK%"]
    synergisticCharacters: string[]; // List of character IDs/Names
    antiSynergisticCharacters: string[]; // List of character IDs/Names
    buildNotes: string;
    ascensionMaterials: string[]; // New
    traceMaterials: string[]; // New
}

// DTO for creating/updating a character (matches Spring Boot CharacterDto)
export interface ICharacterDto {
    id?: number; // Optional for creation
    basicInfo: ICharacterBasicInfo;
    baseStats: ICharacterStats;
    skills: ICharacterSkill[];
    traces: ICharacterTrace[];
    eidolons: ICharacterEidolon[];
    buildRecommendation: ICharacterBuildRecommendation;
}
