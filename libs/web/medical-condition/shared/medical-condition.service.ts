
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { MedicalCondition, UserCreateMedicalConditionInput, UserUpdateMedicalConditionInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { MedicalConditionBusinessProviderService } from "./medical-condition.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class MedicalConditionService extends ServiceBase {
 constructor(
  @Inject(MedicalConditionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: MedicalConditionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("MedicalConditionService", loggingService, serviceContext);
 }

    createMedicalCondition(input: UserCreateMedicalConditionInput): Observable<MedicalCondition> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createMedicalCondition(filteredObj);
    }

    updateMedicalCondition(input: UserUpdateMedicalConditionInput, medicalConditionId: string): Observable<MedicalCondition> {
        return this.businessProvider.updateMedicalCondition(input, medicalConditionId);
    }

    importMedicalConditions(medicalConditions: UserUpdateMedicalConditionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importMedicalConditions(medicalConditions);
    }

    validateMedicalConditionExcelData(excelData: any[] ) {
      return this.businessProvider.validateMedicalConditionExcelData(excelData );
    }
}

