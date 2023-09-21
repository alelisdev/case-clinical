import { RuleResult, SimpleRule } from "@schema-driven/rules-engine";

export class CellIdIsValidRule extends SimpleRule {

    target: string

    constructor(name: string, message: string, target: string, isDisplayable?: boolean) {
        super(name, message, isDisplayable)

        this.target = target 
    }

    render(): RuleResult {
        this.isValid = (this.target === '') || (isNaN(Number(this.target)))
        return new RuleResult(this, this.target)
    }
}