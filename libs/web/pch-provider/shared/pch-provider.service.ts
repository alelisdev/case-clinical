
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PchProvider, UserCreatePchProviderInput, UserUpdatePchProviderInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { PchProviderBusinessProviderService } from "./pch-provider.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PchProviderService extends ServiceBase {
 constructor(
  @Inject(PchProviderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PchProviderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PchProviderService", loggingService, serviceContext);
 }

    createPchProvider(input: UserCreatePchProviderInput): Observable<PchProvider> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPchProvider(filteredObj);
    }

    updatePchProvider(input: UserUpdatePchProviderInput, pchProviderId: string): Observable<PchProvider> {
        return this.businessProvider.updatePchProvider(input, pchProviderId);
    }

    importPchProviders(pchProviders: UserUpdatePchProviderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPchProviders(pchProviders);
    }

    validatePchProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validatePchProviderExcelData(excelData, clinicalProviders);
    }
}

