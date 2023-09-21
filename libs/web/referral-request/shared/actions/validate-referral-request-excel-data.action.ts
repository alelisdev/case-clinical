
import { of } from 'rxjs'
import { ReferralRequestBusinessActionBase } from './referral-request.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Patient, LegalCase, ClinicalProvider, ClinicalProviderLocation } from '@case-clinical/shared/util/sdk'
export class ValidateReferralRequestExcelDataAction extends ReferralRequestBusinessActionBase<boolean> {

   excelData: any[];
   patients: Patient[]
legalCases: LegalCase[]
requestingProviders: ClinicalProvider[]
referredTos: ClinicalProvider[]
referredToLocations: ClinicalProviderLocation[]

  valid = false;

  constructor(excelData: any[], patients: Patient[], legalCases: LegalCase[], requestingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], referredToLocations: ClinicalProviderLocation[]) {
    super('ValidateReferralRequestExcelDataAction')

    this.excelData = excelData;
this.patients = patients
this.legalCases = legalCases
this.requestingProviders = requestingProviders
this.referredTos = referredTos
this.referredToLocations = referredToLocations
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`requestingProviderName_${index}_is_valid}`, "Requesting Provider Is Not Valid", 'requestingProvider.name', datum['requestingProvider'], this.requestingProviders, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`referredToName_${index}_is_valid}`, "Referred to Is Not Valid", 'referredTo.name', datum['referredTo'], this.referredTos, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`referredToLocationName_${index}_is_valid}`, "Referred to Location Is Not Valid", 'referredToLocation.name', datum['referredToLocation'], this.referredToLocations, true)
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
