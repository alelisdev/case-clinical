
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAgreementTypeAction} from './actions/create-agreement-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AgreementType, UserCreateAgreementTypeInput, UserUpdateAgreementTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAgreementTypesAction, UpdateAgreementTypeAction } from './actions/update-agreement-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AgreementTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AgreementTypeBusinessProviderService', logger, serviceContext)
  }

  createAgreementType(input: UserCreateAgreementTypeInput): Observable<AgreementType> {
    const action = new CreateAgreementTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAgreementType(input: UserUpdateAgreementTypeInput, agreementTypeId: string): Observable<AgreementType> {
    const action = new UpdateAgreementTypeAction(input, agreementTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAgreementTypes(agreementTypes: UserUpdateAgreementTypeInput[]): Observable<boolean> {
    const updateAgreementTypesAction = new UpdateAgreementTypesAction(agreementTypes);
    updateAgreementTypesAction.Do(this)
    return updateAgreementTypesAction.response;
  }
}

