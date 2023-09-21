
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Document, UserCreateDocumentInput, UserUpdateDocumentInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateDocumentExcelDataAction } from './actions/validate-document-excel-data.action'
import { CreateDocumentAction } from './actions/create-document.action'
import { UpdateDocumentsAction, UpdateDocumentAction } from './actions/update-documents.action'


@Injectable({providedIn: 'root'})
export class DocumentBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importDocuments(documents: UserUpdateDocumentInput[]): Observable<UpdateResult> {
    const updateDocumentsAction = new UpdateDocumentsAction(documents);
    updateDocumentsAction.Do(this)
    return updateDocumentsAction.response;
  }

  validateDocumentExcelData(excelData: any[] ) {
    const validateDocumentExcelDataAction = new ValidateDocumentExcelDataAction(excelData );
    validateDocumentExcelDataAction.Do(this)
    return validateDocumentExcelDataAction.response;
  }
}

