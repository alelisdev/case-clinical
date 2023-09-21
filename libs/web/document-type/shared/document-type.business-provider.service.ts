
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { DocumentType, UserCreateDocumentTypeInput, UserUpdateDocumentTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateDocumentTypeExcelDataAction } from './actions/validate-document-type-excel-data.action'
import { CreateDocumentTypeAction } from './actions/create-document-type.action'
import { UpdateDocumentTypesAction, UpdateDocumentTypeAction } from './actions/update-document-types.action'


@Injectable({providedIn: 'root'})
export class DocumentTypeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importDocumentTypes(documentTypes: UserUpdateDocumentTypeInput[]): Observable<UpdateResult> {
    const updateDocumentTypesAction = new UpdateDocumentTypesAction(documentTypes);
    updateDocumentTypesAction.Do(this)
    return updateDocumentTypesAction.response;
  }

  validateDocumentTypeExcelData(excelData: any[] ) {
    const validateDocumentTypeExcelDataAction = new ValidateDocumentTypeExcelDataAction(excelData );
    validateDocumentTypeExcelDataAction.Do(this)
    return validateDocumentTypeExcelDataAction.response;
  }
}

