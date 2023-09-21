
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DocumentType, UserCreateDocumentTypeInput, UserUpdateDocumentTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { DocumentTypeBusinessProviderService } from "./document-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class DocumentTypeService extends ServiceBase {
 constructor(
  @Inject(DocumentTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: DocumentTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("DocumentTypeService", loggingService, serviceContext);
 }

    createDocumentType(input: UserCreateDocumentTypeInput): Observable<DocumentType> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createDocumentType(filteredObj);
    }

    updateDocumentType(input: UserUpdateDocumentTypeInput, documentTypeId: string): Observable<DocumentType> {
        return this.businessProvider.updateDocumentType(input, documentTypeId);
    }

    importDocumentTypes(documentTypes: UserUpdateDocumentTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importDocumentTypes(documentTypes);
    }

    validateDocumentTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateDocumentTypeExcelData(excelData );
    }
}

