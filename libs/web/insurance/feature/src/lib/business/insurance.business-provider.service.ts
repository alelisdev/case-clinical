
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateInsuranceAction} from './actions/create-insurance.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Insurance, UserCreateInsuranceInput, UserUpdateInsuranceInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateInsurancesAction, UpdateInsuranceAction } from './actions/update-insurances.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class InsuranceBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceBusinessProviderService', logger, serviceContext)
  }

  createInsurance(input: UserCreateInsuranceInput): Observable<Insurance> {
    const action = new CreateInsuranceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsurance(input: UserUpdateInsuranceInput, insuranceId: string): Observable<Insurance> {
    const action = new UpdateInsuranceAction(input, insuranceId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsurances(insurances: UserUpdateInsuranceInput[]): Observable<boolean> {
    const updateInsurancesAction = new UpdateInsurancesAction(insurances);
    updateInsurancesAction.Do(this)
    return updateInsurancesAction.response;
  }
}

