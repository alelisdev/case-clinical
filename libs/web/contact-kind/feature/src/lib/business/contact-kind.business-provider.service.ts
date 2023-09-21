
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactKindAction} from './actions/create-contact-kind.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContactKind, UserCreateContactKindInput, UserUpdateContactKindInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactKindsAction, UpdateContactKindAction } from './actions/update-contact-kinds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactKindBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactKindBusinessProviderService', logger, serviceContext)
  }

  createContactKind(input: UserCreateContactKindInput): Observable<ContactKind> {
    const action = new CreateContactKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContactKind(input: UserUpdateContactKindInput, contactKindId: string): Observable<ContactKind> {
    const action = new UpdateContactKindAction(input, contactKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importContactKinds(contactKinds: UserUpdateContactKindInput[]): Observable<boolean> {
    const updateContactKindsAction = new UpdateContactKindsAction(contactKinds);
    updateContactKindsAction.Do(this)
    return updateContactKindsAction.response;
  }
}

