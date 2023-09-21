
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AgreementType, UserCreateAgreementTypeInput, UserUpdateAgreementTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AgreementTypeBusinessProviderService } from "./agreement-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAgreementType(filteredObj);
    }

    updateAgreementType(input: UserUpdateAgreementTypeInput, agreementTypeId: string): Observable<AgreementType> {
        return this.businessProvider.updateAgreementType(input, agreementTypeId);
    }

    importAgreementTypes(agreementTypes: UserUpdateAgreementTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAgreementTypes(agreementTypes);
    }

    validateAgreementTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateAgreementTypeExcelData(excelData );
    }
}

