
import { of } from 'rxjs'
import { RecommendedOrderDiagnosisCodeBusinessActionBase } from './recommended-order-diagnosis-code.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { DiagnosisCode, RecommendedOrder } from '@case-clinical/shared/util/sdk'
export class ValidateRecommendedOrderDiagnosisCodeExcelDataAction extends RecommendedOrderDiagnosisCodeBusinessActionBase<boolean> {

   excelData: any[];
   diagnoses: DiagnosisCode[]
recommendedOrders: RecommendedOrder[]

  valid = false;

  constructor(excelData: any[], diagnoses: DiagnosisCode[], recommendedOrders: RecommendedOrder[]) {
    super('ValidateRecommendedOrderDiagnosisCodeExcelDataAction')

    this.excelData = excelData;
this.diagnoses = diagnoses
this.recommendedOrders = recommendedOrders
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`diagnosisName_${index}_is_valid}`, "Diagnosis Is Not Valid", 'diagnosis.name', datum['diagnosis'], this.diagnoses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`recommendedOrderName_${index}_is_valid}`, "Recommended Order Is Not Valid", 'recommendedOrder.name', datum['recommendedOrder'], this.recommendedOrders, true)
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
