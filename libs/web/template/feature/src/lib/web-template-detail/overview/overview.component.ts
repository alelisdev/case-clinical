
import { Component } from '@angular/core'
import { WebTemplateDetailStore } from '../web-template-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="template_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
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

  
  assignedDocumentAdded($event){
    console.log('from the overview in Template, added: ',$event)
  }


  contractAdded($event){
    console.log('from the overview in Template, added: ',$event)
  }

}

