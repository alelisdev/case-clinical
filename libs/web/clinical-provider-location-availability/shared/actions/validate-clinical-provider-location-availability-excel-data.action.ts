
import { of } from 'rxjs'
import { ClinicalProviderLocationAvailabilityBusinessActionBase } from './clinical-provider-location-availability.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { ClinicalProviderLocation } from '@case-clinical/shared/util/sdk'
export class ValidateClinicalProviderLocationAvailabilityExcelDataAction extends ClinicalProviderLocationAvailabilityBusinessActionBase<boolean> {

   excelData: any[];
   clinicalProviderLocations: ClinicalProviderLocation[]

  valid = false;

  constructor(excelData: any[], clinicalProviderLocations: ClinicalProviderLocation[]) {
    super('ValidateClinicalProviderLocationAvailabilityExcelDataAction')

    this.excelData = excelData;
this.clinicalProviderLocations = clinicalProviderLocations
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`clinicalProviderLocationName_${index}_is_valid}`, "Clinical Provider Location Is Not Valid", 'clinicalProviderLocation.name', datum['clinicalProviderLocation'], this.clinicalProviderLocations, true)
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
