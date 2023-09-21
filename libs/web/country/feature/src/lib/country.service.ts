
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Country, UserCreateCountryInput, UserUpdateCountryInput } from "@case-clinical/shared/util/sdk";
import { CountryBusinessProviderService } from "./business/country.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createCountry(input);
    }

    updateCountry(input: UserUpdateCountryInput, countryId: string): Observable<Country> {
        return this.businessProvider.updateCountry(input, countryId);
    }

    importCountries(countries: UserUpdateCountryInput[]): Observable<boolean> {
        return this.businessProvider.importCountries(countries);
    }
}

