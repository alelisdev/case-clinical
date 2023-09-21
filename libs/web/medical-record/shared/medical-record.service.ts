
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { MedicalRecord, UserCreateMedicalRecordInput, UserUpdateMedicalRecordInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { MedicalRecordBusinessProviderService } from "./medical-record.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class MedicalRecordService extends ServiceBase {
 constructor(
  @Inject(MedicalRecordBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: MedicalRecordBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("MedicalRecordService", loggingService, serviceContext);
 }

    createMedicalRecord(input: UserCreateMedicalRecordInput): Observable<MedicalRecord> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createMedicalRecord(filteredObj);
    }

    updateMedicalRecord(input: UserUpdateMedicalRecordInput, medicalRecordId: string): Observable<MedicalRecord> {
        return this.businessProvider.updateMedicalRecord(input, medicalRecordId);
    }

    importMedicalRecords(medicalRecords: UserUpdateMedicalRecordInput[]): Observable<UpdateResult> {
        return this.businessProvider.importMedicalRecords(medicalRecords);
    }

    validateMedicalRecordExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateMedicalRecordExcelData(excelData, clinicalProviders);
    }
}

