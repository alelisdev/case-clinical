
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { MedicalRecordStatus, UserCreateMedicalRecordStatusInput, UserUpdateMedicalRecordStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { MedicalRecordStatusBusinessProviderService } from "./medical-record-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class MedicalRecordStatusService extends ServiceBase {
 constructor(
  @Inject(MedicalRecordStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: MedicalRecordStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("MedicalRecordStatusService", loggingService, serviceContext);
 }

    createMedicalRecordStatus(input: UserCreateMedicalRecordStatusInput): Observable<MedicalRecordStatus> {
        return this.businessProvider.createMedicalRecordStatus(input);
    }

    updateMedicalRecordStatus(input: UserUpdateMedicalRecordStatusInput, medicalRecordStatusId: string): Observable<MedicalRecordStatus> {
        return this.businessProvider.updateMedicalRecordStatus(input, medicalRecordStatusId);
    }

    importMedicalRecordStatuses(medicalRecordStatuses: UserUpdateMedicalRecordStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importMedicalRecordStatuses(medicalRecordStatuses);
    }

    validateMedicalRecordStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateMedicalRecordStatusExcelData(excelData );
    }
}

