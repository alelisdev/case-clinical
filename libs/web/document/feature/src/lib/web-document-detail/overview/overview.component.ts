
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { map } from 'rxjs'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
        <section aria-labelledby="document-information-title" class="flex w-full m-4">
          <div class="bg-white shadow sm:rounded-lg flex-column w-full">
            <div class="border-t border-gray-200 px-4 py-5 sm:px-6 w-full">
              <ui-formly-json-form
                [formName]="'document_overview'"
                [showSubmitButton]="true"
                [componentStore]="this.store"
                [model]="vm.item"
                (formIsReady)="formIsReady()"
              ></ui-formly-json-form>
            </div>
          </div>
        </section>
    </ng-container>
  `,
  providers: [WebDocumentFeatureStore],
})
export class WebDocumentOverviewComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: WebDocumentFeatureStore, 
              private readonly route: ActivatedRoute) {}

  async formIsReady() {
    await this.store.loadDocumentEffect(this.route.params.pipe(map((route) => route?.documentId)))
    return true
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteDocumentEffect(item)
    }
  }

  
  assignedDocumentAdded($event){
    console.log('from the overview in Document, added: ',$event)
  }


  firmAdded($event){
    console.log('from the overview in Document, added: ',$event)
  }


  priorAuthorizationRequestAdded($event){
    console.log('from the overview in Document, added: ',$event)
  }

}

