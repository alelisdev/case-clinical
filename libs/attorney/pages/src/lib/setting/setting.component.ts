import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component, OnDestroy } from '@angular/core'
import { SettingStore } from './setting.store'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'case-clinical-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [SettingStore],
})
export class SettingComponent extends AttorneyBaseComponent implements OnDestroy {
  pageName = 'Setting'
  portalName = 'Attorney'

  private _unsubscribeAll: Subject<any> = new Subject<any>()
  vm$ = this.store.vm$
  model: any = {}

  constructor(public store: SettingStore) {
    super()
    this.store.formlySetting$.pipe(takeUntil(this._unsubscribeAll)).subscribe((setting) => {
      console.log(setting.value)
      this.model = {
        ...this.model,
        ...setting.value,
      }
    })
    this.store.selectedAttorneyId$.pipe(takeUntil(this._unsubscribeAll)).subscribe((attorneyId) => {
      this.model['attorneyId'] = attorneyId
    })
  }

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  ngOnDestroy(): void {
    this._unsubscribeAll.complete()
  }

  formIsReady() {
    this.onResize()
    this.store.loadFormlySetting()
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      attorneys: this.store.attorneyOptions$,
    }
  }

  save(formData: any) {
    console.log(formData)
    this.store.updateFormlySetting(formData)
  }
}
