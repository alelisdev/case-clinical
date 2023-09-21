
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateDocumentTypeAction} from './actions/create-document-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {DocumentType, UserCreateDocumentTypeInput, UserUpdateDocumentTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateDocumentTypesAction, UpdateDocumentTypeAction } from './actions/update-document-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class DocumentTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DocumentTypeBusinessProviderService', logger, serviceContext)
  }

  createDocumentType(input: UserCreateDocumentTypeInput): Observable<DocumentType> {
    const action = new CreateDocumentTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateDocumentType(input: UserUpdateDocumentTypeInput, documentTypeId: string): Observable<DocumentType> {
    const action = new UpdateDocumentTypeAction(input, documentTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importDocumentTypes(documentTypes: UserUpdateDocumentTypeInput[]): Observable<boolean> {
    const updateDocumentTypesAction = new UpdateDocumentTypesAction(documentTypes);
    updateDocumentTypesAction.Do(this)
    return updateDocumentTypesAction.response;
  }
}

