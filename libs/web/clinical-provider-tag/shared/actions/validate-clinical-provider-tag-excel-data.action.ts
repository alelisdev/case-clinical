
import { of } from 'rxjs'
import { ClinicalProviderTagBusinessActionBase } from './clinical-provider-tag.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { ClinicalProvider, Tag } from '@case-clinical/shared/util/sdk'
export class ValidateClinicalProviderTagExcelDataAction extends ClinicalProviderTagBusinessActionBase<boolean> {

   excelData: any[];
   clinicalProviders: ClinicalProvider[]
tags: Tag[]

  valid = false;

  constructor(excelData: any[], clinicalProviders: ClinicalProvider[], tags: Tag[]) {
    super('ValidateClinicalProviderTagExcelDataAction')

    this.excelData = excelData;
this.clinicalProviders = clinicalProviders
this.tags = tags
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`tagName_${index}_is_valid}`, "Tag Is Not Valid", 'tag.name', datum['tag'], this.tags, true)
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
