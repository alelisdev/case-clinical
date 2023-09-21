
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateHealthInsuranceAction} from './actions/create-health-insurance.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {HealthInsurance, UserCreateHealthInsuranceInput, UserUpdateHealthInsuranceInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateHealthInsurancesAction, UpdateHealthInsuranceAction } from './actions/update-health-insurances.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class HealthInsuranceBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.HealthInsuranceBusinessProviderService', logger, serviceContext)
  }

  createHealthInsurance(input: UserCreateHealthInsuranceInput): Observable<HealthInsurance> {
    const action = new CreateHealthInsuranceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateHealthInsurance(input: UserUpdateHealthInsuranceInput, healthInsuranceId: string): Observable<HealthInsurance> {
    const action = new UpdateHealthInsuranceAction(input, healthInsuranceId); 
    action.Do(this);
    return action.response;   
  }
  
  importHealthInsurances(healthInsurances: UserUpdateHealthInsuranceInput[]): Observable<boolean> {
    const updateHealthInsurancesAction = new UpdateHealthInsurancesAction(healthInsurances);
    updateHealthInsurancesAction.Do(this)
    return updateHealthInsurancesAction.response;
  }
}

