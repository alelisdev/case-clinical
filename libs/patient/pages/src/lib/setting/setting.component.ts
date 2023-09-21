import { Component, OnDestroy } from '@angular/core'
import { SettingStore } from './setting.store';
import { PatientBaseComponent } from '../patient-base.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'patient-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [SettingStore]
})
export class SettingComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Setting';
  portalName = "Patient";

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  vm$ = this.store.vm$;
  subscriber: any;
  model: any = {};

  constructor(public store: SettingStore) {
    super();
    this.store.selectedLegalCaseId$.pipe(takeUntil(this._unsubscribeAll)).subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    });
    this.store.formlySetting$.pipe(takeUntil(this._unsubscribeAll)).subscribe((setting) => {
      this.model = {
        ...this.model,
        ...setting.value,
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
  }

  formIsReady() {
    this.onResize();
    this.store.loadFormlySetting();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      memberships: this.store.memberships$,
    }
  }

  save(formData: any) {
    console.log(formData)
    this.store.updateFormlySetting(formData);
  }
}
