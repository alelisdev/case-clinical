
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AgreementType, UserCreateAgreementTypeInput, UserUpdateAgreementTypeInput } from "@case-clinical/shared/util/sdk";
import { AgreementTypeBusinessProviderService } from "./business/agreement-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AgreementTypeService extends ServiceBase {
 constructor(
  @Inject(AgreementTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AgreementTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AgreementTypeService", loggingService, serviceContext);
 }

    createAgreementType(input: UserCreateAgreementTypeInput): Observable<AgreementType> {
        return this.businessProvider.createAgreementType(input);
    }

    updateAgreementType(input: UserUpdateAgreementTypeInput, agreementTypeId: string): Observable<AgreementType> {
        return this.businessProvider.updateAgreementType(input, agreementTypeId);
    }

    importAgreementTypes(agreementTypes: UserUpdateAgreementTypeInput[]): Observable<boolean> {
        return this.businessProvider.importAgreementTypes(agreementTypes);
    }
}

