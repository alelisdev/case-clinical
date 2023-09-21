
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateRequiredFieldAction} from './actions/create-required-field.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {RequiredField, UserCreateRequiredFieldInput, UserUpdateRequiredFieldInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateRequiredFieldsAction, UpdateRequiredFieldAction } from './actions/update-required-fields.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class RequiredFieldBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RequiredFieldBusinessProviderService', logger, serviceContext)
  }

  createRequiredField(input: UserCreateRequiredFieldInput): Observable<RequiredField> {
    const action = new CreateRequiredFieldAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRequiredField(input: UserUpdateRequiredFieldInput, requiredFieldId: string): Observable<RequiredField> {
    const action = new UpdateRequiredFieldAction(input, requiredFieldId); 
    action.Do(this);
    return action.response;   
  }
  
  importRequiredFields(requiredFields: UserUpdateRequiredFieldInput[]): Observable<boolean> {
    const updateRequiredFieldsAction = new UpdateRequiredFieldsAction(requiredFields);
    updateRequiredFieldsAction.Do(this)
    return updateRequiredFieldsAction.response;
  }
}

