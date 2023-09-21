
import { of } from 'rxjs'
import { RequiredFieldBusinessActionBase } from './required-field.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { AccidentType, MedLevel } from '@case-clinical/shared/util/sdk'
export class ValidateRequiredFieldExcelDataAction extends RequiredFieldBusinessActionBase<boolean> {

   excelData: any[];
   accidentTypes: AccidentType[]
medLevels: MedLevel[]

  valid = false;

  constructor(excelData: any[], accidentTypes: AccidentType[], medLevels: MedLevel[]) {
    super('ValidateRequiredFieldExcelDataAction')

    this.excelData = excelData;
this.accidentTypes = accidentTypes
this.medLevels = medLevels
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`medLevelName_${index}_is_valid}`, "Med Level Is Not Valid", 'medLevel.name', datum['medLevel'], this.medLevels, true)
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
