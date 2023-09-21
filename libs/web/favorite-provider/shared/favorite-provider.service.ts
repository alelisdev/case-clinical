
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FavoriteProvider, UserCreateFavoriteProviderInput, UserUpdateFavoriteProviderInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { FavoriteProviderBusinessProviderService } from "./favorite-provider.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class FavoriteProviderService extends ServiceBase {
 constructor(
  @Inject(FavoriteProviderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FavoriteProviderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FavoriteProviderService", loggingService, serviceContext);
 }

    createFavoriteProvider(input: UserCreateFavoriteProviderInput): Observable<FavoriteProvider> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createFavoriteProvider(filteredObj);
    }

    updateFavoriteProvider(input: UserUpdateFavoriteProviderInput, favoriteProviderId: string): Observable<FavoriteProvider> {
        return this.businessProvider.updateFavoriteProvider(input, favoriteProviderId);
    }

    importFavoriteProviders(favoriteProviders: UserUpdateFavoriteProviderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFavoriteProviders(favoriteProviders);
    }

    validateFavoriteProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateFavoriteProviderExcelData(excelData, clinicalProviders);
    }
}

