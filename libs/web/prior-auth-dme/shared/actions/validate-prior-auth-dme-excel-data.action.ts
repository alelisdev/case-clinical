
import { of } from 'rxjs'
import { PriorAuthDmeBusinessActionBase } from './prior-auth-dme.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { PriorAuthorizationRequest, DurableMedicalEquipment } from '@case-clinical/shared/util/sdk'
export class ValidatePriorAuthDmeExcelDataAction extends PriorAuthDmeBusinessActionBase<boolean> {

   excelData: any[];
   priorAuthorizationRequests: PriorAuthorizationRequest[]
durableMedicalEquipments: DurableMedicalEquipment[]

  valid = false;

  constructor(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], durableMedicalEquipments: DurableMedicalEquipment[]) {
    super('ValidatePriorAuthDmeExcelDataAction')

    this.excelData = excelData;
this.priorAuthorizationRequests = priorAuthorizationRequests
this.durableMedicalEquipments = durableMedicalEquipments
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`durableMedicalEquipmentName_${index}_is_valid}`, "Durable Medical Equipment Is Not Valid", 'durableMedicalEquipment.name', datum['durableMedicalEquipment'], this.durableMedicalEquipments, true)
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
