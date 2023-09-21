
import { of } from 'rxjs'
import { ImplantBusinessActionBase } from './implant.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { ImplantCategory, Contact, Manufacturer } from '@case-clinical/shared/util/sdk'
export class ValidateImplantExcelDataAction extends ImplantBusinessActionBase<boolean> {

   excelData: any[];
   implantCategories: ImplantCategory[]
salesRepresentatives: Contact[]
manufacturers: Manufacturer[]

  valid = false;

  constructor(excelData: any[], implantCategories: ImplantCategory[], salesRepresentatives: Contact[], manufacturers: Manufacturer[]) {
    super('ValidateImplantExcelDataAction')

    this.excelData = excelData;
this.implantCategories = implantCategories
this.salesRepresentatives = salesRepresentatives
this.manufacturers = manufacturers
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`implantCategoryName_${index}_is_valid}`, "Implant Category Is Not Valid", 'implantCategory.name', datum['implantCategory'], this.implantCategories, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`salesRepresentativeName_${index}_is_valid}`, "Sales Representative Is Not Valid", 'salesRepresentative.name', datum['salesRepresentative'], this.salesRepresentatives, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`manufacturerName_${index}_is_valid}`, "Manufacturer Is Not Valid", 'manufacturer.name', datum['manufacturer'], this.manufacturers, true)
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
