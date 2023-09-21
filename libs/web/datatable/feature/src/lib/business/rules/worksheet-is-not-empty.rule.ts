import { RuleResult, SimpleRule } from "@schema-driven/rules-engine";
import { isString } from "lodash";

export class WorksheetIsNotEmptyRule extends SimpleRule {
    target: any[]; // worksheet to be validated

    constructor(name: string, message: string, target: any[], isDisplayable?: boolean) {
        super(name, message, isDisplayable)

        this.target = target
    }

    render(): RuleResult {

        this.isValid = this.target?.length > 0;

        return new RuleResult(this, this.target)
    }
}
