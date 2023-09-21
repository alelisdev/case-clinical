
import { of } from 'rxjs'
import { AuthorizationBusinessActionBase } from './authorization.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Vendor, AuthorizationCategory, AuthorizationType, Procedure } from '@case-clinical/shared/util/sdk'
export class ValidateAuthorizationExcelDataAction extends AuthorizationBusinessActionBase<boolean> {

   excelData: any[];
   vendors: Vendor[]
authorizationCategories: AuthorizationCategory[]
authorizationTypes: AuthorizationType[]
procedures: Procedure[]

  valid = false;

  constructor(excelData: any[], vendors: Vendor[], authorizationCategories: AuthorizationCategory[], authorizationTypes: AuthorizationType[], procedures: Procedure[]) {
    super('ValidateAuthorizationExcelDataAction')

    this.excelData = excelData;
this.vendors = vendors
this.authorizationCategories = authorizationCategories
this.authorizationTypes = authorizationTypes
this.procedures = procedures
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`authorizationCategoryName_${index}_is_valid}`, "Authorization Category Is Not Valid", 'authorizationCategory.name', datum['authorizationCategory'], this.authorizationCategories, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`authorizationTypeName_${index}_is_valid}`, "Authorization Type Is Not Valid", 'authorizationType.name', datum['authorizationType'], this.authorizationTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true)
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
