// src/types/character.ts

/**
 * Defines the structure for a single Honkai: Star Rail character object
 * as returned by the API route. This interface is a top-level representation
 * of all character data.
 */
export interface ICharacter {
    id: number;
    name: string | null;
    stars: number; // Rarity, from 4 to 5 stars
    path: string | null;
    combatType: string | null;
    maxEnergy: number | null;
    story: string | null;

    // Visual assets
    icon: string | null;
    sideIcon: string | null;
    miniIcon: string | null;
    teamActionIcon: string | null;
    teamWaitingIcon: string | null;
    shopItemIcon: string | null;
    splashImage: string | null;
    splashCutInFigureImage: string | null;
    splashCutInBackgroundImage: string | null;

    // Character abilities and progressions
    skills: ICharacterSkill[] | null;
    eidolons: ICharacterEidolon[] | null;
    skillTreeNodes: ICharacterSkillTreeNode[] | null;
}

/**
 * Represents a single skill or ability of a character.
 */
export interface ICharacterSkill {
    id: number;
    name: string | null;
    type: ISkillType | null;
    description?: string | null; // This field exists in some cases in the example JSON, but not in the code.
    icon: string | null;
}

/**
 * Defines the nested type and combat information for a skill.
 */
export interface ISkillType {
    combatType: ISkillCombatType | null;
    effectType: string | null;
}

/**
 * Defines the combat type details for a skill.
 */
export interface ISkillCombatType {
    id: number | null;
    name: string | null;
    description: string | null;
    bigIcon: string | null;
    icon: string | null;
    iconColor: number | null;
}

/**
 * Represents a single Eidolon for a character.
 */
export interface ICharacterEidolon {
    id: number;
    name: string | null;
    description: string | null;
    icon: string | null;
}

/**
 * Represents a single skill tree node (trace) for a character.
 */
export interface ICharacterSkillTreeNode {
    id: number;
    name: string | null;
    icon: string | null;
    isUnlockedByDefault: boolean | null;
}
