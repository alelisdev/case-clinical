import { of } from 'rxjs'
import { PatientBusinessActionBase } from './patient.business-action-base'
import { Ethnicity, Gender, Language } from '@case-clinical/shared/util/sdk';
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';

export class ValidatePatientExcelDataAction extends PatientBusinessActionBase<boolean> {

  excelData: any[];
  genders: Gender[]
  languages: Language[]
  ethnicities: Ethnicity[]
  valid = false;

  constructor(excelData: any[], genders: Gender[], languages: Language[], ethnicities: Ethnicity[]) {
    super('ValidatePatientExcelDataAction')

    this.excelData = excelData;
    this.genders = genders;
    this.languages = languages;
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(
        new ImportSolutionRule(`genderName_${index}_is_valid}`, "Gender Is Not Valid", 'gender.name', datum['gender'], this.genders, true)
      )
      this.validationContext.addRule(
        new ImportSolutionRule(`languageName_${index}_is_valid}`, "Language Is Not Valid", 'language.name', datum['language'], this.languages, true)
      )
      this.validationContext.addRule(
        new ImportSolutionRule(`ethnicityName_${index}_is_valid}`, "Ethnicity Is Not Valid", 'ethnicity.name', datum['ethnicity'], this.ethnicities, true)
      )
    })

    console.log(names)
    // Check Duplicate Error
    this.validationContext.addRule(
      new ImportDuplicateRule('nameIsUnique', 'Name should be unique', names, true)
    )
  }

  finish(): void {
    super.finish();

    const unknownNamesByColumn: Record<string, Record<string, any>> = {}
    let conflictNames = []

    if(this.validationContext.hasRuleViolations()) {
      this.valid = false;
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
