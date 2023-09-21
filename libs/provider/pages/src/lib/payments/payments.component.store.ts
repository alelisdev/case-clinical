import { Injectable, Injector } from "@angular/core";
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/component-store";
import { WebCoreDataAccessService, Invoice, Document } from '@case-clinical/web/core/data-access';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared';
import { WebUiToastService } from "@case-clinical/web/ui/toast";
import printJS from 'print-js'
import { FormlyModalController } from "@case-clinical/web/ui/formly-designer";

export interface PaymentState extends ProviderBaseState {
  loading: boolean,
  query: string,
  usage: number,
}

@Injectable()
export class PaymentStore extends ProviderBaseStore<PaymentState> {

  private uploadModalCtrl?: FormlyModalController;

  constructor(
    private data: WebCoreDataAccessService,
    private invoiceStore: WebInvoiceFeatureStore,
    private documentStore: WebDocumentFeatureStore,
    private toast: WebUiToastService,
    injector: Injector,
  ) {
    super(injector)

    this.invoiceStore.setLimit(10);
    this.invoiceStore.loadInvoicesEffect();

    setInterval(() => this.increaseUsage(), 1000);
  }

  loading$ = this.select(s => s.loading)
  usage$ = this.select(s => s.usage)
  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )
  invoices$ = this.invoiceStore.invoices$;
  invoicesPaging$ = this.invoiceStore.paging$;

  vm$ = this.select(
    this.loading$,
    this.usage$,
    this.user$,
    this.vendor$,
    (
      loading,
      usage,
      user,
      vendor,
    ) => ({
      loading,
      user,
      vendor,
      usage,
    })
  )

  increaseUsage = this.updater((s) => ({ ...s, usage: s.usage <= 1 ? s.usage + 0.05 : 0 }));

  printEffect = this.effect<string>((documentId$) =>
    documentId$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap((documentId) =>
        this.data.getDocument(documentId).pipe(
          tapResponse(
            (document: Document) => {
              if (!document.attachment) {
                this.toast.error('Cannot find attachment file!', { duration: 2000 })
                return
              }
              const base64String = document.attachment
              if (base64String) {
                const typeFlag = base64String.search('image')
                if (typeFlag > 0) {
                  const myWindow = window.open('', 'Image')
                  myWindow?.document.write("<img src='" + base64String + "''>")
                  myWindow?.print()
                } else {
                  const str = base64String.split('data:application/pdf;base64,')
                  const temp = str[1]
                  printJS({ printable: temp, type: 'pdf', base64: true })
                }
              }
            },
            () => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )

  /** Upload Invoice Document */
  setInvoiceUploadModalCtrl(ctrl: FormlyModalController) {
    this.uploadModalCtrl = ctrl;
  }

  openInvoiceUploadModal(invoice: Invoice) {
    this.uploadModalCtrl?.open({
      invoice: invoice.invoice,
      id: invoice.id,
      name: invoice.name
    }, {}, this);
  }

  uploadInvoice(model: any) {
    const { id, name, invoice } = model;
    const subscriber = this.invoiceStore.actionResult$.subscribe((result) => {
      const { done } = result;
      if(done) {
        subscriber.unsubscribe();
        this.uploadModalCtrl?.close();
      }
    })
    this.invoiceStore.updateInvoiceEffect({ id, name, invoice });
  }
  /** Upload Invoice Document */

  override getInitialState(): PaymentState {
    return {
      query: "",
      loading: false,
      usage: 0,
    }
  }

  loadDocument(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId);
  }

  setSkip(skip: number) {
    this.invoiceStore.setSkip(skip);
    this.invoiceStore.loadInvoicesEffect();
  }

  override providerIdDidChange(providerId: string) {
    if (providerId === 'all') {
      this.invoiceStore.setClinicalProviderId(undefined);
    } else {
      this.invoiceStore.setClinicalProviderId(providerId);
    }
    this.invoiceStore.setSkip(0);
    this.invoiceStore.loadInvoicesEffect();
  }

}
