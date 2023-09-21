import { ApolloAngularSDK, FormLayout } from '@case-clinical/shared/util/sdk'
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from '@case-clinical/web/core/data-access'
import { DocumentPool, DocumentStatus } from './document-pool';
import { Injectable } from '@angular/core'
import { FormLayoutPool, FormLayoutStatus } from './form-layout-pool';

@Injectable({ providedIn: 'root' })
export class WebCoreDataAccessService extends ApolloAngularSDK {
  documentPool = new DocumentPool();
  formLayoutPool = new FormLayoutPool();

  documentLoadSubject = new BehaviorSubject(null)
  formLayoutLoadSubject = new BehaviorSubject(null)


  public getDocument(documentId: string): Observable<Document> {
    return new Observable((observer) => {
      const documentStatus = this.documentPool.getDocumentStatus(documentId);
      // If document exists in the documenPool already, just return that document
      if (documentStatus === DocumentStatus.LOADED) {
        observer.next(this.documentPool.getDocument(documentId));
        observer.complete();
        // If the same document is being loaded from server, then wait until loading finishes
      } else if (documentStatus === DocumentStatus.LOADING) {
        this.waitDocumentLoading(documentId).subscribe((document) => {
          observer.next(document);
          observer.complete();
        });
      } else {
        this.waitDocumentLoading(documentId).subscribe((document) => {
          observer.next(document);
          observer.complete();
        });
        this.loadDocument(documentId);
      }
    })
  }

  private loadDocument(documentId: string) {
    this.documentPool.setDocumentStatus(documentId, DocumentStatus.LOADING);
    const subscriber = this.userDocument({ documentId }).subscribe(( response ) => {
      this.documentPool.setDocumentStatus(documentId, DocumentStatus.LOADED);
      this.documentPool.setDocument(response.data.item);
      this.documentLoadSubject.next({ documentId, document: response.data.item });
      subscriber.unsubscribe();
    });
  }

  private waitDocumentLoading(waitingDocumentId: string): Observable<Document> {
    return new Observable((observer) => {
      const subscriber = this.documentLoadSubject.subscribe((result) => {
        if(!result) return;
        const { documentId, document } = result;
        if(documentId === waitingDocumentId) {
          observer.next(document);
          observer.complete();
          subscriber.unsubscribe();
        }
      });
    });
  }

  // Fetch a batch of FormLayout and save into cache
  public fetchAndCacheFormLayouts(formName: string): Observable<boolean> {
    return new Observable((observer) => {
      const subscriber = this.publicFormLayouts({formName}).subscribe((response) => {
        console.log(`Loaded ${response.data.layouts?.length} records for current portal :)`);
        response.data.layouts?.map((formLayout) => {
          this.formLayoutPool.setFormLayoutStatus(formLayout.name, FormLayoutStatus.LOADED);
          this.formLayoutPool.setFormLayout(formLayout);
        })
        observer.next(true);
        observer.complete();
        subscriber.unsubscribe();
      });
    })
  }

  // Fetch a batch of FormLayout and save into cache
  public fetchAndCacheAdminFormLayouts(): Observable<boolean> {
    return new Observable((observer) => {
      const subscriber = this.userAdminFormLayouts().subscribe((response) => {
        console.log(`Loaded ${response.data.layouts?.length} records for current portal :)`);
        response.data.layouts?.map((formLayout) => {
          this.formLayoutPool.setFormLayoutStatus(formLayout.name, FormLayoutStatus.LOADED);
          this.formLayoutPool.setFormLayout(formLayout);
        })
        observer.next(true);
        observer.complete();
        subscriber.unsubscribe();
      });
    })
  }

  public getFormLayout(formName: string): Observable<FormLayout> {
    return new Observable((observer) => {
      const formLayoutStatus = this.formLayoutPool.getFormLayoutStatus(formName);
      // If formLayout exists in the formLayoutPool already, just return that formLayout
      if (formLayoutStatus === FormLayoutStatus.LOADED) {
        observer.next(this.formLayoutPool.getFormLayout(formName));
        observer.complete();
        // If the same formLayout is being loaded from server, then wait until loading finishes
      } else if (formLayoutStatus === FormLayoutStatus.LOADING) {
        this.waitFormLayoutLoading(formName).subscribe((formLayout) => {
          observer.next(formLayout);
          observer.complete();
        });
      } else {
        this.waitFormLayoutLoading(formName).subscribe((formLayout) => {
          observer.next(formLayout);
          observer.complete();
        });
        this.loadFormLayout(formName);
      }
    })
  }

  public updateFormLayoutCache(formLayout: FormLayout) {
    this.formLayoutPool.setFormLayout(formLayout);
  }

  private loadFormLayout(formName: string) {
    this.formLayoutPool.setFormLayoutStatus(formName, FormLayoutStatus.LOADING);
    const subscriber = this.publicFormLayout({ formName }).subscribe(( response ) => {
      if(response.data.layout) {
        this.formLayoutPool.setFormLayoutStatus(formName, FormLayoutStatus.LOADED);
        this.formLayoutPool.setFormLayout(response.data.layout);
        this.formLayoutLoadSubject.next({ formName, formLayout: response.data.layout });
      } else {
        this.formLayoutLoadSubject.next({ formName, formLayout: null });
      }
      subscriber.unsubscribe();
    });
  }

  private waitFormLayoutLoading(waitingformName: string): Observable<FormLayout> {
    return new Observable((observer) => {
      const subscriber = this.formLayoutLoadSubject.subscribe((result) => {
        if(!result) return;
        const { formName, formLayout } = result;
        if(formName === waitingformName) {
          observer.next(formLayout);
          observer.complete();
          subscriber.unsubscribe();
        }
      });
    });
  }
}
