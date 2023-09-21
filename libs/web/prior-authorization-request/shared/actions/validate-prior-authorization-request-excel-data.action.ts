
import { of } from 'rxjs'
import { PriorAuthorizationRequestBusinessActionBase } from './prior-authorization-request.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { ProcedureSite, SurgicalPosition, ClinicalProvider, Document, VisitKind, GuidelineUsed, AuthorizationKind, AuthorizationStatus, Patient, CaseProcedure } from '@case-clinical/shared/util/sdk'
export class ValidatePriorAuthorizationRequestExcelDataAction extends PriorAuthorizationRequestBusinessActionBase<boolean> {

   excelData: any[];
   procedureSites: ProcedureSite[]
surgicalPositions: SurgicalPosition[]
treatingProviders: ClinicalProvider[]
referredTos: ClinicalProvider[]
prescriptions: Document[]
visitKinds: VisitKind[]
guidelineUseds: GuidelineUsed[]
authorizationKinds: AuthorizationKind[]
authorizationStatuses: AuthorizationStatus[]
bills: Document[]
medicalReports: Document[]
patients: Patient[]
caseProcedures: CaseProcedure[]

  valid = false;

  constructor(excelData: any[], procedureSites: ProcedureSite[], surgicalPositions: SurgicalPosition[], treatingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], prescriptions: Document[], visitKinds: VisitKind[], guidelineUseds: GuidelineUsed[], authorizationKinds: AuthorizationKind[], authorizationStatuses: AuthorizationStatus[],  patients: Patient[], caseProcedures: CaseProcedure[]) {
    super('ValidatePriorAuthorizationRequestExcelDataAction')

    this.excelData = excelData;
this.procedureSites = procedureSites
this.surgicalPositions = surgicalPositions
this.treatingProviders = treatingProviders
this.referredTos = referredTos
this.prescriptions = prescriptions
this.visitKinds = visitKinds
this.guidelineUseds = guidelineUseds
this.authorizationKinds = authorizationKinds
this.authorizationStatuses = authorizationStatuses
this.patients = patients
this.caseProcedures = caseProcedures
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`procedureSiteName_${index}_is_valid}`, "Procedure Site Is Not Valid", 'procedureSite.name', datum['procedureSite'], this.procedureSites, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`surgicalPositionName_${index}_is_valid}`, "Surgical Position Is Not Valid", 'surgicalPosition.name', datum['surgicalPosition'], this.surgicalPositions, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`treatingProviderName_${index}_is_valid}`, "Treating Provider Is Not Valid", 'treatingProvider.name', datum['treatingProvider'], this.treatingProviders, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`referredToName_${index}_is_valid}`, "Referred to Is Not Valid", 'referredTo.name', datum['referredTo'], this.referredTos, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`prescriptionName_${index}_is_valid}`, "Prescription Is Not Valid", 'prescription.name', datum['prescription'], this.prescriptions, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`visitKindName_${index}_is_valid}`, "Visit Kind Is Not Valid", 'visitKind.name', datum['visitKind'], this.visitKinds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`guidelineUsedName_${index}_is_valid}`, "Guideline Used Is Not Valid", 'guidelineUsed.name', datum['guidelineUsed'], this.guidelineUseds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`authorizationKindName_${index}_is_valid}`, "Authorization Kind Is Not Valid", 'authorizationKind.name', datum['authorizationKind'], this.authorizationKinds, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`authorizationStatusName_${index}_is_valid}`, "Authorization Status Is Not Valid", 'authorizationStatus.name', datum['authorizationStatus'], this.authorizationStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`caseProcedureName_${index}_is_valid}`, "Case Procedure Is Not Valid", 'caseProcedure.name', datum['caseProcedure'], this.caseProcedures, true)
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
