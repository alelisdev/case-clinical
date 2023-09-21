
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContactKind, UserCreateContactKindInput, UserUpdateContactKindInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactKindExcelDataAction } from './actions/validate-contact-kind-excel-data.action'
import { CreateContactKindAction } from './actions/create-contact-kind.action'
import { UpdateContactKindsAction, UpdateContactKindAction } from './actions/update-contact-kinds.action'


@Injectable({providedIn: 'root'})
export class ContactKindBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContactKinds(contactKinds: UserUpdateContactKindInput[]): Observable<UpdateResult> {
    const updateContactKindsAction = new UpdateContactKindsAction(contactKinds);
    updateContactKindsAction.Do(this)
    return updateContactKindsAction.response;
  }

  validateContactKindExcelData(excelData: any[] ) {
    const validateContactKindExcelDataAction = new ValidateContactKindExcelDataAction(excelData );
    validateContactKindExcelDataAction.Do(this)
    return validateContactKindExcelDataAction.response;
  }
}

