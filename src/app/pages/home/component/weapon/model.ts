import { CoreElement, Robot } from "@src/app/constants/enum";

export interface Section {
    normal: number,
    maguna: number,
    ex: number
}

export interface PanelData {
    element: CoreElement,
    mainRobot: Robot,
    mainRobotValue: number,
    subRobot: Robot,
    subRobotValue: number,
    atk: Section,
    hp: Section,
    da: Section,
    ta: Section,
    enmity: Section,
    stamina: Section,
    critical: Section,
    criticalDamage: Section,
    ub: Section,
    ubLimit: Section,
    skillLimit: Section,
    skillDamage: Section,
    pureHp: number,
    pureAtk: number
}
