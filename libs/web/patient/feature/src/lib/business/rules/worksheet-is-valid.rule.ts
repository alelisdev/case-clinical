
import { RuleResult, SimpleRule } from "@schema-driven/rules-engine";

export class WorksheetIsValidRule extends SimpleRule {
  target: any; // worksheet to be validated
  columns: Record<string, string>;  // expected worksheet format, for example { 'A': 'Id', 'B': 'Name' }

  constructor(name: string, message: string, target: any, columns: Record<string, string>, isDisplayable?: boolean) {
    super(name, message, isDisplayable)

    this.target = target
    this.columns = columns
  }

  render(): RuleResult {
    // Check whether the excel file is the same as ours in format
    let mismatchColumns = 0;
    Object.keys(this.columns).map((colIndex) => {
      if ((this.target[`${colIndex}1`]?.w || "") != this.columns[colIndex])
        mismatchColumns += 1;
    });
    // Allow 6 mismatch
    this.isValid = mismatchColumns < 6;

    return new RuleResult(this, this.target)
  }
}
