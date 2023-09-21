
import { of } from 'rxjs'
import { BodyPartLeadBusinessActionBase } from './body-part-lead.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Lead, BodyPart } from '@case-clinical/shared/util/sdk'
export class ValidateBodyPartLeadExcelDataAction extends BodyPartLeadBusinessActionBase<boolean> {

   excelData: any[];
   leads: Lead[]
bodyParts: BodyPart[]

  valid = false;

  constructor(excelData: any[], leads: Lead[], bodyParts: BodyPart[]) {
    super('ValidateBodyPartLeadExcelDataAction')

    this.excelData = excelData;
this.leads = leads
this.bodyParts = bodyParts
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`bodyPartName_${index}_is_valid}`, "Body Part Is Not Valid", 'bodyPart.name', datum['bodyPart'], this.bodyParts, true)
            )
    })

    // Check Duplicate Error
    this.validationContext.addRule(
      new ImportDuplicateRule('nameIsUnique', 'Name should be unique', names, true)
    )
  }

  performAction() {

  }

  finish(): void {
    super.finish();

    const unknownNamesByColumn: Record<string, Record<string, any>> = {}
    let conflictNames = []

    if(this.validationContext.hasRuleViolations()) {this.valid = false;
      this.validationContext.rules.map((rule) => {
        if(rule instanceof ImportSolutionRule) {
          if(!rule.isValid) {
            if(!unknownNamesByColumn[rule.columnName]) {
              unknownNamesByColumn[rule.columnName] = {
                options: rule.possibleValueList.map((el) => el.name),
                newNames: [ rule.newName ]
              };
            } else {
              if(!unknownNamesByColumn[rule.columnName]['newNames'].includes(rule.newName)) {
                unknownNamesByColumn[rule.columnName]['newNames'].push(rule.newName)
              }
            }
          }
        } else if(rule instanceof ImportDuplicateRule) {
          if(!rule.isValid) conflictNames = rule.conflicts;
        }
      })
    }
    else
      this.valid = true;

    this.response = of({
      valid: this.valid,
      excelData: this.excelData,
      conflictNames,
      unknownNames: unknownNamesByColumn,
     });
  }
}
