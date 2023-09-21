
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateInsuranceSectorAction} from './actions/create-insurance-sector.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {InsuranceSector, UserCreateInsuranceSectorInput, UserUpdateInsuranceSectorInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateInsuranceSectorsAction, UpdateInsuranceSectorAction } from './actions/update-insurance-sectors.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class InsuranceSectorBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceSectorBusinessProviderService', logger, serviceContext)
  }

  createInsuranceSector(input: UserCreateInsuranceSectorInput): Observable<InsuranceSector> {
    const action = new CreateInsuranceSectorAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsuranceSector(input: UserUpdateInsuranceSectorInput, insuranceSectorId: string): Observable<InsuranceSector> {
    const action = new UpdateInsuranceSectorAction(input, insuranceSectorId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsuranceSectors(insuranceSectors: UserUpdateInsuranceSectorInput[]): Observable<boolean> {
    const updateInsuranceSectorsAction = new UpdateInsuranceSectorsAction(insuranceSectors);
    updateInsuranceSectorsAction.Do(this)
    return updateInsuranceSectorsAction.response;
  }
}

