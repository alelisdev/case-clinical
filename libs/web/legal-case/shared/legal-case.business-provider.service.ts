
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { LegalCase, UserCreateLegalCaseInput, UserUpdateLegalCaseInput, UpdateResult, AccidentType, Patient, MedLevel, Firm, Attorney, CaseStatus, CaseType, PatientTreatmentStatus, CaseProgressStatus, AdverseInsuranceStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLegalCaseExcelDataAction } from './actions/validate-legal-case-excel-data.action'
import { CreateLegalCaseAction } from './actions/create-legal-case.action'
import { UpdateLegalCasesAction, UpdateLegalCaseAction } from './actions/update-legal-cases.action'


@Injectable({providedIn: 'root'})
export class LegalCaseBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LegalCaseBusinessProviderService', logger, serviceContext)
  }

  createLegalCase(input: UserCreateLegalCaseInput): Observable<LegalCase> {
    const action = new CreateLegalCaseAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLegalCase(input: UserUpdateLegalCaseInput, legalCaseId: string): Observable<LegalCase> {
    const action = new UpdateLegalCaseAction(input, legalCaseId); 
    action.Do(this);
    return action.response;   
  }
  
  importLegalCases(legalCases: UserUpdateLegalCaseInput[]): Observable<UpdateResult> {
    const updateLegalCasesAction = new UpdateLegalCasesAction(legalCases);
    updateLegalCasesAction.Do(this)
    return updateLegalCasesAction.response;
  }

  validateLegalCaseExcelData(excelData: any[], accidentTypes: AccidentType[], patients: Patient[], medLevels: MedLevel[], firms: Firm[], attorneys: Attorney[], caseStatuses: CaseStatus[], caseTypes: CaseType[], patientTreatmentStatuses: PatientTreatmentStatus[], caseProgressStatuses: CaseProgressStatus[], adverseInsuranceStatuses: AdverseInsuranceStatus[]) {
    const validateLegalCaseExcelDataAction = new ValidateLegalCaseExcelDataAction(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses);
    validateLegalCaseExcelDataAction.Do(this)
    return validateLegalCaseExcelDataAction.response;
  }
}

