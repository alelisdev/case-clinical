
import { of } from 'rxjs'
import { FirmBusinessActionBase } from './firm.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { FirmStatus, Document } from '@case-clinical/shared/util/sdk'
export class ValidateFirmExcelDataAction extends FirmBusinessActionBase<boolean> {

   excelData: any[];
   firmStatuses: FirmStatus[]
eulas: Document[]

  valid = false;

  constructor(excelData: any[], firmStatuses: FirmStatus[], eulas: Document[]) {
    super('ValidateFirmExcelDataAction')

    this.excelData = excelData;
this.firmStatuses = firmStatuses
this.eulas = eulas
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`firmStatusName_${index}_is_valid}`, "Firm Status Is Not Valid", 'firmStatus.name', datum['firmStatus'], this.firmStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`eulaName_${index}_is_valid}`, "Eula Is Not Valid", 'eula.name', datum['eula'], this.eulas, true)
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
