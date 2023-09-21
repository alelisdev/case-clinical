
import { of } from 'rxjs'
import { PriorMedsToDateBusinessActionBase } from './prior-meds-to-date.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { LegalCase, PriorMedsToDateStatus } from '@case-clinical/shared/util/sdk'
export class ValidatePriorMedsToDateExcelDataAction extends PriorMedsToDateBusinessActionBase<boolean> {

   excelData: any[];
   legalCases: LegalCase[]
priorMedsToDateStatuses: PriorMedsToDateStatus[]

  valid = false;

  constructor(excelData: any[], legalCases: LegalCase[], priorMedsToDateStatuses: PriorMedsToDateStatus[]) {
    super('ValidatePriorMedsToDateExcelDataAction')

    this.excelData = excelData;
this.legalCases = legalCases
this.priorMedsToDateStatuses = priorMedsToDateStatuses
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`priorMedsToDateStatusName_${index}_is_valid}`, "Prior Meds to Date Status Is Not Valid", 'priorMedsToDateStatus.name', datum['priorMedsToDateStatus'], this.priorMedsToDateStatuses, true)
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
