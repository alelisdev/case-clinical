
import { Component } from '@angular/core'
import { WebUserDetailStore } from '../web-user-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="user_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebUserDetailStore],
})
export class WebUserOverviewComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: WebUserDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteUserEffect(item)
    }
  }

  
  assignedDocumentAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  attorneyAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  caseAccountAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  chatAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  documentAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  legalCaseAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  messageAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  navigationAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  notificationAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  priorAuthorizationRequestAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  settingAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  shortcutAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  teamUserAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  userCourseProgressAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  userFeatureAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  userFeaturePermissionAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  userRoleAdded($event){
    console.log('from the overview in User, added: ',$event)
  }

}

