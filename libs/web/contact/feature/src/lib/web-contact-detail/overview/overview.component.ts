

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="contact_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebContactFeatureStore],
})
export class WebContactOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebContactFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadContactEffect(this.route.params.pipe(pluck('contactId')))
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
      this.store.deleteContactEffect()
    }
  }

  
  contactEmailAdded($event){
    console.log('from the overview in Contact, added: ',$event)
  }


  contactPhoneNumberAdded($event){
    console.log('from the overview in Contact, added: ',$event)
  }


  contactSettingAdded($event){
    console.log('from the overview in Contact, added: ',$event)
  }


  contactTagAdded($event){
    console.log('from the overview in Contact, added: ',$event)
  }


  implantAdded($event){
    console.log('from the overview in Contact, added: ',$event)
  }

}

