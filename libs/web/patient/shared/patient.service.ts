
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Patient, UserCreatePatientInput, UserUpdatePatientInput, UpdateResult, Ethnicity, Gender, Language } from "@case-clinical/shared/util/sdk";
import { PatientBusinessProviderService } from "./patient.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PatientService extends ServiceBase {
 constructor(
  @Inject(PatientBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PatientBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PatientService", loggingService, serviceContext);
 }

    createPatient(input: UserCreatePatientInput): Observable<Patient> {
        input.notes = (input.notes?.length > 1000 ? input.notes?.substring(0,999):input.notes )
        input.debtorRemarks = (input.debtorRemarks?.length > 1000 ? input.debtorRemarks?.substring(0,999):input.debtorRemarks )
        
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPatient(filteredObj);
    }

    updatePatient(input: UserUpdatePatientInput, patientId: string): Observable<Patient> {
        input.notes = (input.notes?.length > 1000 ? input.notes?.substring(0,999):input.notes )
        input.debtorRemarks = (input.debtorRemarks?.length > 1000 ? input.debtorRemarks?.substring(0,999):input.debtorRemarks )
        
        return this.businessProvider.updatePatient(input, patientId);
    }

    importPatients(patients: UserUpdatePatientInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPatients(patients);
    }

    validatePatientExcelData(excelData: any[], ethnicities: Ethnicity[], genders: Gender[], languages: Language[]) {
      return this.businessProvider.validatePatientExcelData(excelData, ethnicities, genders, languages);
    }
}

