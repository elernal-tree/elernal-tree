export interface Core {
    id:   number;
    data: CoreData;
}

export interface CoreData {
    canUseSpItem:  number;
    coreAddAtk:    number;
    coreAddHp:     number;
    coreCanDepose: number;
    coreCanSell:   number;
    coreElement:   number;
    coreMaxLevel:  number;
    coreMaxSklv:   number;
    coreMaxstage:  number;
    coreMinAtk:    number;
    coreMinHp:     number;
    coreRarity:    number;
    coreSeries:    number;
    coreStage?:    CoreStage[];
    id:            number;
    skillCoreCost: SkillCoreCost;
    skillGoldCost: number[];
    name:          string;
    cnDescription: string[];
    cnData:        string[];
    prefix:        string[];
    coreBounsAtk:  number[];
    coreBounsHp:   number[];
}

export interface CoreStage {
    coreDeposeItem:      CoreDeposeItem[];
    coreSellPrice:       number;
    coreStageLevelLimit: number;
    overStageCore?:      CoreDeposeItem[];
    overStageGold?:      number;
    skillSlot1:          number;
    skill1:              Skill;
    coreStage?:          number;
    skillSlot2?:         number;
    skill2?:             Skill;
}

export interface CoreDeposeItem {
    count:  number;
    itemId: number;
}

export interface Skill {
    centerIcon?:      number;
    id:               number;
    levelIcon:        number;
    paSkillFuncition: PaSkillFuncition[];
    paramIcon:        number;
    seriesIcon:       number;
    name:             string;
    cnDescription:    string;
}

export interface PaSkillFuncition {
    element?:  number;
    paLevel:   number;
    paramType: number;
    section:   number;
    paValue:   number[];
}

export interface SkillCoreCost {
    coreId: number;
    count:  number;
}
