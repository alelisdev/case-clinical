
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Prescription, UserCreatePrescriptionInput, UserUpdatePrescriptionInput, UpdateResult, Patient, Document } from "@case-clinical/shared/util/sdk";
import { PrescriptionBusinessProviderService } from "./prescription.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PrescriptionService extends ServiceBase {
 constructor(
  @Inject(PrescriptionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PrescriptionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PrescriptionService", loggingService, serviceContext);
 }

    createPrescription(input: UserCreatePrescriptionInput): Observable<Prescription> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPrescription(filteredObj);
    }

    updatePrescription(input: UserUpdatePrescriptionInput, prescriptionId: string): Observable<Prescription> {
        return this.businessProvider.updatePrescription(input, prescriptionId);
    }

    importPrescriptions(prescriptions: UserUpdatePrescriptionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPrescriptions(prescriptions);
    }

    validatePrescriptionExcelData(excelData: any[], patients: Patient[], documents: Document[]) {
      return this.businessProvider.validatePrescriptionExcelData(excelData, patients, documents);
    }
}

