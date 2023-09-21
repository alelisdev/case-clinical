
import { of } from 'rxjs'
import { PaymentBusinessActionBase } from './payment.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { BatchControl, Bank, PayorType, PaymentType, PaymentApplicationMethod } from '@case-clinical/shared/util/sdk'
export class ValidatePaymentExcelDataAction extends PaymentBusinessActionBase<boolean> {

   excelData: any[];
   batchControls: BatchControl[]
banks: Bank[]
payorTypes: PayorType[]
paymentTypes: PaymentType[]
paymentApplicationMethods: PaymentApplicationMethod[]

  valid = false;

  constructor(excelData: any[], batchControls: BatchControl[], banks: Bank[], payorTypes: PayorType[], paymentTypes: PaymentType[], paymentApplicationMethods: PaymentApplicationMethod[]) {
    super('ValidatePaymentExcelDataAction')

    this.excelData = excelData;
this.batchControls = batchControls
this.banks = banks
this.payorTypes = payorTypes
this.paymentTypes = paymentTypes
this.paymentApplicationMethods = paymentApplicationMethods
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`batchControlName_${index}_is_valid}`, "Batch Control Is Not Valid", 'batchControl.name', datum['batchControl'], this.batchControls, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`bankName_${index}_is_valid}`, "Bank Is Not Valid", 'bank.name', datum['bank'], this.banks, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`payorTypeName_${index}_is_valid}`, "Payor Type Is Not Valid", 'payorType.name', datum['payorType'], this.payorTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`paymentTypeName_${index}_is_valid}`, "Payment Type Is Not Valid", 'paymentType.name', datum['paymentType'], this.paymentTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`paymentApplicationMethodName_${index}_is_valid}`, "Payment Application Method Is Not Valid", 'paymentApplicationMethod.name', datum['paymentApplicationMethod'], this.paymentApplicationMethods, true)
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
