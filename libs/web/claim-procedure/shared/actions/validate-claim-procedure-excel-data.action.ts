
import { of } from 'rxjs'
import { ClaimProcedureBusinessActionBase } from './claim-procedure.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { PlaceOfService, ClaimStatus, Claim, Appointment, Procedure } from '@case-clinical/shared/util/sdk'
export class ValidateClaimProcedureExcelDataAction extends ClaimProcedureBusinessActionBase<boolean> {

   excelData: any[];
   placeOfServices: PlaceOfService[]
claimStatuses: ClaimStatus[]
claims: Claim[]
appointments: Appointment[]
procedures: Procedure[]

  valid = false;

  constructor(excelData: any[], placeOfServices: PlaceOfService[], claimStatuses: ClaimStatus[], claims: Claim[], appointments: Appointment[], procedures: Procedure[]) {
    super('ValidateClaimProcedureExcelDataAction')

    this.excelData = excelData;
this.placeOfServices = placeOfServices
this.claimStatuses = claimStatuses
this.claims = claims
this.appointments = appointments
this.procedures = procedures
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`placeOfServiceName_${index}_is_valid}`, "Place of Service Is Not Valid", 'placeOfService.name', datum['placeOfService'], this.placeOfServices, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`claimStatusName_${index}_is_valid}`, "Claim Status Is Not Valid", 'claimStatus.name', datum['claimStatus'], this.claimStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`claimName_${index}_is_valid}`, "Claim Is Not Valid", 'claim.name', datum['claim'], this.claims, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`appointmentName_${index}_is_valid}`, "Appointment Is Not Valid", 'appointment.name', datum['appointment'], this.appointments, true)
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
