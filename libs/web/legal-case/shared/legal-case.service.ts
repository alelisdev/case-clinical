
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LegalCase, UserCreateLegalCaseInput, UserUpdateLegalCaseInput, UpdateResult, AccidentType, Patient, MedLevel, Firm, Attorney, CaseStatus, CaseType, PatientTreatmentStatus, CaseProgressStatus, AdverseInsuranceStatus } from "@case-clinical/shared/util/sdk";
import { LegalCaseBusinessProviderService } from "./legal-case.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LegalCaseService extends ServiceBase {
 constructor(
  @Inject(LegalCaseBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LegalCaseBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LegalCaseService", loggingService, serviceContext);
 }

    createLegalCase(input: UserCreateLegalCaseInput): Observable<LegalCase> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLegalCase(filteredObj);
    }

    updateLegalCase(input: UserUpdateLegalCaseInput, legalCaseId: string): Observable<LegalCase> {
        return this.businessProvider.updateLegalCase(input, legalCaseId);
    }

    importLegalCases(legalCases: UserUpdateLegalCaseInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLegalCases(legalCases);
    }

    validateLegalCaseExcelData(excelData: any[], accidentTypes: AccidentType[], patients: Patient[], medLevels: MedLevel[], firms: Firm[], attorneys: Attorney[], caseStatuses: CaseStatus[], caseTypes: CaseType[], patientTreatmentStatuses: PatientTreatmentStatus[], caseProgressStatuses: CaseProgressStatus[], adverseInsuranceStatuses: AdverseInsuranceStatus[]) {
      return this.businessProvider.validateLegalCaseExcelData(excelData, accidentTypes, patients, medLevels, firms, attorneys, caseStatuses, caseTypes, patientTreatmentStatuses, caseProgressStatuses, adverseInsuranceStatuses);
    }
}

