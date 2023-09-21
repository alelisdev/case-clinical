import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { Component, Input, OnInit } from '@angular/core';
import { FeaturesStore } from './features-store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-feature',
  templateUrl: './settings-feature.component.html',
  providers: [
    FeaturesStore
  ]
})
export class SettingsFeatureComponent implements OnInit {
  @Input() isSignUpProcess = false
  vm$ = this.store.vm$

  open = false;

  formData = {

  }

  constructor(private store: FeaturesStore, private confirm: FuseConfirmationService) { }

  ngOnInit(): void {
    // this.store.loadPricesEffect()
    // this.store.loadSubscriptionsEffect()
  }

  onChange($event) {
    console.log($event)
    this.open = $event.checked;
  }

  submit(formData) {
    alert()
  }

  // filterByQuery(query: string) {
  //   // this.store.setSearchQuery(query)
  // }

  // hideSubscribed(hide: boolean) {
  //   console.log(hide)
  //   // this.store.setHideSubscribed(hide)
  // }

  // toggleSubscribe(priceId: string, subscribed: boolean) {
  //   if(!subscribed) {
  //     const dlg = this.confirm.open({
  //       title: "Subscribe to feature",
  //       message: 'Are you sure you want subscribe to this feature?'
  //     }).afterClosed().subscribe((result) => {
  //       console.log(result)
  //       if(result === 'confirmed') {
  //         this.store.subscribePriceEffect(priceId)
  //       }
  //     })
  //   } else {
  //     const dlg = this.confirm.open({
  //       title: 'Cancel the subscription',
  //       message: 'Are you sure you want cancel current subscription?'
  //     }).afterClosed().subscribe((result) => {
  //       if(result === 'confirmed') {
  //         console.log('Do canelling')
  //         this.store.cancelSubscriptionEffect(priceId)
  //       }
  //     })
  //   }
  // }
}
