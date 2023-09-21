import { Component, OnDestroy } from '@angular/core'
import { ProviderBaseComponent } from '../provider-base.component';
import { SettingStore } from './setting.store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'provider-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [SettingStore]
})
export class SettingComponent extends ProviderBaseComponent implements OnDestroy {

  pageName = 'Setting';
  portalName = "Provider";

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  vm$ = this.store.vm$;
  subscriber: any;
  model: any = {};

  constructor(public store: SettingStore) {
    super();
    this.store.selectedProviderId$.pipe(takeUntil(this._unsubscribeAll)).subscribe((providerId) => {
      this.model['providerId'] = providerId;
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
      providers: this.store.providerOptions$,
      portalName: this.portalName,
    }
  }

  save(formData: any) {
    this.store.updateFormlySetting(formData);
  }
}
