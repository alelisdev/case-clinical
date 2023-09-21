
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PatientTreatmentStatus, UserCreatePatientTreatmentStatusInput, UserUpdatePatientTreatmentStatusInput } from "@case-clinical/shared/util/sdk";
import { PatientTreatmentStatusBusinessProviderService } from "./business/patient-treatment-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PatientTreatmentStatusService extends ServiceBase {
 constructor(
  @Inject(PatientTreatmentStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PatientTreatmentStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PatientTreatmentStatusService", loggingService, serviceContext);
 }

    createPatientTreatmentStatus(input: UserCreatePatientTreatmentStatusInput): Observable<PatientTreatmentStatus> {
        return this.businessProvider.createPatientTreatmentStatus(input);
    }

    updatePatientTreatmentStatus(input: UserUpdatePatientTreatmentStatusInput, patientTreatmentStatusId: string): Observable<PatientTreatmentStatus> {
        return this.businessProvider.updatePatientTreatmentStatus(input, patientTreatmentStatusId);
    }

    importPatientTreatmentStatuses(patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]): Observable<boolean> {
        return this.businessProvider.importPatientTreatmentStatuses(patientTreatmentStatuses);
    }
}

