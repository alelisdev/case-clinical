
import { of } from 'rxjs'
import { InsuranceBusinessActionBase } from './insurance.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { LegalCase, InsuranceType, InsuranceSector, Lead } from '@case-clinical/shared/util/sdk'
export class ValidateInsuranceExcelDataAction extends InsuranceBusinessActionBase<boolean> {

   excelData: any[];
   legalCases: LegalCase[]
insuranceTypes: InsuranceType[]
insuranceSectors: InsuranceSector[]
leads: Lead[]

  valid = false;

  constructor(excelData: any[], legalCases: LegalCase[], insuranceTypes: InsuranceType[], insuranceSectors: InsuranceSector[], leads: Lead[]) {
    super('ValidateInsuranceExcelDataAction')

    this.excelData = excelData;
this.legalCases = legalCases
this.insuranceTypes = insuranceTypes
this.insuranceSectors = insuranceSectors
this.leads = leads
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`insuranceTypeName_${index}_is_valid}`, "Insurance Type Is Not Valid", 'insuranceType.name', datum['insuranceType'], this.insuranceTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`insuranceSectorName_${index}_is_valid}`, "Insurance Sector Is Not Valid", 'insuranceSector.name', datum['insuranceSector'], this.insuranceSectors, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`leadName_${index}_is_valid}`, "Lead Is Not Valid", 'lead.name', datum['lead'], this.leads, true)
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
