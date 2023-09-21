

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { pluck } from 'rxjs';

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
  providers: [WebUserFeatureStore],
})
export class WebUserOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebUserFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadUserEffect(this.route.params.pipe(pluck('userId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
       this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteUserEffect(item)
    }
  }

  
  assignedDocumentAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  chatAdded($event){
    console.log('from the overview in User, added: ',$event)
  }


  documentAdded($event){
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

