import { Component } from '@angular/core'
import { ReviewsStore } from './reviews.component.store';
import { ProviderBaseComponent }  from '../provider-base.component'

@Component({
  selector: 'provider-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers:[ReviewsStore]
})
export class ReviewsComponent extends ProviderBaseComponent{
  portalName = "Vendor";
  pageName = 'Reviews';

  selectedProviderId$ = this.store.selectedProviderId$;
  vm$ = this.store.vm$;
  constructor(public store: ReviewsStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      providers: this.store.providerOptions$,
      portalName: this.portalName,
    }
  }
}
