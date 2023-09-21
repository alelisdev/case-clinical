
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Document, UserCreateDocumentInput, UserUpdateDocumentInput } from "@case-clinical/shared/util/sdk";
import { DocumentBusinessProviderService } from "./business/document.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends ServiceBase {
 constructor(
  @Inject(DocumentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: DocumentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("DocumentService", loggingService, serviceContext);
 }

    createDocument(input: UserCreateDocumentInput): Observable<Document> {
        return this.businessProvider.createDocument(input);
    }

    updateDocument(input: UserUpdateDocumentInput, documentId: string): Observable<Document> {
        return this.businessProvider.updateDocument(input, documentId);
    }

    importDocuments(documents: UserUpdateDocumentInput[]): Observable<boolean> {
        return this.businessProvider.importDocuments(documents);
    }
}

