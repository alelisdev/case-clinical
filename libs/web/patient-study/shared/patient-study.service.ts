
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PatientStudy, UserCreatePatientStudyInput, UserUpdatePatientStudyInput, UpdateResult, Patient } from "@case-clinical/shared/util/sdk";
import { PatientStudyBusinessProviderService } from "./patient-study.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PatientStudyService extends ServiceBase {
 constructor(
  @Inject(PatientStudyBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PatientStudyBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PatientStudyService", loggingService, serviceContext);
 }

    createPatientStudy(input: UserCreatePatientStudyInput): Observable<PatientStudy> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPatientStudy(filteredObj);
    }

    updatePatientStudy(input: UserUpdatePatientStudyInput, patientStudyId: string): Observable<PatientStudy> {
        return this.businessProvider.updatePatientStudy(input, patientStudyId);
    }

    importPatientStudies(patientStudies: UserUpdatePatientStudyInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPatientStudies(patientStudies);
    }

    validatePatientStudyExcelData(excelData: any[], patients: Patient[]) {
      return this.businessProvider.validatePatientStudyExcelData(excelData, patients);
    }
}

