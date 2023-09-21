import { RuleResult } from './RuleResult';
import { SimpleRule } from './SimpleRule';

const allowedExtesions = [
    'xlsx', 'csv',
]

export class IsExcelFile extends SimpleRule {
    /**
     *  This represents the file name
     */
    target: string;

    constructor(name: string, message: string, target: string, isDisplayable = true) {
        super(name, message, isDisplayable);

        this.target = target;
    }

    override render(): RuleResult {
        if(this.target.length == 0) {
            this.isValid = false;
        } else {
            const dotIndex = this.target.lastIndexOf('.');
            if(dotIndex == -1)
                this.isValid = false;
            else {
                const extension = this.target.substring(dotIndex+1).toLowerCase();
                this.isValid = allowedExtesions.includes(extension);
            }
        }
        return new RuleResult(this, this.target);
    }
}
