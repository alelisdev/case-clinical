
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Document, UserCreateDocumentInput, UserUpdateDocumentInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { DocumentBusinessProviderService } from "./document.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createDocument(filteredObj);
    }

    updateDocument(input: UserUpdateDocumentInput, documentId: string): Observable<Document> {
        return this.businessProvider.updateDocument(input, documentId);
    }

    importDocuments(documents: UserUpdateDocumentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importDocuments(documents);
    }

    validateDocumentExcelData(excelData: any[] ) {
      return this.businessProvider.validateDocumentExcelData(excelData );
    }
}

