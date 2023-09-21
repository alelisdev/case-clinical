
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RequiredField, UserCreateRequiredFieldInput, UserUpdateRequiredFieldInput } from "@case-clinical/shared/util/sdk";
import { RequiredFieldBusinessProviderService } from "./business/required-field.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createRequiredField(input);
    }

    updateRequiredField(input: UserUpdateRequiredFieldInput, requiredFieldId: string): Observable<RequiredField> {
        return this.businessProvider.updateRequiredField(input, requiredFieldId);
    }

    importRequiredFields(requiredFields: UserUpdateRequiredFieldInput[]): Observable<boolean> {
        return this.businessProvider.importRequiredFields(requiredFields);
    }
}

