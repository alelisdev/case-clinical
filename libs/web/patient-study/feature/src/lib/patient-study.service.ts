
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PatientStudy, UserCreatePatientStudyInput, UserUpdatePatientStudyInput } from "@case-clinical/shared/util/sdk";
import { PatientStudyBusinessProviderService } from "./business/patient-study.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPatientStudy(input);
    }

    updatePatientStudy(input: UserUpdatePatientStudyInput, patientStudyId: string): Observable<PatientStudy> {
        return this.businessProvider.updatePatientStudy(input, patientStudyId);
    }

    importPatientStudies(patientStudies: UserUpdatePatientStudyInput[]): Observable<boolean> {
        return this.businessProvider.importPatientStudies(patientStudies);
    }
}

