
import { of } from 'rxjs'
import { AttorneyBusinessActionBase } from './attorney.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Firm, AttorneyStatus, AttorneyType } from '@case-clinical/shared/util/sdk'
export class ValidateAttorneyExcelDataAction extends AttorneyBusinessActionBase<boolean> {

   excelData: any[];
   firms: Firm[]
attorneyStatuses: AttorneyStatus[]
attorneyTypes: AttorneyType[]

  valid = false;

  constructor(excelData: any[], firms: Firm[], attorneyStatuses: AttorneyStatus[], attorneyTypes: AttorneyType[]) {
    super('ValidateAttorneyExcelDataAction')

    this.excelData = excelData;
this.firms = firms
this.attorneyStatuses = attorneyStatuses
this.attorneyTypes = attorneyTypes
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`firmName_${index}_is_valid}`, "Firm Is Not Valid", 'firm.name', datum['firm'], this.firms, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`attorneyStatusName_${index}_is_valid}`, "Attorney Status Is Not Valid", 'attorneyStatus.name', datum['attorneyStatus'], this.attorneyStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`attorneyTypeName_${index}_is_valid}`, "Attorney Type Is Not Valid", 'attorneyType.name', datum['attorneyType'], this.attorneyTypes, true)
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
