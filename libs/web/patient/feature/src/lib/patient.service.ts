
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Ethnicity, Gender, Language, Patient, UpdateResult, UserCreatePatientInput, UserUpdatePatientInput } from "@case-clinical/shared/util/sdk";
import { PatientBusinessProviderService } from "./business/patient.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
    return this.businessProvider.createPatient(input);
  }

  updatePatient(input: UserUpdatePatientInput, patientId: string): Observable<Patient> {
    return this.businessProvider.updatePatient(input, patientId);
  }

  importPatients(patients: UserUpdatePatientInput[]): Observable<UpdateResult> {
    return this.businessProvider.importPatients(patients);
  }

  validatePatientExcelData(excelData: any[], genders: Gender[], languages: Language[], ethnicities: Ethnicity[]) {
    return this.businessProvider.validatePatientExcelData(excelData, genders, languages, ethnicities);
  }
}

