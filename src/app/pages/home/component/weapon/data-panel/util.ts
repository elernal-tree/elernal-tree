import { Limit } from "@src/app/constants/constants";
import { AtkType } from "@src/app/constants/enum";

export function atkLimit(damage: number, type: AtkType) {
    if (type === AtkType.sa) {
        return damage >= Limit.saDamage ? Limit.saDamage : damage
    }
    if (type === AtkType.da) {
        return damage >= Limit.daDamage ? Limit.daDamage : damage
    }
    if (type === AtkType.ta) {
        return damage >= Limit.taDamage ? Limit.taDamage : damage
    }
    return damage;
}
