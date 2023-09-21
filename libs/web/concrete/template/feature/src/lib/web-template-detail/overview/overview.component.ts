
import { Component } from '@angular/core'
import { WebTemplateDetailStore } from '../web-template-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
          <div class='w-full flex flex-col'>
                <ui-formly-json-form
                  class="w-full"
                  formName="template_overview"
                  [showSubmitButton]="false"
                  [componentStore]="store"
                  [model]="vm.item"
                ></ui-formly-json-form>

                <tx-document-viewer
                  width="1400px"
                  height="800px"
                  basePath="https://documentserver.caseclinical.com:443/MemberOnboarding"
                  documentData="vm.item.attachment"
                  [signatureSettings]="{
                    showSignatureBar: true,
                    signatureBoxName: vm.item.code?.signatureBoxName,
                    redirectUrlAfterSignature: vm.item.code?.redirectUrlAfterSignature,
                    ownerName: vm.item.code?.ownerName,
                    signerName: vm.item.code?.signatureName,
                    signerInitials: vm.item.code?.signerInitials
                  }"
                >
                </tx-document-viewer>
          </div>
      </ng-container>
    </ng-container>
  `,
  providers: [WebTemplateDetailStore],
})
export class WebTemplateOverviewComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: WebTemplateDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteTemplateEffect(item)
    }
  }
}

