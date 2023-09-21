import { RuleResult } from "./RuleResult";
import { SimpleRule } from "./SimpleRule";

export class ImportRowHasRequiredFields extends SimpleRule {
  target: Record<string, any> // Excel import record read from file
  requiredFeilds: string[]    // Required fields that should contain in the above import record

  constructor(name: string, message: string, target: Record<string, any>, requiredFields: string[], isDisplayable?: boolean) {
    super(name, message, isDisplayable)
    this.target = target;
    this.requiredFeilds = requiredFields;
  }

  render(): RuleResult {
    for(let i = 0; i < this.requiredFeilds.length; i++) {
      const field = this.requiredFeilds[i];
      if(!this.target[field]) {
        this.isValid = false;
        break;
      }
    }
    return new RuleResult(this, this.target)
  }
}
