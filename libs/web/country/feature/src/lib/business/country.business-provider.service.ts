
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCountryAction} from './actions/create-country.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Country, UserCreateCountryInput, UserUpdateCountryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCountriesAction, UpdateCountryAction } from './actions/update-countries.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CountryBusinessProviderService extends ServiceBase {constructor(
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
  
  importCountries(countries: UserUpdateCountryInput[]): Observable<boolean> {
    const updateCountriesAction = new UpdateCountriesAction(countries);
    updateCountriesAction.Do(this)
    return updateCountriesAction.response;
  }
}

