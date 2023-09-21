
import { of } from 'rxjs'
import { AppointmentBusinessActionBase } from './appointment.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Location, Patient, ClinicalProvider, LegalCase, AppointmentStatus } from '@case-clinical/shared/util/sdk'
export class ValidateAppointmentExcelDataAction extends AppointmentBusinessActionBase<boolean> {

   excelData: any[];
   locations: Location[]
patients: Patient[]
clinicalProviders: ClinicalProvider[]
legalCases: LegalCase[]
appointmentStatuses: AppointmentStatus[]

  valid = false;

  constructor(excelData: any[], locations: Location[], patients: Patient[], clinicalProviders: ClinicalProvider[], legalCases: LegalCase[], appointmentStatuses: AppointmentStatus[]) {
    super('ValidateAppointmentExcelDataAction')

    this.excelData = excelData;
this.locations = locations
this.patients = patients
this.clinicalProviders = clinicalProviders
this.legalCases = legalCases
this.appointmentStatuses = appointmentStatuses
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`appointmentStatusName_${index}_is_valid}`, "Appointment Status Is Not Valid", 'appointmentStatus.name', datum['appointmentStatus'], this.appointmentStatuses, true)
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
