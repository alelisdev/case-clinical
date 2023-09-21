import { of } from 'rxjs'
import { ContractBusinessActionBase } from './contract.business-action-base'
import { ImportRowHasRequiredFields } from '@schema-driven/rules-engine';

const requiredFields = [
  'name',
  'organization',
  'vendor',
  // 'template',
  'billingOrganization',
  'reconciliationPeriodType',
  'calculationBasisType',
  'process',
]

export class CheckRequiredFieldsAction extends ContractBusinessActionBase<boolean> {

   excelData: any[];

  constructor(excelData: any[]) {
    super('CheckRequiredFieldsAction')

    this.excelData = excelData;
    console.log(excelData)
  }

  preValidateAction() {
    this.excelData.map((datum, index) => {
            this.validationContext.addRule(
              new ImportRowHasRequiredFields(`row_${index}_is_valid`, `Row ${index} is not valid`, datum, requiredFields, true)
            )
    })
  }

  finish(): void {
    super.finish();

    let data = []
    const badData = [];

    if(this.validationContext.hasRuleViolations()) {
      this.validationContext.rules.map((rule) => {
        if(rule instanceof ImportRowHasRequiredFields) {
          if(rule.isValid) {
            data.push(rule.target)
          } else {
            badData.push(rule.target)
          }
        }
      })
    } else {
      data = this.excelData;
    }

    this.response = of({
      data,
      badData,
      requiredFields,
    });
  }
}
