
import { of } from 'rxjs'
import { LegalCaseBusinessActionBase } from './legal-case.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { AccidentType, Patient, MedLevel, Firm, Attorney, CaseStatus, CaseType, PatientTreatmentStatus, CaseProgressStatus, AdverseInsuranceStatus } from '@case-clinical/shared/util/sdk'
export class ValidateLegalCaseExcelDataAction extends LegalCaseBusinessActionBase<boolean> {

   excelData: any[];
   accidentTypes: AccidentType[]
patients: Patient[]
medLevels: MedLevel[]
firms: Firm[]
attorneys: Attorney[]
caseStatuses: CaseStatus[]
caseTypes: CaseType[]
patientTreatmentStatuses: PatientTreatmentStatus[]
caseProgressStatuses: CaseProgressStatus[]
adverseInsuranceStatuses: AdverseInsuranceStatus[]

  valid = false;

  constructor(excelData: any[], accidentTypes: AccidentType[], patients: Patient[], medLevels: MedLevel[], firms: Firm[], attorneys: Attorney[], caseStatuses: CaseStatus[], caseTypes: CaseType[], patientTreatmentStatuses: PatientTreatmentStatus[], caseProgressStatuses: CaseProgressStatus[], adverseInsuranceStatuses: AdverseInsuranceStatus[]) {
    super('ValidateLegalCaseExcelDataAction')

    this.excelData = excelData;
this.accidentTypes = accidentTypes
this.patients = patients
this.medLevels = medLevels
this.firms = firms
this.attorneys = attorneys
this.caseStatuses = caseStatuses
this.caseTypes = caseTypes
this.patientTreatmentStatuses = patientTreatmentStatuses
this.caseProgressStatuses = caseProgressStatuses
this.adverseInsuranceStatuses = adverseInsuranceStatuses
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`medLevelName_${index}_is_valid}`, "Med Level Is Not Valid", 'medLevel.name', datum['medLevel'], this.medLevels, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`firmName_${index}_is_valid}`, "Firm Is Not Valid", 'firm.name', datum['firm'], this.firms, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`attorneyName_${index}_is_valid}`, "Attorney Is Not Valid", 'attorney.name', datum['attorney'], this.attorneys, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`caseStatusName_${index}_is_valid}`, "Case Status Is Not Valid", 'caseStatus.name', datum['caseStatus'], this.caseStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`caseTypeName_${index}_is_valid}`, "Case Type Is Not Valid", 'caseType.name', datum['caseType'], this.caseTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`patientTreatmentStatusName_${index}_is_valid}`, "Patient Treatment Status Is Not Valid", 'patientTreatmentStatus.name', datum['patientTreatmentStatus'], this.patientTreatmentStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`caseProgressStatusName_${index}_is_valid}`, "Case Progress Status Is Not Valid", 'caseProgressStatus.name', datum['caseProgressStatus'], this.caseProgressStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`adverseInsuranceStatusName_${index}_is_valid}`, "Adverse Insurance Status Is Not Valid", 'adverseInsuranceStatus.name', datum['adverseInsuranceStatus'], this.adverseInsuranceStatuses, true)
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
