import { RuleResult } from "./RuleResult";
import { SimpleRule } from "./SimpleRule";

export class ImportDuplicateRule extends SimpleRule {
  private target: string[];
  conflicts = []

  constructor(name: string, message: string, target: string[], isDisplayable?: boolean) {
    super(name, message, isDisplayable)
    this.target = target
  }

  render(): RuleResult {
    // { name1: 1, name2: 2, name3: 1, ... }
    const nameCount = {}
    this.target.map((name) => {
      if(nameCount[name]) {
        nameCount[name] += 1;
      } else {
        nameCount[name] = 1;
      }
    })
    for(const name in nameCount) {
      const count = nameCount[name];
      if(count > 1) this.conflicts.push(name)
    }
    if(Object.keys(this.conflicts).length > 0) this.isValid = false;
    else this.isValid = true;
    return new RuleResult(this, this.target)
  }
}
