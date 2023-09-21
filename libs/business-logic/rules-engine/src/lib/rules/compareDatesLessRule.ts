import { RuleResult } from './RuleResult';
import { SimpleRule } from './SimpleRule';
import * as moment from 'moment';

export class CompareDatesLessRule extends SimpleRule {
    /**
     *  This represents the file name
     */
    target: string;
    comparison: string;
    constructor(name: string, message: string, target: string, comparison: string, isDisplayable = true) {
        super(name, message, isDisplayable);

        this.target = target;
        this.comparison = comparison;
    }

    override render(): RuleResult {
        if(this.target && this.comparison){
            if(moment(this.target).isBefore(moment(this.comparison))){
                this.isValid = true;
            }else this.isValid = false;
        }else this.isValid = true;

        return new RuleResult(this, this.target);
    }
}
