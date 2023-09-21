
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCalculationBasisTypeAction} from './actions/create-calculation-basis-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CalculationBasisType, UserCreateCalculationBasisTypeInput, UserUpdateCalculationBasisTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCalculationBasisTypesAction, UpdateCalculationBasisTypeAction } from './actions/update-calculation-basis-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CalculationBasisTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CalculationBasisTypeBusinessProviderService', logger, serviceContext)
  }

  createCalculationBasisType(input: UserCreateCalculationBasisTypeInput): Observable<CalculationBasisType> {
    const action = new CreateCalculationBasisTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCalculationBasisType(input: UserUpdateCalculationBasisTypeInput, calculationBasisTypeId: string): Observable<CalculationBasisType> {
    const action = new UpdateCalculationBasisTypeAction(input, calculationBasisTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importCalculationBasisTypes(calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]): Observable<boolean> {
    const updateCalculationBasisTypesAction = new UpdateCalculationBasisTypesAction(calculationBasisTypes);
    updateCalculationBasisTypesAction.Do(this)
    return updateCalculationBasisTypesAction.response;
  }
}

