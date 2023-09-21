
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DocumentType, UserCreateDocumentTypeInput, UserUpdateDocumentTypeInput } from "@case-clinical/shared/util/sdk";
import { DocumentTypeBusinessProviderService } from "./business/document-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createDocumentType(input);
    }

    updateDocumentType(input: UserUpdateDocumentTypeInput, documentTypeId: string): Observable<DocumentType> {
        return this.businessProvider.updateDocumentType(input, documentTypeId);
    }

    importDocumentTypes(documentTypes: UserUpdateDocumentTypeInput[]): Observable<boolean> {
        return this.businessProvider.importDocumentTypes(documentTypes);
    }
}

