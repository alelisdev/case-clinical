
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Country, UserCreateCountryInput, UserUpdateCountryInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CountryBusinessProviderService } from "./country.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CountryService extends ServiceBase {
 constructor(
  @Inject(CountryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CountryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CountryService", loggingService, serviceContext);
 }

    createCountry(input: UserCreateCountryInput): Observable<Country> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCountry(filteredObj);
    }

    updateCountry(input: UserUpdateCountryInput, countryId: string): Observable<Country> {
        return this.businessProvider.updateCountry(input, countryId);
    }

    importCountries(countries: UserUpdateCountryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCountries(countries);
    }

    validateCountryExcelData(excelData: any[] ) {
      return this.businessProvider.validateCountryExcelData(excelData );
    }
}

