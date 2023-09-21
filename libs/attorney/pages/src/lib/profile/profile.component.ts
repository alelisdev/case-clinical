import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component } from '@angular/core'
import { ProfileStore } from './profile.component.store'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'

@Component({
  selector: 'case-clinical-profile',
  providers: [ProfileStore, WebGenderFeatureStore],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends AttorneyBaseComponent {
  pageName = 'Profile'
  portalName = 'Attorney'

  model$ = this.store.model$
  model: any = {}

  constructor(public store: ProfileStore) {
    super()
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
    }
  }
}
