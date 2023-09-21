
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Prescription, UserCreatePrescriptionInput, UserUpdatePrescriptionInput } from "@case-clinical/shared/util/sdk";
import { PrescriptionBusinessProviderService } from "./business/prescription.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPrescription(input);
    }

    updatePrescription(input: UserUpdatePrescriptionInput, prescriptionId: string): Observable<Prescription> {
        return this.businessProvider.updatePrescription(input, prescriptionId);
    }

    importPrescriptions(prescriptions: UserUpdatePrescriptionInput[]): Observable<boolean> {
        return this.businessProvider.importPrescriptions(prescriptions);
    }
}

