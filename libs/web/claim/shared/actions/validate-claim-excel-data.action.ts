
import { of } from 'rxjs'
import { ClaimBusinessActionBase } from './claim.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { PriorAuthorizationRequest, Document, Patient } from '@case-clinical/shared/util/sdk'
export class ValidateClaimExcelDataAction extends ClaimBusinessActionBase<boolean> {

   excelData: any[];
   priorAuthorizationRequests: PriorAuthorizationRequest[]
claims: Document[]
explanationOfPayments: Document[]
patients: Patient[]

  valid = false;

  constructor(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], claims: Document[], explanationOfPayments: Document[], patients: Patient[]) {
    super('ValidateClaimExcelDataAction')

    this.excelData = excelData;
this.priorAuthorizationRequests = priorAuthorizationRequests
this.claims = claims
this.explanationOfPayments = explanationOfPayments
this.patients = patients
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`priorAuthorizationRequestName_${index}_is_valid}`, "Prior Authorization Request Is Not Valid", 'priorAuthorizationRequest.name', datum['priorAuthorizationRequest'], this.priorAuthorizationRequests, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`claimName_${index}_is_valid}`, "Claim Is Not Valid", 'claim.name', datum['claim'], this.claims, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`explanationOfPaymentName_${index}_is_valid}`, "Explanation of Payment Is Not Valid", 'explanationOfPayment.name', datum['explanationOfPayment'], this.explanationOfPayments, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true)
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
