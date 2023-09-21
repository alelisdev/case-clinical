import { RuleResult } from "./RuleResult";
import { SimpleRule } from "./SimpleRule";

export class IsNumber extends SimpleRule {
    target: any

    constructor(name: string, message: string, taret:any, isDisplayable?: boolean) {
        super(name, message, isDisplayable)

        this.target = taret
    }
    
    render(): RuleResult {
        this.isValid = (this.target !== '') && (!isNaN(Number(this.target)))
        return new RuleResult(this, this.target)
    }
}