import { Document } from '@case-clinical/web/core/data-access'

export enum DocumentStatus {
  LOADING,
  LOADED,
}

export class DocumentPool {
  documentMap: Record<string, Document>;
  documetState: Record<string, DocumentStatus>;

  constructor() {
    this.documentMap = {};
    this.documetState = {};
  }

  getDocumentStatus(documentId: string) {
    const documentStatus = this.documetState[documentId];
    return documentStatus;
  }

  setDocumentStatus(documentId: string, documentStatus: DocumentStatus) {
    this.documetState[documentId] = documentStatus;
  }

  getDocument(documentId: string): Document {
    return this.documentMap[documentId];
  }

  setDocument(document: Document) {
    if(!this.documentMap[document.id]) this.documentMap[document.id] = document;
  }
}
