import { RuleResult, SimpleRule } from "@schema-driven/rules-engine";
import { isString } from "lodash";

export class WorksheetDataIsValidRule extends SimpleRule {
    target: any[]; // worksheet to be validated
    requiredField = 'name'

    constructor(name: string, message: string, target: any[], isDisplayable?: boolean) {
        super(name, message, isDisplayable)

        this.target = target
    }

    render(): RuleResult {
        let nameIsMissing = false;

        this.target.map((data) => {
          const requiredValue = data[this.requiredField];
          if(requiredValue === undefined || requiredValue === null || (isString(requiredValue) && requiredValue.trim().length === 0)) {
            nameIsMissing = true;
          }
        })

        this.isValid = !nameIsMissing

        return new RuleResult(this, this.target)
    }
}
