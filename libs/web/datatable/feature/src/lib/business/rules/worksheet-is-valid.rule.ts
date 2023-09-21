import { RuleResult, SimpleRule } from "@schema-driven/rules-engine";

export class WorksheetIsValidRule extends SimpleRule {
    target: any; // worksheet to be validated
    columns: Record<string, string>;  // expected worksheet format, for example { 'A': { field: 'Id', type: 'string' } , 'B': { field: 'Name', type: 'number' }  }

    constructor(name: string, message: string, target: any, columns: Record<string, string>, isDisplayable?: boolean) {
        super(name, message, isDisplayable)

        this.target = target
        this.columns = columns
    }

    render(): RuleResult {
        let hadNameColumn = false

        Object.keys(this.columns).map((colIndex) => {
            if(this.columns[colIndex]['field'].toLowerCase() == 'name') {
                hadNameColumn = true
            }
        });

        console.log({ hadNameColumn })

        this.isValid = hadNameColumn

        return new RuleResult(this, this.target)
    }
}
