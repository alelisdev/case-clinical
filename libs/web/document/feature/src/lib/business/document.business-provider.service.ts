
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateDocumentAction} from './actions/create-document.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Document, UserCreateDocumentInput, UserUpdateDocumentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateDocumentsAction, UpdateDocumentAction } from './actions/update-documents.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class DocumentBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DocumentBusinessProviderService', logger, serviceContext)
  }

  createDocument(input: UserCreateDocumentInput): Observable<Document> {
    const action = new CreateDocumentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateDocument(input: UserUpdateDocumentInput, documentId: string): Observable<Document> {
    const action = new UpdateDocumentAction(input, documentId); 
    action.Do(this);
    return action.response;   
  }
  
  importDocuments(documents: UserUpdateDocumentInput[]): Observable<boolean> {
    const updateDocumentsAction = new UpdateDocumentsAction(documents);
    updateDocumentsAction.Do(this)
    return updateDocumentsAction.response;
  }
}

