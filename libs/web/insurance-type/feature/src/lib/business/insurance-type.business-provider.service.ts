
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateInsuranceTypeAction} from './actions/create-insurance-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {InsuranceType, UserCreateInsuranceTypeInput, UserUpdateInsuranceTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateInsuranceTypesAction, UpdateInsuranceTypeAction } from './actions/update-insurance-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class InsuranceTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceTypeBusinessProviderService', logger, serviceContext)
  }

  createInsuranceType(input: UserCreateInsuranceTypeInput): Observable<InsuranceType> {
    const action = new CreateInsuranceTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsuranceType(input: UserUpdateInsuranceTypeInput, insuranceTypeId: string): Observable<InsuranceType> {
    const action = new UpdateInsuranceTypeAction(input, insuranceTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsuranceTypes(insuranceTypes: UserUpdateInsuranceTypeInput[]): Observable<boolean> {
    const updateInsuranceTypesAction = new UpdateInsuranceTypesAction(insuranceTypes);
    updateInsuranceTypesAction.Do(this)
    return updateInsuranceTypesAction.response;
  }
}

