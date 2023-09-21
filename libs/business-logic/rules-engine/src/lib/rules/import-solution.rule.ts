import { RuleResult } from "./RuleResult";
import { SimpleRule } from "./SimpleRule";

export class ImportSolutionRule extends SimpleRule {
  columnName: string;  // gender.name|language.name|ethnicity.name| ...
  private target: Record<string, any>; // { name: "Male" }|{ name: 'English }|{ name: "Christian" }|  ...
  possibleValueList: any[];  // Possible value list supported by system  [ { id: 1, name: "Male" },{ id: 2, name: "Female" }]|[ { id: 1, name: "English" },{ id: 2, name: "Spanish" }]

  newName: string;

  constructor(name: string, message: string, columnName: string, target: Record<string, any>, possibleValueList: any[], isDisplayable?: boolean) {
    super(name, message, isDisplayable)
    this.target = target
    this.possibleValueList = possibleValueList
    this.columnName = columnName;
  }

  render(): RuleResult {
    if(this.target === null || this.target === undefined) {
      this.isValid = true;
    } else {
      const matchedItem = this.possibleValueList.find((el) => el.name.trim() === this.target['name'].trim());
      if (matchedItem) {
        delete this.target['error'];
        delete this.target['errorDetail'];
        this.target['id'] = matchedItem.id;
      } else {
        console.log(this.target['name'], this.possibleValueList);
        this.isValid = false;

        this.newName = this.target['name'];

        this.target['error'] = true;
        this.target['errorDetail'] = 'Cannot find this name';
      }
    }
    return new RuleResult(this, this.target)
  }
}
