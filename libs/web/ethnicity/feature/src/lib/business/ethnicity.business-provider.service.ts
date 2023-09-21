
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateEthnicityAction} from './actions/create-ethnicity.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Ethnicity, UserCreateEthnicityInput, UserUpdateEthnicityInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateEthnicitiesAction, UpdateEthnicityAction } from './actions/update-ethnicities.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class EthnicityBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EthnicityBusinessProviderService', logger, serviceContext)
  }

  createEthnicity(input: UserCreateEthnicityInput): Observable<Ethnicity> {
    const action = new CreateEthnicityAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEthnicity(input: UserUpdateEthnicityInput, ethnicityId: string): Observable<Ethnicity> {
    const action = new UpdateEthnicityAction(input, ethnicityId); 
    action.Do(this);
    return action.response;   
  }
  
  importEthnicities(ethnicities: UserUpdateEthnicityInput[]): Observable<boolean> {
    const updateEthnicitiesAction = new UpdateEthnicitiesAction(ethnicities);
    updateEthnicitiesAction.Do(this)
    return updateEthnicitiesAction.response;
  }
}

