import { EligibilityStore } from './eligibility.component.store'
import { Component, OnDestroy } from '@angular/core'
import { ProviderBaseComponent } from '../provider-base.component'

@Component({
  selector: 'provider-eligibility',
  providers: [
    EligibilityStore
  ],
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
})
export class EligibilityComponent extends ProviderBaseComponent implements OnDestroy {
  portalName = 'Vendor'
  pageName = 'Eligibility'
  model: any = {}
  subscriber: any

  vm$ = this.store.vm$
  selectedProviderId$ = this.store.selectedProviderId$

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      providers: this.store.providerOptions$,
    }
  }

  constructor(public store: EligibilityStore) {
    super()
    this.subscriber = this.store.selectedProviderId$.subscribe((providerId) => {
      this.model['providerId'] = providerId
    });
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }
}
