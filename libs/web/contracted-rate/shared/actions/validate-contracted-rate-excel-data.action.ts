
import { of } from 'rxjs'
import { ContractedRateBusinessActionBase } from './contracted-rate.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Contract, ContractedRateKind, ContractKind, VisitKind, ClinicalProvider, Specialty } from '@case-clinical/shared/util/sdk'
export class ValidateContractedRateExcelDataAction extends ContractedRateBusinessActionBase<boolean> {

   excelData: any[];
   contracts: Contract[]
contractedRateKinds: ContractedRateKind[]
contractKinds: ContractKind[]
visitKinds: VisitKind[]
clinicalProviders: ClinicalProvider[]
specialties: Specialty[]

  valid = false;

  constructor(excelData: any[], contracts: Contract[], contractedRateKinds: ContractedRateKind[], contractKinds: ContractKind[], visitKinds: VisitKind[], clinicalProviders: ClinicalProvider[], specialties: Specialty[]) {
    super('ValidateContractedRateExcelDataAction')

    this.excelData = excelData;
this.contracts = contracts
this.contractedRateKinds = contractedRateKinds
this.contractKinds = contractKinds
this.visitKinds = visitKinds
this.clinicalProviders = clinicalProviders
this.specialties = specialties
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`contractedRateKindName_${index}_is_valid}`, "Contracted Rate Kind Is Not Valid", 'contractedRateKind.name', datum['contractedRateKind'], this.contractedRateKinds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`contractKindName_${index}_is_valid}`, "Contract Kind Is Not Valid", 'contractKind.name', datum['contractKind'], this.contractKinds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`visitKindName_${index}_is_valid}`, "Visit Kind Is Not Valid", 'visitKind.name', datum['visitKind'], this.visitKinds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`specialtyName_${index}_is_valid}`, "Specialty Is Not Valid", 'specialty.name', datum['specialty'], this.specialties, true)
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
