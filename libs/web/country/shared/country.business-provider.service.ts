
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Country, UserCreateCountryInput, UserUpdateCountryInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCountryExcelDataAction } from './actions/validate-country-excel-data.action'
import { CreateCountryAction } from './actions/create-country.action'
import { UpdateCountriesAction, UpdateCountryAction } from './actions/update-countries.action'


@Injectable({providedIn: 'root'})
export class CountryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CountryBusinessProviderService', logger, serviceContext)
  }

  createCountry(input: UserCreateCountryInput): Observable<Country> {
    const action = new CreateCountryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCountry(input: UserUpdateCountryInput, countryId: string): Observable<Country> {
    const action = new UpdateCountryAction(input, countryId); 
    action.Do(this);
    return action.response;   
  }
  
  importCountries(countries: UserUpdateCountryInput[]): Observable<UpdateResult> {
    const updateCountriesAction = new UpdateCountriesAction(countries);
    updateCountriesAction.Do(this)
    return updateCountriesAction.response;
  }

  validateCountryExcelData(excelData: any[] ) {
    const validateCountryExcelDataAction = new ValidateCountryExcelDataAction(excelData );
    validateCountryExcelDataAction.Do(this)
    return validateCountryExcelDataAction.response;
  }
}

