
import { of } from 'rxjs'
import { FeeScheduleBusinessActionBase } from './fee-schedule.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Organization, Specialty } from '@case-clinical/shared/util/sdk'
export class ValidateFeeScheduleExcelDataAction extends FeeScheduleBusinessActionBase<boolean> {

   excelData: any[];
   organizations: Organization[]
specialties: Specialty[]

  valid = false;

  constructor(excelData: any[], organizations: Organization[], specialties: Specialty[]) {
    super('ValidateFeeScheduleExcelDataAction')

    this.excelData = excelData;
this.organizations = organizations
this.specialties = specialties
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`organizationName_${index}_is_valid}`, "Organization Is Not Valid", 'organization.name', datum['organization'], this.organizations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`specialtyName_${index}_is_valid}`, "Specialty Is Not Valid", 'specialty.name', datum['specialty'], this.specialties, true)
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
