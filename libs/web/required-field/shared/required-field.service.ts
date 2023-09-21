
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RequiredField, UserCreateRequiredFieldInput, UserUpdateRequiredFieldInput, UpdateResult, AccidentType, MedLevel } from "@case-clinical/shared/util/sdk";
import { RequiredFieldBusinessProviderService } from "./required-field.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class RequiredFieldService extends ServiceBase {
 constructor(
  @Inject(RequiredFieldBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RequiredFieldBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RequiredFieldService", loggingService, serviceContext);
 }

    createRequiredField(input: UserCreateRequiredFieldInput): Observable<RequiredField> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createRequiredField(filteredObj);
    }

    updateRequiredField(input: UserUpdateRequiredFieldInput, requiredFieldId: string): Observable<RequiredField> {
        return this.businessProvider.updateRequiredField(input, requiredFieldId);
    }

    importRequiredFields(requiredFields: UserUpdateRequiredFieldInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRequiredFields(requiredFields);
    }

    validateRequiredFieldExcelData(excelData: any[], accidentTypes: AccidentType[], medLevels: MedLevel[]) {
      return this.businessProvider.validateRequiredFieldExcelData(excelData, accidentTypes, medLevels);
    }
}

