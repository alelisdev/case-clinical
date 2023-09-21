
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PatientTreatmentStatus, UserCreatePatientTreatmentStatusInput, UserUpdatePatientTreatmentStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PatientTreatmentStatusBusinessProviderService } from "./patient-treatment-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPatientTreatmentStatus(filteredObj);
    }

    updatePatientTreatmentStatus(input: UserUpdatePatientTreatmentStatusInput, patientTreatmentStatusId: string): Observable<PatientTreatmentStatus> {
        return this.businessProvider.updatePatientTreatmentStatus(input, patientTreatmentStatusId);
    }

    importPatientTreatmentStatuses(patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPatientTreatmentStatuses(patientTreatmentStatuses);
    }

    validatePatientTreatmentStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validatePatientTreatmentStatusExcelData(excelData );
    }
}

