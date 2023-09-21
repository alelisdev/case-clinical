
import { of } from 'rxjs'
import { PriorAuthorizationProcedureCodeBusinessActionBase } from './prior-authorization-procedure-code.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { CostCategory, Procedure, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
export class ValidatePriorAuthorizationProcedureCodeExcelDataAction extends PriorAuthorizationProcedureCodeBusinessActionBase<boolean> {

   excelData: any[];
   costCategories: CostCategory[]
procedures: Procedure[]
priorAuthorizationRequests: PriorAuthorizationRequest[]

  valid = false;

  constructor(excelData: any[], costCategories: CostCategory[], procedures: Procedure[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    super('ValidatePriorAuthorizationProcedureCodeExcelDataAction')

    this.excelData = excelData;
this.costCategories = costCategories
this.procedures = procedures
this.priorAuthorizationRequests = priorAuthorizationRequests
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`costCategoryName_${index}_is_valid}`, "Cost Category Is Not Valid", 'costCategory.name', datum['costCategory'], this.costCategories, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`procedureName_${index}_is_valid}`, "Procedure Is Not Valid", 'procedure.name', datum['procedure'], this.procedures, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true)
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
